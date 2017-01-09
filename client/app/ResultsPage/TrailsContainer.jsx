import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FancyBorder } from '../helpers.js';
import EntityTrailsMap from './EntityTrailsMap.jsx';

class TrailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: [],
      trailsToDisplay: null,
    };
    this.lengthGroups = ['< 2', '2-5', '5-10', '> 10'];
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
  filterTrailsByLength(length) {
    const mapLength = {
      0: [null, 2],
      1: [2, 5],
      2: [5, 10],
      3: [10, null],
    };
    const filter = mapLength[length];
    const filteredTrails = this.state.trails.filter((trail) => {
      if ((filter[0] ? trail.length > filter[0] : true)
        && (filter[1] ? trail.length < filter[1] : true)) {
        return true;
      }
      return false;
    });
    this.setState({
      trailsToDisplay: filteredTrails,
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
              {this.lengthGroups.map((item, index) =>
                <Button key={index} onClick={() => (this.filterTrailsByLength(index))}>{item} miles</Button>)}
            </ButtonGroup>
          </div>
          <EntityTrailsMap
            trails={this.state.trailsToDisplay ? this.state.trailsToDisplay : this.state.trails}
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
