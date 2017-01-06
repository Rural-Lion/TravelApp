// ResultsPage
    // NavBar
    // EntityList
      // EntityListEntry
    // MapContainer
      // Map

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { generateActivities, generateData, getCoordinates, FancyBorder } from '../helpers';
import NavBar from './NavBar.jsx';
import EntityList from './EntityList.jsx';
import EntityPopup from './EntityPopup.jsx';
import MapContainer from './Map/MapContainer.jsx';
import ItineraryContainer from './Itinerary/ItineraryContainer.jsx';

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      waypoints: [],
      selectedEntity: {},
      showModal: false,
    };

    this.handleEntityClick = this.handleEntityClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAddToItineraryClick = this.handleAddToItineraryClick.bind(this);
  }
  componentWillMount() {
    this.getEntityList();
  }

  getEntityList() {
    const that = this;
    const userQuery = Object.assign({}, this.props.userQuery);
    const sendRequest = (location) => {
      if (location) {
        that.setState({
          startingLocation: { lat: location.lat(), lng: location.lng() },
        });
        axios.get('/entitiesWithinRadius', {
          params: {
            latitude: location.lat(),
            longitude: location.lng(),
            distance: userQuery.distanceOfTrip,
            activities: JSON.stringify(that.props.userInterests),
          },
        })
        .then((res) => {
          that.setState({
            entities: generateData(res.data),
          }, () => { console.log('entities in app', that.state.entities); });
        })
        .catch(err => console.log('error loading get request', err));
      }
    };
    getCoordinates(this.props.userQuery.startingLocation, sendRequest);
  }

  handleEntityClick(e, entity) {
    const that = this;

    if (entity.facility) {
      axios.get('/facility', {
        params: {
          facility: entity.name,
        },
      })
    .then((facility) => {
      console.log('facility', facility.data);
      that.setState({
        selectedEntity: generateActivities(facility.data),
        showModal: true,
      });
    })
    .catch(err => console.error('error', err));
    } else if (entity.recArea) {
      axios.get('/recArea', {
        params: {
          recArea: entity.name,
        },
      })
    .then((recArea) => {
      console.log('recArea', recArea);
      that.setState({
        selectedEntity: generateActivities(recArea.data),
        showModal: true,
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
    console.log(lat, lng);
    let removeFlag = false;
    const waypoints = this.state.waypoints.slice();
    waypoints.forEach(({ location: { lat: insideLat, lng: insideLng } }, index) => {
      console.log('this is insidelat', insideLat);
      console.log('this is lat', lat);
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
    }, () => console.log('waypoints after click: ', this.state.waypoints));
  }

  render() {
    return (
      <div className="resultsPage">
        <FancyBorder color="orange">
          <div className="container">
            <NavBar />
          </div>
          <div className="row mapAndList">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" >
              <ItineraryContainer />
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
              <FancyBorder color="yellow">
                <MapContainer
                  userQuery={this.props.userQuery}
                  entities={this.state.entities}
                  waypoints={this.state.waypoints}
                  startingLocation={this.state.startingLocation}
                />
              </FancyBorder>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <FancyBorder color="yellow">
                <EntityList
                  entities={this.state.entities}
                  handleEntityClick={this.handleEntityClick}
                  handleAddToItineraryClick={this.handleAddToItineraryClick}
                  waypoints={this.state.waypoints}
                />
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
