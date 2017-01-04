import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    this.initMap(this.refs.map);
  }

   // GOOGLE MAPS JS API:
  initMap(ref) {
    let map,
      markerClusterer;
    if (markerClusterer) {
      markerClusterer.clearMarkers();
    }
    const geocoder = new google.maps.Geocoder();
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const props = this.props;
    geocoder.geocode({ address: this.props.userQuery.startingLocation }, (results, status) => {
      const locations = props.entities.map(
      item => ({ lat: item.coordinates[0], lng: item.coordinates[1] }));
      if (status === 'OK') {
        map = new google.maps.Map(ref, {
          center: results[0].geometry.location,
          zoom: 5,
        });
        const marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map,
        });
      } else {
        map = new google.maps.Map(ref, {
          center: { lat: 37.775, lng: -122.419 },
          zoom: 5,
        });
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
  getDirections() {

  }

  render() {
    return (
      <div>
        <div className="row">
          <h1 className="text-center">Results Map</h1>
        </div>
        <div className="row mapContainer" ref="map" />
      </div>
    );
  }

  // GOOGLE MAPS EMBED API:
  // let destination: props.activities.length ? props.activities[0].name + props.activities[0].address : "Yosemite",
  // return (
  //   <div>
  //     <div className="row">
  //       <h1 className="text-center">Results Map</h1>
  //     </div>
  //     <div className="row mapContainer">
  //       <iframe
  //         frameBorder="0"
  //         src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCBYpJtIs3LND6eRzsNbPldwx9cqHh3WOM&origin=
  //           ${props.userQuery.startingLocation}&destination=${destination}`}
  //         allowFullScreen
  //         className="map"
  //       />

  //     </div>
  //   </div>
  // );
}
Map.propTypes = {
  userQuery: PropTypes.object,
  entities: PropTypes.arrayOf(PropTypes.object),
  waypoints: PropTypes.arrayOf(PropTypes.object),
};

export default Map;
