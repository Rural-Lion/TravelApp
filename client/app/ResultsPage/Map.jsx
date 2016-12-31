import React, { Component, PropTypes } from 'react';
import {FancyBorder} from '../helpers.js';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //start: props.userQuery.startingLocation
    };
  }
   //GOOGLE MAPS JS API:
  initMap(ref) {
    let map, markerClusterer;
    if (markerClusterer) {
          markerClusterer.clearMarkers();
        }
    const geocoder = new google.maps.Geocoder();
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let props = this.props;
    
    geocoder.geocode({'address': this.props.userQuery.startingLocation}, function(results, status) {
      let locations = props.selectedActivities.map(
      (item) => {return {lat: item.coordinates[1], lng: item.coordinates[0]}});
      if (status === 'OK') {
        map = new google.maps.Map(ref, {
          center: results[0].geometry.location,
          zoom: 5
        });
        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map
        });
      } else {
        map = new google.maps.Map(ref, {
          center: {lat: 37.775, lng: -122.419},
          zoom: 5
        });
      }
      var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
          position: location,
          label: labels[i % labels.length],
          map: map
        });
      });
      markerClusterer = new MarkerClusterer(map, markers,
        {imagePath: './maps/img/m'});
    });
  }
  componentDidMount() {
    this.initMap(this.refs.map);
  }
 
  render() {
    let query = this.props.userQuery.startingLocation;
    if (this.props.selectedActivities.length || query) {
      console.log("rerendering")
      this.initMap(this.refs.map)
    };
    return (
      <div>
        <div className="row">
          <h1 className="text-center">Results Map</h1>
        </div>
        <div className="row mapContainer" ref="map">
        </div>
      </div>
    )
  }
  
  //GOOGLE MAPS EMBED API:
  // let destination: props.selectedActivities.length ? props.selectedActivities[0].name + props.selectedActivities[0].address : "Yosemite",
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
};
Map.propTypes = {
  userQuery: PropTypes.object,
  selectedActivities: PropTypes.array,
};

export default Map;