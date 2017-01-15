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
    } else { this.props.clearItinerary(); }
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
      infoWindowCb(markers, map, entities);
      return markers;
    }
  }

  makeEntityInfoWindows(markers, map, entities) {
    const infoWindow = new google.maps.InfoWindow();
      // add an event listener to open the infowindow on click
    markers.forEach((marker, index) => {
      marker.addListener('click', () => {
        infoWindow.setContent(this.makeInfoWindowHtml(entities, index));
        infoWindow.open(map, marker);
        const onClick = (e) => {
          this.props.showDetails(e, entities[index]);
        };
        google.maps.event.addListener(infoWindow, 'domready', () => {
          google.maps.event.clearInstanceListeners(infoWindow);
          document.getElementById('theButton').addEventListener('click', onClick);
          document.getElementById('theOtherButton').addEventListener('click', (e) => {
            this.props.addToItinerary(e, entities[index]);
          });
        });
      });
    });
  }

  makeInfoWindowHtml(entities, index) {
    return (
        `<h5>${entities[index].name}</h5>
        <div class="text-center">
          <a id="theButton"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>&nbsp;Details</a>&nbsp;&nbsp;
          <a id="theOtherButton"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>&nbsp;Add to itinerary</a>
        </div>`
    );
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
  showDetails: PropTypes.func,
  addToItinerary: PropTypes.func,
};

export default MapContainer;
