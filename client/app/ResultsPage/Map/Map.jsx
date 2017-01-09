import React, { PropTypes } from 'react';

const Map = props => (
  <div className="map container-fluid" ref={map => props.handleInitMapRender(map)} />
  );

Map.propTypes = {
  handleInitMapRender: PropTypes.func,
};
export default Map;
