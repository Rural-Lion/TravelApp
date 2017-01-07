import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers';
import MapClusterer from './Map/MapClusterer';

class EntityTrailsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.map = '';
  }

  // componentWillMount() {

  // }

  componentDidMount() {
    this.initMap(this.map);
  }

  // componentWillReceiveProps(nextProps) {

  // }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  // componentWillUpdate(nextProps, nextState) {

  // }

  // componentDidUpdate(prevProps, prevState) {

  // }

  // componentWillUnmount() {

  // }
  initMap(mapRef) {
    console.log('init map called', mapRef);
    this.setState({
      map: new google.maps.Map(mapRef, {
        center: { lat: this.props.center[0], lng: this.props.center[1] },
        zoom: 9,
      }),
    });
  }
  render() {
    return (
      <FancyBorder color="green">
        <div className="modalMap container-fluid" ref={(map) => { this.map = map; }} />
      </FancyBorder>
    );
  }
}

EntityTrailsMap.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  trails: PropTypes.arrayOf(PropTypes.object),
  entityID: PropTypes.number,
};

export default EntityTrailsMap;
