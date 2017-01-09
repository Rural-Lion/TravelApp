import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
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
          <div className="text-center">
            <h4>Found {this.state.trails.length || 'no'} trails within 30mi</h4>
            <ButtonGroup bsSize="xs" style={{ paddingRight: '20px' }}>
              <Button>Easy</Button>
              <Button>Medium</Button>
              <Button>Hard</Button>
            </ButtonGroup>
            <ButtonGroup bsSize="xs" style={{ paddingRight: '20px' }}>
              <Button>{'< 2 mi'}</Button>
              <Button>2-5mi</Button>
              <Button>5-10mi</Button>
              <Button>{'> 10mi'}</Button>
            </ButtonGroup>
          </div>
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
