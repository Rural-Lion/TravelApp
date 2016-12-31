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
    console.log("initMap called")
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': this.props.userQuery.startingLocation}, function(results, status) {
      console.log("GEOCODING", results, status);
      if (status === 'OK') {
        console.log("status OK")
        this.map = new google.maps.Map(ref, {
          center: results[0].geometry.location,
          zoom: 10
        });
      } else {
        console.log("status not ok")
        this.map = new google.maps.Map(ref, {
          center: {lat: 37.775, lng: -122.419},
          zoom: 10
        });
      }
    });
  };
  componentDidMount() {
    this.initMap(this.refs.map);
  }
 
  render() {
    let query = this.props.userQuery.startingLocation;
    if (query) this.initMap(this.refs.map);
    return (
      <div>
        <div className="row">
          <h1 className="text-center">Results Map</h1>
          <p>test test test {query}</p>
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