// ResultsPage
    // NavBar
    // EntityList
      // EntityListEntry
    // MapContainer
      // Map

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { generateDetailedEntity, generateData, getCoordinates, FancyBorder, generateItinerary } from '../helpers';
import NavBar from './NavBar.jsx';
import EntityList from './EntityList.jsx';
import EntityPopup from './EntityPopup.jsx';
import MapContainer from './Map/MapContainer.jsx';
import ItineraryContainer from './Itinerary/ItineraryContainer.jsx';
import OptionsContainer from './Options/OptionsContainer.jsx';
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
    console.log('nextprops', nextProps);
    getCoordinates(nextProps.userQuery.startingLocation, ({ lat, lng }) => {
      this.setState({ startingLocation: { lat: lat(), lng: lng() } }, () => {
        this.getEntityList(nextProps.userQuery, this.state.startingLocation, nextProps.userInterests);
      });
    });
    this.setTotalBudget(nextProps.userQuery.budgetOfTrip);
  }

  getEntityList(query, location, interests) {
    console.log(location);
    axios.get('/entitiesWithinRadius', {
      params: {
        latitude: location.lat,
        longitude: location.lng,
        distance: query.distanceOfTrip,
        activities: JSON.stringify(interests),
      },
    })
      .then((res) => {
        this.setState({
          entities: generateData(res.data),
        }, () => { console.log(this.state.entities); });
      })
      .catch(err => console.log('error loading get request', err));
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
      itinerary: generateItinerary(results, this.state.startingTime, this.state.endingTime, this.props.userQuery.lengthOfTrip, (this.state.foodCostPerDay + this.state.nightlyCost), this.state.waypoints),
    }, () => {
      this.setUsedBudget(this.state.itinerary.totalCost);
      this.setRemainingTime(this.state.itinerary.remainingTime, this.state.itinerary.totalTime);
    });
  }

  setPreferences(foodCost, startTime, endTime, nightlyCost) {
    console.log("new time", endTime)
    this.setState({
      foodCostPerDay: foodCost,
      startingTime: startTime,
      endingTime: endTime,
      nightlyCost: nightlyCost
    }, () => {
      this.setTotalTime(this.state.startingTime, this.state.endingTime, this.props.userQuery.lengthOfTrip)});
  }

  handleEntityClick(e, entity) {
    const that = this;
    console.log('entity.entityID: ', entity.entityID);
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
        console.log('facility', facilityDetails.data);
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
        console.log('recArea', recAreaDetails.data);
        that.setState({
          selectedEntity: generateDetailedEntity(entity, recAreaAddress.data, recAreaDetails.data),
          showModal: true,
        });
      });
    })
    .catch(err => console.error('error', err));
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

  handleAddToItineraryClick(e, { coordinates: [lat, lng], name }) {
    e.stopPropagation();
    let removeFlag = false;
    const waypoints = this.state.waypoints.slice();
    waypoints.forEach(({ waypoint: { location: { lat: insideLat, lng: insideLng } } }, index) => {
      if (insideLat === lat && insideLng === lng) {
        waypoints.splice(index, 1);
        removeFlag = true;
      }
    });
    if (!removeFlag) {
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
    }, () => { console.log(this.state.waypoints); });
  }


  render() {
    console.log("NEW STATE", this.state)
    return (
      <div className="resultsPage">
        <FancyBorder color="orange">

          <NavBar
            selectTab={this.selectTab}
            totalTime={this.state.totalTime}
            usedTime={this.state.usedTime}
            remainingTime={this.state.remainingTime}
            totalBudget={this.state.budgetOfTrip}
            usedBudget={this.state.usedBudget}
          />

          <div className="row mapAndList">
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 mapContainer" >
              <MapContainer
                userQuery={this.props.userQuery}
                entities={this.state.entities}
                waypoints={this.state.waypoints}
                startingLocation={this.state.startingLocation}
                setItinerary={this.setItinerary}
              />

            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 tabs">

              <FancyBorder color="yellow">
                <div className="tabContent">
                  { this.state.selectedTab === 'EntityList' ?
                    <EntityList
                      entities={this.state.entities}
                      handleEntityClick={this.handleEntityClick}
                      handleAddToItineraryClick={this.handleAddToItineraryClick}
                      waypoints={this.state.waypoints}
                    /> : null}
                  { this.state.selectedTab === 'ItineraryContainer' ?
                    <ItineraryContainer
                      itinerary={this.state.itinerary}
                      addTimeToWaypoint={this.debouncedAddTimeToWaypoint}
                    /> : null}
                  { this.state.selectedTab === 'OptionsContainer' ?
                    <OptionsContainer 
                      setPreferences={this.setPreferences}
                      startingTime={this.state.startingTime}
                      endingTime={this.state.endingTime}
                      foodCostPerDay={this.state.foodCostPerDay}
                      nightlyCost={this.state.nightlyCost}
                    /> : null}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <FancyBorder color="green">
                    <button type="button" className="finalizeButton btn btn-default">{'Finalize >'}</button>
                  </FancyBorder>
                </div>
              </FancyBorder>
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
    .map(interest => interest[0].toUpperCase()),
});

// ACTION CREATOR TO BE INCLUDED FOR DISPATCH METHOD
const mapDispatchToProps = dispatch => ({
  // makeItinerary: (args) => dispatch(itenerary)
});

export default connect(mapStateToProps)(ResultsPage);

