import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import Map from './Map.jsx';
import MapDirections from './MapDirections';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRef: '',
      map: null,
      directions: [],
    };

    this.handleInitMapRender = this.handleInitMapRender.bind(this);
    this.getMapRef = this.getMapRef.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((nextProps.startingLocation !== this.props.startingLocation
      || nextProps.entities.length !== this.props.entities.length
      || nextProps.waypoints !== this.props.waypoints
      || !this.state.mapRef)) {
      console.log('component should update');
      return true;
    }
    return false;
  }

  getMapRef(node) {
    this.setState({
      mapRef: node,
    }, () => {
      this.handleInitMapRender(this.state.mapRef);
    });
  }

  handleInitMapRender(node) {
    this.setState({
      map: new google.maps.Map(node, {
        center: this.props.startingLocation || { lat: 37.775, lng: -122.419 },
        zoom: 7,
      }),
    }, () => {
      this.renderEntities(this.state.map, this.props.entities);
    });
  }
  renderEntities(map, entities) {
    const markers = this.makeEntityMarkers(entities, map, this.makeEntityInfoWindows.bind(this));
    new MarkerClusterer(map, markers, { imagePath: './maps/img/m' });

    if (this.props.waypoints[0]) {
      MapDirections(this.props.waypoints, this.props.startingLocation, this.state.map, this.props.setItinerary);
    }
  }

  makeEntityMarkers(entities, map, infoWindowCb) {
    if (map) {
      const markers = entities.map(({ name, coordinates: [lat, lng] }, index) =>
        new google.maps.Marker({
          position: { lat, lng },
          label: `${index + 1}`,
          map,
          title: name,
        }));
      infoWindowCb(markers, map);
      return markers;
    }
  }

  makeEntityInfoWindows(markers, map) {
    console.log('makeInfo windows called');
    const infoWindow = new google.maps.InfoWindow({
      content: 'Entity marker',
    });
      // add an event listener to open the infowindow on click
    markers.forEach((marker) => {
      marker.addListener('click', () => {
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(map, marker);
      });
    });
  }

  makeInfoWindowHtml() {

  }

  render() {
    return (
      <Map handleInitMapRender={this.getMapRef} />
    );
  }
}

MapContainer.propTypes = {
  startingLocation: PropTypes.objectOf(PropTypes.number),
  entities: PropTypes.arrayOf(PropTypes.object),
  waypoints: PropTypes.arrayOf(PropTypes.object),
  setItinerary: PropTypes.func,
};

export default MapContainer;
