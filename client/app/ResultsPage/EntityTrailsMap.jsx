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

  componentWillMount() {
    this.setState({
      trails: this.parseTrails(),
    }, () => { console.log('set state to parsed trails', this.state.trails); });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('comparing state:', this.state, nextState);
    if (!this.state.mapRef) {
      return true;
    }
    return false;
  }

  getMapRef(node) {
    this.setState({
      mapRef: node,
    }, () => {
      this.setState({
        map: this.initMap(this.state.mapRef),
      }, () => { this.createTrailMarkers(this.state.map); });
    });
  }
  initMap(mapRef) {
    console.log('here are the trails', this.state.trails);
    const map = new google.maps.Map(mapRef, {
      center: { lat: this.props.center[0], lng: this.props.center[1] },
      zoom: 9,
    });
    const entityMarker = new google.maps.Marker({
      position: { lat: this.props.center[0], lng: this.props.center[1] },
      map,
      animation: google.maps.Animation.DROP,
    });
    const infoWindow = new google.maps.InfoWindow({
      content: this.props.entityName,
    });

    entityMarker.addListener('click', () => {
      infoWindow.open(map, entityMarker);
    });
    infoWindow.open(map, entityMarker);
    return map;
  }
  parseTrails() {
    return this.props.trails.map((trail) => {
      trail.coordinates = trail.coordinates
        .slice(12, trail.coordinates.length - 2)
        .split(',')
        .map((point) => {
          point = point.split(' ');
          return { lat: +point[1], lng: +point[0] };
        });
      return trail;
    });
  }
  createTrailMarkers(map) {
    const infoWindow = new google.maps.InfoWindow();
    const trailMarkers = this.state.trails.map((trail) => {
      console.log('making trail markers on', map);
      const marker = new google.maps.Marker({
        position: trail.coordinates[0],
        icon: './maps/icons/hiking2.png',
        map,
        title: trail.name,
      });
      marker.addListener('click', () => {
        infoWindow.setContent(`${trail.name}: ${trail.length}m`);
        infoWindow.open(map, marker);
      });
      return marker;
    });
    return new MarkerClusterer(map, trailMarkers, { imagePath: './maps/img/m' });
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
  entityName: PropTypes.string,
};

export default EntityTrailsMap;
