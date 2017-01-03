import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';

const directionsDisplay = new google.maps.DirectionsRenderer();

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: {},

    };
  }

  componentDidUpdate() {
    this.initMap(this.refs.map);
  }

  getDirections() {
    const directions = new google.maps.DirectionsService();
    this.setState({
      directions: directions.route({
        origin: this.props.userQuery.startingLocation,
        destination: this.props.waypoints[(this.props.waypoints.length - 1)].location,
        waypoints: this.props.waypoints.slice(0, this.props.waypoints.length - 1),
        optimizeWaypoints: true,
        provideRouteAlternatives: true,
        travelMode: 'DRIVING',
      }, (results, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(results);
        }
      }),
    });
  }

   // GOOGLE MAPS JS API:
  initMap(ref) {
    let map;
    let markerClusterer;
    const geocoder = new google.maps.Geocoder();
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const props = this.props;

    if (markerClusterer) {
      markerClusterer.clearMarkers();
    }

    geocoder.geocode({ address: this.props.userQuery.startingLocation }, (results, status) => {
      const locations = props.entities.map(
      item => ({ lat: item.coordinates[0], lng: item.coordinates[1] }));
      if (status === 'OK') {
        map = new google.maps.Map(ref, {
          center: results[0].geometry.location,
          zoom: 5,
        });
        this.getDirections();
        directionsDisplay.setMap(map);
        const marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map,
        });
      } else {
        map = new google.maps.Map(ref, {
          center: { lat: 37.775, lng: -122.419 },
          zoom: 5,
        });
        this.getDirections();
        directionsDisplay.setMap(map);
      }

      const markers = locations.map((location, i) => new google.maps.Marker({
        position: location,
        label: labels[i % labels.length],
        map,
      }));
      markerClusterer = new MarkerClusterer(map, markers,
        { imagePath: './maps/img/m' });
    });
  }


  render() {
    return (
      <div>
        <div className="row">
          <h1 className="text-center">Results Map</h1>
        </div>
        <div className="row mapContainer" ref="map" />
        <button type="button" onClick={() => this.getDirections()} />
      </div>
    );
  }
}
Map.propTypes = {
  userQuery: PropTypes.object,
  entities: PropTypes.arrayOf(PropTypes.object),
  waypoints: PropTypes.arrayOf(PropTypes.object),
};

export default Map;
