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

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      waypoints: [],
      selectedEntity: {},
      showModal: false,
      itinerary: [],
    };

    this.handleEntityClick = this.handleEntityClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAddToItineraryClick = this.handleAddToItineraryClick.bind(this);
    this.setItinerary = this.setItinerary.bind(this);
    this.getEntityList = this.getEntityList.bind(this);
  }
  componentWillMount() {
    getCoordinates(this.props.userQuery.startingLocation, ({ lat, lng }) => {
      this.setState({ startingLocation: { lat: lat(), lng: lng() } }, () => {
        this.getEntityList(this.props.userQuery, this.state.startingLocation, this.props.userInterests);
      });
    });
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

  setItinerary(results) {
    this.setState({
      itinerary: generateItinerary(results),
    }, () => console.log('this is new directions in state: ', this.state.itinerary));
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

  handleAddToItineraryClick(e, { coordinates: [lat, lng] }) {
    e.stopPropagation();
    let removeFlag = false;
    const waypoints = this.state.waypoints.slice();
    waypoints.forEach(({ location: { lat: insideLat, lng: insideLng } }, index) => {
      if (insideLat === lat && insideLng === lng) {
        waypoints.splice(index, 1);
        removeFlag = true;
      }
    });
    if (!removeFlag) {
      waypoints.push({
        location: { lat, lng },
        stopover: true,
      });
    }
    this.setState({
      waypoints,
    });
  }


  render() {
    return (
      <div className="resultsPage">
        <FancyBorder color="orange">
          <div className="container">
            <NavBar />
          </div>
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
                <EntityList
                  entities={this.state.entities}
                  handleEntityClick={this.handleEntityClick}
                  handleAddToItineraryClick={this.handleAddToItineraryClick}
                  waypoints={this.state.waypoints}
                />
              </FancyBorder>
              <ItineraryContainer
                itinerary={this.state.itinerary}
              />
              <OptionsContainer />
              <FancyBorder color="green">
                <button type="button" className="finalizeButton btn btn-default">{'Finalize >'}</button>
              </FancyBorder>
            </div>
          </div>
          <div className="container">
            {this.state.showModal ?
              <EntityPopup
                showModal={this.state.showModal}
                entity={this.state.selectedEntity}
                closeModal={this.closeModal}

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

