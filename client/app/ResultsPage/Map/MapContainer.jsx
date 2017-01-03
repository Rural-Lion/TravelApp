import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';
import Map from './Map.jsx';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
    };

    this.handleInitMapRender = this.handleInitMapRender.bind(this);
  }


  handleInitMapRender(node) {
    this.setState({
      mapRef: node,
      map: () => {
        console.log('this inside of arrow function in sestate:', this);
        const map = new google.maps.Map(node, {
          center: this.props.userQuery.startingLocationCoordinates || { lat: 37.775, lng: -122.419 },
          zoom: 5,
        });
        return map;
      },
    });
  }


  render() {
    return (
      <FancyBorder className="mapContainer" color="blue">
        <FancyBorder color="purple">
          <div className="row">
            <h1 className="text-center">Results Map</h1>
          </div>
        </FancyBorder>
        <FancyBorder color="purple">
          <Map className="map" handleInitMapRender={this.handleInitMapRender} />
        </FancyBorder>
      </FancyBorder>

    );
  }
}

MapContainer.propTypes = {
  userQuery: PropTypes.object,
  entities: PropTypes.arrayOf(PropTypes.object),
  waypoints: PropTypes.arrayOf(PropTypes.object),
};

export default MapContainer;
