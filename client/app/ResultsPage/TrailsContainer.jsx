import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { FancyBorder } from '../helpers.js';
import EntityTrailsMap from './EntityTrailsMap.jsx';

class TrailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: [],
      trailsToDisplay: null,
      showChart: false,
    };
    this.lengthGroups = ['< 2', '2-5', '5-10', '> 10'];
    this.showChart = this.showChart.bind(this);
    this.hideChart = this.hideChart.bind(this);
  }
  componentWillMount() {
    this.setState({
      trails: this.parseTrails(this.props.entity.trails),
    });
  }

  parseTrails(trails) {
    // get the trail coordinates in the right format
    return trails.map((trail, index) => {
      trail.coordinates = trail.coordinates
        .slice(12, trail.coordinates.length - 1)
        .split(', ')
        .map(point => point.split(' '))
        .map(item => [+item[1], +item[0]]);
      this.getElevationData(trail, index);
      return trail;
    });
  }
  showChart() {
    this.setState({
      showChart: true,
    });
  }
  hideChart() {
    this.setState({
      showChart: false,
    });
  }
  getElevationData(trail, index) {
    let collection = trail.coordinates;
    // handle the long trails
    if (trail.coordinates.length > 250) {
      const divider = Math.ceil(trail.coordinates.length / 250);
      collection = trail.coordinates.filter((value, index) => !(index % divider));
    }
    axios.get('http://open.mapquestapi.com/elevation/v1/profile', {
      params: {
        key: process.env.ELEVATION_KEY,
        latLngCollection: collection.join(','),
        unit: 'f',
      },
    })
    .then((res) => {
      let up = 0;
      let down = 0;
      const profile = res.data.elevationProfile.map(item => item.height);
      for (let i = 0; i < profile.length - 1; i++) {
        if (profile[i + 1]) {
          const change = profile[i + 1] - profile[i];
          change > 0 ? up += change : down += change;
        }
      }
      trail.up = Math.round(up);
      trail.down = Math.round(down);
      trail.profile = res.data;
    })
    .catch(err => console.log('ERROR FROM ELEVATION API', err));
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
    return (
      <FancyBorder color="yellow" >
        <div className="container-fluid">
          <br />
          <div className="row text-center" >
            <h4>Found {this.state.trails.length || 'no'} trails within 50 miles</h4>
            <ButtonGroup bsSize="xs" style={{ paddingRight: '20px' }}>
              {this.lengthGroups.map((item, index) =>
                <Button bsStyle="info" key={index} onClick={() => (this.filterTrailsByLength(index))}>{item} miles</Button>)}
            </ButtonGroup>
          </div>
          <br />
          <div className="row trailMap">
            <EntityTrailsMap
              trails={this.state.trailsToDisplay ? this.state.trailsToDisplay : this.state.trails}
              center={this.props.entity.coordinates}
              entityID={this.props.entity.entityID}
              entityName={this.props.entity.name}
              showChart={this.showChart}
              hideChart={this.hideChart}
              show={this.state.showChart}
            />
          </div>
          {this.state.showChart ? <div id="chartContainer" /> : null}
        </div>
      </FancyBorder>
    );
  }
}

TrailsContainer.propTypes = {
  entity: PropTypes.object,
};

export default TrailsContainer;
