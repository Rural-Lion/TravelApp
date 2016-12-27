import React, { Component, PropTypes } from 'react';
import {FancyBorder} from '../helpers.js';

// INCOMPLETE
  // has no interaction with user inputs or events
const Map = props => {
  console.log("MAP props", props);
  let destination = props.selectedActivities.length ? props.selectedActivities[0].name + props.selectedActivities[0].address : "Yosemite";
  return (
    <div>
      <div className="row">
        <h1 className="text-center">Results Map</h1>
      </div>
      <div className="row mapContainer">
        <iframe
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCBYpJtIs3LND6eRzsNbPldwx9cqHh3WOM&origin=
            ${props.userQuery.startingLocation}&destination=${destination}`}
          allowFullScreen
          className="map"
        />

      </div>
    </div>
  );
}
Map.propTypes = {
  userQuery: PropTypes.object,
  selectedActivities: PropTypes.array,
};

export default Map;