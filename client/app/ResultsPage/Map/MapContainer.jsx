import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import Map from './Map.jsx';
import MapClusterer from './MapClusterer';
import MapDirections from './MapDirections';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRef: '',
      map: null,
    };

    this.handleInitMapRender = this.handleInitMapRender.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log('thisis next props: ', nextProps);
    MapClusterer(nextProps.entities, this.state.map);
    if (nextProps.waypoints[0]) {
      MapDirections(nextProps.waypoints, nextProps.userQuery.startingLocationCoordinates, this.state.map);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.map === this.state.map || nextProps === this.props) {
      console.log('FALSEEE');
      return false;
    }
    console.log('true');
    return true;
  }

  handleInitMapRender(node) {
    this.setState({
      map: new google.maps.Map(node, {
        center: this.props.userQuery.startingLocationCoordinates || { lat: 37.775, lng: -122.419 },
        zoom: 7,
      }),
    });
  }


  render() {
    return (
      <div>
        <FancyBorder color="purple">
          <div>
            <h1 className="text-center">Results Map</h1>
          </div>
        </FancyBorder>
        <FancyBorder color="purple">
          <Map handleInitMapRender={this.handleInitMapRender} />
        </FancyBorder>
      </div>

    );
  }
}

MapContainer.propTypes = {
  userQuery: PropTypes.object,
  entities: PropTypes.arrayOf(PropTypes.object),
  waypoints: PropTypes.arrayOf(PropTypes.object),
};

export default MapContainer;
