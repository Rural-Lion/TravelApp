import React, { PropTypes } from 'react';

const Map = props => (
  <div className="row" ref={map => props.handleInitMapRender(map)} />
  );

Map.propTypes = {
  handleInitMapRender: PropTypes.func,
};

export default Map;
