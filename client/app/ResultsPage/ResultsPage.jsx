// ResultsPage
    // NavBar
    // EntityList
      // EntityListEntry
    // MapContainer
      // Map

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { generateDetailedEntity, generateData, getCoordinates, FancyBorder, generateItinerary } from '../helpers';
import NavBar from './NavBar-new.jsx';
import EntityList from './EntityList.jsx';
import EntityPopup from './EntityPopup.jsx';
import MapContainer from './Map/MapContainer.jsx';
import ItineraryContainer from './Itinerary/ItineraryContainer.jsx';
import OptionsContainer from './Options/OptionsContainer.jsx';
import ProgressBars from './ProgressBars.jsx';
import _ from 'lodash';

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      waypoints: [],
      selectedEntity: {},
      showModal: false,
      itinerary: [],
      selectedTab: 'EntityList',
      startingTime: 9,
      endingTime: 21,
      usedTime: 0,
      remainingTime: 1,
      foodCostPerDay: 20,
      nightlyCost: 20,
      usedBudget: 0,
    };

    this.handleEntityClick = this.handleEntityClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAddToItineraryClick = this.handleAddToItineraryClick.bind(this);
    this.setItinerary = this.setItinerary.bind(this);
    this.getEntityList = this.getEntityList.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.setTotalTime = this.setTotalTime.bind(this);
    this.setItinerary = this.setItinerary.bind(this);
    this.setUsedBudget = this.setUsedBudget.bind(this);
    this.addTimeToWaypoint = this.addTimeToWaypoint.bind(this);
    this.debouncedAddTimeToWaypoint = _.debounce(this.addTimeToWaypoint, 1000);
    this.setPreferences = this.setPreferences.bind(this);
    this.setItineraryDom = this.setItineraryDom.bind(this);
    this.downloadInnerHtml = this.downloadInnerHtml.bind(this);
    this.clearItinerary = this.clearItinerary.bind(this);
  }

  componentWillMount() {
    getCoordinates(this.props.userQuery.startingLocation, ({ lat, lng }) => {
      this.setState({ startingLocation: { lat: lat(), lng: lng() } }, () => {
        this.getEntityList(this.props.userQuery, this.state.startingLocation, this.props.userInterests);
      });
    });
    this.setTotalTime(this.state.startingTime, this.state.endingTime, this.props.userQuery.lengthOfTrip);
    this.setTotalBudget(this.props.userQuery.budgetOfTrip);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userQuery !== nextProps.userQuery) {
      getCoordinates(nextProps.userQuery.startingLocation, ({ lat, lng }) => {
        this.setState({ startingLocation: { lat: lat(), lng: lng() } }, () => {
          this.getEntityList(nextProps.userQuery, this.state.startingLocation, nextProps.userInterests);
        });
      });
      this.setTotalTime(this.state.startingTime, this.state.endingTime, this.props.userQuery.lengthOfTrip);
      this.setTotalBudget(nextProps.userQuery.budgetOfTrip);
    }
  }

  getEntityList(query, location, interests) {
    axios.get('/entitiesWithinRadius', {
      params: {
        latitude: location.lat,
        longitude: location.lng,
        distance: query.distanceOfTrip,
        activities: JSON.stringify(interests),
      },
    })
      .then((res) => {
        if (res.data.length === 0) {
          alert('There are no results for this search - try searching with different inputs');
        }
        this.setState({
          entities: generateData(res.data),
        });
      })
      .catch(err => console.error('error loading getEntityList request', err));
  }

  setTotalTime(startingTime, endingTime, days) {
    days = JSON.parse(days);
    this.setState({
      totalTime: (((endingTime - startingTime) * 3600) * days),
    }, () => this.setRemainingTime(this.state.totalTime, 0));
  }

  setRemainingTime(remainingTime, usedTime) {
    this.setState({
      remainingTime,
      usedTime,
    });
  }

  setUsedBudget(budget) {
    this.setState({
      usedBudget: budget,
    });
  }

  setTotalBudget(budget) {
    this.setState({
      budgetOfTrip: budget,
    });
  }

  setItinerary(results) {
    this.setState({
      itinerary: generateItinerary(results, this.state.startingTime, this.state.endingTime,
      this.props.userQuery.lengthOfTrip, (this.state.foodCostPerDay + this.state.nightlyCost), this.state.waypoints),
    }, () => {
      this.setUsedBudget(this.state.itinerary.totalCost);
      this.setRemainingTime(this.state.itinerary.remainingTime, this.state.itinerary.totalTime);
    });
  }


  setPreferences(foodCost, startTime, endTime, nightlyCost) {
    this.setState({
      foodCostPerDay: foodCost,
      startingTime: startTime,
      endingTime: endTime,
      nightlyCost,
    }, () => {
      this.setTotalTime(this.state.startingTime, this.state.endingTime, this.props.userQuery.lengthOfTrip);
    });
  }

  handleEntityClick(e, entity) {
    const that = this;
    if (entity.facility) {
      axios.get('/facilityAddress', {
        params: {
          facilityID: entity.entityID,
        },
      })
    .then((facilityAddress) => {
      axios.get('/trailsAndActivitiesWithinRadiusOfFacility', {
        params: {
          facilityID: entity.entityID,
          latitude: entity.coordinates[0],
          longitude: entity.coordinates[1],
        },
      })
      .then((facilityDetails) => {
        that.setState({
          selectedEntity: generateDetailedEntity(entity, facilityAddress.data, facilityDetails.data),
          showModal: true,
        });
      });
    });
    } else if (entity.recArea) {
      axios.get('/recAddress', {
        params: {
          recAreaID: entity.entityID,
        },
      })

    .then((recAreaAddress) => {
      axios.get('/trailsAndActivitiesWithinRadiusOfRecAreas', {
        params: {
          recAreaID: entity.entityID,
          latitude: entity.coordinates[0],
          longitude: entity.coordinates[1],
        },
      })
      .then((recAreaDetails) => {
        that.setState({
          selectedEntity: generateDetailedEntity(entity, recAreaAddress.data, recAreaDetails.data),
          showModal: true,
        });
      });
    })
    .catch(err => console.error('error getting more details on entity', err));
    }
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  selectTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }

  handleAddToItineraryClick(e, entity) {
    e.stopPropagation();
    const { coordinates: [lat, lng], name } = entity;
    let removeFlag = false;
    const waypoints = this.state.waypoints.slice();
    waypoints.forEach(({ waypoint: { location: { lat: insideLat, lng: insideLng } } }, index) => {
      if (insideLat === lat && insideLng === lng) {
        waypoints.splice(index, 1);
        removeFlag = true;
        entity.isAdded = false;
      }
    });
    if (!removeFlag) {
      entity.isAdded = true;
      waypoints.push({
        name,
        waypoint: {
          location: { lat, lng },
          stopover: true,
        },
        duration: 0,
        cost: {},
      },
      );
    }
    this.setState({
      waypoints,
    });
  }

  addTimeToWaypoint(name, duration) {
    const waypoints = this.state.waypoints.slice();
    waypoints.forEach((val, index) => {
      if (val.name === name) {
        val.duration = duration;
      }
    });
    this.setState({
      waypoints,
    });
  }

  setItineraryDom(node) {
    if (node !== this.state.itineraryDom) {
      this.setState({
        itineraryDom: node,
      });
    }
  }

  clearItinerary() {
    console.log('clear itinerary called');
    this.setState({
      itinerary: false,
      usedBudget: 0,
      usedTime: 0,
    }, () => { console.log(this.state.itinerary); });
  }
  downloadInnerHtml(filename, mimeType) {
    const elHtml = this.state.itineraryDom.innerHTML;
    const link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', `data: ${mimeType};charset=utf-8, ${encodeURIComponent(elHtml)}`);
    link.click();
  }


  render() {
    return (
      <div className="resultsPage">
        <FancyBorder color="orange">

          <NavBar
            selectTab={this.selectTab}
          />

          <div className="mapAndList">
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 mapContainer" >
              <ProgressBars
                totalTime={this.state.totalTime}
                usedTime={this.state.usedTime}
                remainingTime={this.state.remainingTime}
                totalBudget={this.state.budgetOfTrip}
                usedBudget={this.state.usedBudget}
              />
              <MapContainer
                userQuery={this.props.userQuery}
                entities={this.state.entities}
                waypoints={this.state.waypoints}
                startingLocation={this.state.startingLocation}
                setItinerary={this.setItinerary}
                showDetails={this.handleEntityClick}
                addToItinerary={this.handleAddToItineraryClick}
                clearItinerary={this.clearItinerary}
              />

            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 tabs">

              <div className="tabContent">
                { this.state.selectedTab === 'EntityList' ?
                  <EntityList
                    entities={this.state.entities}
                    handleEntityClick={this.handleEntityClick}
                    handleAddToItineraryClick={this.handleAddToItineraryClick}
                    waypoints={this.state.waypoints}
                    downloadInnerHtml={this.downloadInnerHtml}
                  /> : null}
                { this.state.selectedTab === 'ItineraryContainer' ?
                  <ItineraryContainer
                    itinerary={this.state.itinerary}
                    addTimeToWaypoint={this.debouncedAddTimeToWaypoint}
                    setItineraryDom={this.setItineraryDom}
                  /> : null}
                { this.state.selectedTab === 'OptionsContainer' ?
                  <OptionsContainer
                    selectTab={this.selectTab}
                    setPreferences={this.setPreferences}
                    startingTime={this.state.startingTime}
                    endingTime={this.state.endingTime}
                    foodCostPerDay={this.state.foodCostPerDay}
                    nightlyCost={this.state.nightlyCost}
                  /> : null}
              </div>
            </div>
          </div>
          <div className="container">
            {this.state.showModal ?
              <EntityPopup
                showModal={this.state.showModal}
                entity={this.state.selectedEntity}
                closeModal={this.closeModal}
                addToItinerary={this.handleAddToItineraryClick}
              /> : null }
          </div>
        </FancyBorder>
      </div>
    );
  }
}

ResultsPage.propTypes = {
  userQuery: PropTypes.object,
  userInterests: PropTypes.arrayOf(PropTypes.string),
  directions: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  userQuery: state.userQuery,
  userInterests: state.interests
    .filter(interest => interest[1])
    .map(interest => interest[2].join(',')),
});

// ACTION CREATOR TO BE INCLUDED FOR DISPATCH METHOD
const mapDispatchToProps = dispatch => ({
  // makeItinerary: (args) => dispatch(itenerary)
});

export default connect(mapStateToProps)(ResultsPage);

