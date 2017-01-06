// ResultsPage
    // NavBar
    // EntityList
      // EntityListEntry
    // Map

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FancyBorder, generateActivities } from '../helpers';
import NavBar from './NavBar.jsx';
import EntityList from './EntityList.jsx';
import EntityPopup from './EntityPopup.jsx';
import MapContainer from './Map/MapContainer.jsx';
import axios from 'axios';


class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: props.entities,
      waypoints: [],
      selectedEntity: {},
      showModal: false,
    };

    this.handleEntityClick = this.handleEntityClick.bind(this);
    this.handleEntityModalCloseClick = this.handleEntityModalCloseClick.bind(this);
    this.handleAddToItineraryClick = this.handleAddToItineraryClick.bind(this);
  }
  componentWillMount() {
    this.props.handlePlanButtonClick();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      entities: nextProps.entities,
    });
  }

  handleEntityClick(e, entity) {
    let that = this;

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
      }, () =>  { console.log('getting in here'); });
    })
    .catch(err => console.log('error', err));
    }        else if (entity.recArea) {
      axios.get('/recArea', {
        params: {
        facility: entity.name,
      },
      })
    .then((recArea) => {
      console.log('recArea', recArea);
      that.setState({
        selectedEntity: generateActivities(recArea.data),
        showModal: true,
      }, () =>  { console.log('getting in here'); });
    })
    .catch(err => console.log('error', err));
    }
  }

  handleEntityModalCloseClick() {
    this.setState({
      showModal: false,
    });
  }

  handleAddToItineraryClick(e, { coordinates: [lat, lng] }) {
    const waypoints = this.state.waypoints.slice();
    const indexOf = waypoints.indexOf({ lat, lng });
    if (indexOf === -1) {
      waypoints.push({
        location: { lat, lng },
        stopover: true,
      });
    } else {
      waypoints.splice(indexOf, 1);
    }
    this.setState({
      waypoints,
    }, () => { console.log(this.state.waypoints); });
  }

  render() {
    return (
      <div className="resultsPage">
        <FancyBorder color="orange">
          <div className="container">
            <NavBar />
          </div>
          <div className="row mapAndList">
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" >
              <FancyBorder color="yellow">
                <MapContainer
                  userQuery={this.props.userQuery}
                  entities={this.state.entities}
                  waypoints={this.state.waypoints}
                />
              </FancyBorder>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <FancyBorder color="yellow">
                <EntityList
                  entities={this.props.entities}
                  handleEntityClick={this.handleEntityClick}
                  handleAddToItineraryClick={this.handleAddToItineraryClick}
                  waypoints={this.state.waypoints}
                />
              </FancyBorder>
            </div>
          </div>
          <div className="container">
            {this.state.showModal ? <EntityPopup showModal={this.state.showModal} entity={this.state.selectedEntity} handleEntityModalCloseClick={this.handleEntityModalCloseClick} /> : null }
          </div>
        </FancyBorder>
      </div>
    );
  }
}

// ResultsPage.propTypes = {
//   userQuery: PropTypes.object,
//   entities: PropTypes.arrayOf(PropTypes.object),
//   handlePlanButtonClick: PropTypes.func,
// };

const mapStateToProps = state => ({
  userQuery: state.userQuery,
  entities: state.entities,
});

// ACTION CREATOR TO BE INCLUDED FOR DISPATCH METHOD
const mapDispatchToProps = dispatch => ({
  // makeItinerary: (args) => dispatch(itenerary)
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
