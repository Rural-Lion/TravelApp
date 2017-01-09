import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers';

class EntityTrailsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      mapRef: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.mapRef || this.props.trails !== nextProps.trails) {
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
    // create a map and link it to a dom element
    const map = new google.maps.Map(mapRef, {
      center: { lat: this.props.center[0], lng: this.props.center[1] },
      zoom: 8,
      mapTypeId: 'terrain',
    });
    // make a marker for the entity
    const entityMarker = new google.maps.Marker({
      position: { lat: this.props.center[0], lng: this.props.center[1] },
      map,
      animation: google.maps.Animation.DROP,
    });
    // make an infowindow for the entity
    const infoWindow = new google.maps.InfoWindow({
      content: this.props.entityName,
    });
    // add an event listener to open the infowindow on click
    entityMarker.addListener('click', () => {
      infoWindow.open(map, entityMarker);
    });
    // open the infowindow on render
    infoWindow.open(map, entityMarker);
    return map;
  }


  createTrailMarkers(map) {
    const infoWindow = new google.maps.InfoWindow();
    const trailMarkers = this.props.trails.map((trail) => {
      // create a marker for each trail:
      const marker = new google.maps.Marker({
        position: trail.coordinates[0],
        icon: './maps/icons/hiking2.png',
        map,
        title: trail.name,
      });
      // add an event listener for each marker to open an infowindow:
      marker.addListener('mouseover', () => {
        infoWindow.setContent(`${trail.name}: ${trail.length}m`);
        infoWindow.open(map, marker);
      });
      // create a polyline for each trail to draw it on the map:
      const path = this.createPolyline(trail);
      let showPath = true;
      // add an event listener that shows/hides the trail when clicked:
      marker.addListener('click', () => {
        showPath ? path.setMap(map) : path.setMap(null);
        showPath = !showPath;
      });

      return marker;
    });
    // show trail markers in clusters:
    return new MarkerClusterer(map, trailMarkers, { imagePath: './maps/img/m' });
  }

  createPolyline(trail) {
    // create a polyline object
    const trailPath = new google.maps.Polyline({
      path: trail.coordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    return trailPath;
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
