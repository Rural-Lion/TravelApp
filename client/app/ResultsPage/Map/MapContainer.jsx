import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import Map from './Map.jsx';
import MapClusterer from './MapClusterer';
import MapDirections from './MapDirections';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRef: '',
      map: null,
      directions: [],
    };

    this.handleInitMapRender = this.handleInitMapRender.bind(this);
    this.getMapRef = this.getMapRef.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((nextProps.startingLocation !== this.props.startingLocation
      || nextProps.entities.length !== this.props.entities.length
      || nextProps.waypoints.length !== this.props.waypoints.length
      || !this.state.mapRef)) {
      console.log('component should update');
      return true;
    }
    return false;
  }

  getMapRef(node) {
    this.setState({
      mapRef: node,
    }, () => {
      this.handleInitMapRender(this.state.mapRef);
    });
  }

  handleInitMapRender(node) {
    this.setState({
      map: new google.maps.Map(node, {
        center: this.props.startingLocation || { lat: 37.775, lng: -122.419 },
        zoom: 7,
      }),
    }, () => {
      MapClusterer(this.props.entities, this.state.map);
      if (this.props.waypoints[0]) {
        MapDirections(this.props.waypoints, this.props.startingLocation, this.state.map, this.props.setItinerary);
      }
    });
  }

  render() {
    return (
      <div>
        <FancyBorder color="purple">
          <div>
            <h1 className="text-center">Results Map</h1>
          </div>
        </FancyBorder>
        <FancyBorder color="purple">
          <Map handleInitMapRender={this.getMapRef} />
        </FancyBorder>
      </div>

    );
  }
}

MapContainer.propTypes = {
  startingLocation: PropTypes.objectOf(PropTypes.number),
  entities: PropTypes.arrayOf(PropTypes.object),
  waypoints: PropTypes.arrayOf(PropTypes.object),
  setItinerary: PropTypes.func,
};

export default MapContainer;
