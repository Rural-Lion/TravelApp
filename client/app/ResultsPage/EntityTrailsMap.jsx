import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers';
import MapMarkerClusterer from './Map/MapClusterer';

class EntityTrailsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: [],
      map: null,
      mapRef: null,
    };
  }

  // componentWillMount() {

  // }

  // componentDidMount() {

  // }

  // componentWillReceiveProps(nextProps) {

  // }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  // componentWillUpdate(nextProps, nextState) {
  //
  // }

  // componentDidUpdate(prevProps, prevState) {

  // }

  // componentWillUnmount() {

  // }
  parseTrails() {
    return this.props.trails.map((trail) => {
      trail.coordinates = trail.coordinates
        .slice(12, trail.coordinates.length - 2)
        .split(',')
        .map((point) => {
          point = point.split(' ');
          return { lat: +point[0], lng: +point[1] };
        });
    });
  }
  getMapRef(node) {
    this.setState({
      mapRef: node,
    }, () => {
      this.initMap(this.state.mapRef);
    });
  }
  initMap(mapRef) {
    console.log('init map called', mapRef);
    const map = new google.maps.Map(mapRef, {
      center: { lat: this.props.center[0], lng: this.props.center[1] },
      zoom: 9,
    });
    const entityMarker = new google.maps.Marker({
      position: { lat: this.props.center[0], lng: this.props.center[1] },
      map,
      animation: google.maps.Animation.DROP,
    });
    return map;
  }
  render() {
    return (
      <FancyBorder color="green">
        <div className="modalMap container-fluid" ref={(map) => { this.getMapRef(map); }} />
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
