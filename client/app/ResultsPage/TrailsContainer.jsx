import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import EntityTrailsMap from './EntityTrailsMap.jsx';

class TrailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: [],
    };
  }
  componentWillMount() {
    this.setState({
      trails: this.parseTrails(this.props.entity.trails),
    });
  }

  parseTrails(trails) {
    // get the trail coordinates in the right format
    return trails.map((trail) => {
      trail.coordinates = trail.coordinates
        .slice(12, trail.coordinates.length - 1)
        .split(', ')
        .map((point) => {
          point = point.split(' ');
          return { lat: +point[1], lng: +point[0] };
        });
      return trail;
    });
  }

  render() {
    console.log('SELECTED ENTITY', this.props.entity);
    return (
      <FancyBorder color="yellow" >
        <div style={{ height: '55vh' }}>
        This is the trails container
        <EntityTrailsMap
          trails={this.state.trails}
          center={this.props.entity.coordinates}
          entityID={this.props.entity.entityID}
          entityName={this.props.entity.name}
        />
        </div>
      </FancyBorder>
    );
  }
}


TrailsContainer.propTypes = {
  entity: PropTypes.object,
};

export default TrailsContainer;
