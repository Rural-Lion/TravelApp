import React, { Component, PropTypes } from 'react';
import {FancyBorder} from '../helpers.js';

class Map extends Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: {lat: 37.775, lng: -122.419},
      zoom: 10
    });
  }
  //GOOGLE MAPS JS API:
  render() {
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