import React, { PropTypes } from 'react';

const Map = (props) => {
  console.log('map rendered');
  return (
    <div className="mapContainer container-fluid" ref={map => props.handleInitMapRender(map)} />
  );
};

Map.propTypes = {
  handleInitMapRender: PropTypes.func,
};
export default Map;
