import React, { Component, PropTypes } from 'react';
import {FancyBorder} from '../helpers.js';

// INCOMPLETE
  // has no interaction with user inputs or events
const Map = props => (
  <div>
    <div className="row">
      <h1 className="text-center">Results Map</h1>
    </div>
    <div className="row mapContainer">
      <iframe
        frameBorder="0"
        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCBYpJtIs3LND6eRzsNbPldwx9cqHh3WOM&origin=${props.userQuery.startingLocation}&destination=${props.selectedActivities[props.selectedActivities - 1]}`}
        allowFullScreen
        className="map"
      />

    </div>
  </div>

  );

Map.propTypes = {
  userQuery: PropTypes.object,
  selectedActivities: PropTypes.array,
};

export default Map;