import React, { PropTypes } from 'react';

const Map = (props) => {
  console.log('map rendered');
  if (props.mapRef) {
    return props.mapRef;
  }
  return (
    <div className="mapContainer container-fluid" ref={map => props.handleInitMapRender(map)} />
  );
};

export default Map;
