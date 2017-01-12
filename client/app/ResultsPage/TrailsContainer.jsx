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
          // THIS WAS THE FORMAT FOR GOOGLE ELEVATION API
          // point = point.split(' ');
          // return { lat: +point[1], lng: +point[0] };
        // });
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
    // // MICROSOFT ELEVATION API
    // axios.post('http://dev.virtualearth.net/REST/v1/Elevation/Polyline', {
    //   params: {
    //     key: 'ApSftJUAJ1X_acPMnLpnmitPUgPzY_IFeLqTnUjXEHKn - vMMXXLORvLYuq6NwQxQ',
    //     points: trail.coordinates.join(','),
    //     sample: 256,
    //   },
    // })
    // MAPQUEST API:
    let collection = trail.coordinates;
    // handle the long trails
    if (trail.coordinates.length > 250) {
      const divider = Math.ceil(trail.coordinates.length / 250);
      collection = trail.coordinates.filter((value, index) => !(index % divider));
    }
    axios.get('http://open.mapquestapi.com/elevation/v1/profile', {
      params: {
        key: 'kPexnF9xAy5evZFa5r5y86phhxvw8pdH',
        latLngCollection: collection.join(','),
        unit: 'f',
      },
    })
    .then((res) => {
      console.log('ELEVATION RESPONSE', res.data);
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
      // const newTrail = Object.assign({}, trail, { up, down, profile: res.data });
      // this.setState({
      //   trails: this.state.trails.slice(0, index).concat(newTrail).concat(this.state.trails.slice(index + 1)),
      // }, () => { console.log('NEW TRAILS', this.state.trails); });
    })
    .catch(err => console.log('ERROR FROM ELEVATION API', err, 'Points in trail', trail.coordinates.length));


    // GOOGLE ELEVATION API:
    // const elevator = new google.maps.ElevationService();
    // elevator.getElevationAlongPath({
    //   path: trail.coordinates,
    //   samples: 256,
    // }, (results, status) => {
    //   if (status == 'OVER_QUERY_LIMIT') {
    //   } else {
    //     console.log('STATUS', status, trail.coordinates.length);
    //   }
    // });
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
    console.log('SHOW CHART', this.state.showChart);
    return (
      <FancyBorder color="yellow" >
        <div className="container-fluid">
          <br />
          <div className="row text-center" >
            <h4>Found {this.state.trails.length || 'no'} trails within 30mi</h4>
            <ButtonGroup bsSize="xs" style={{ paddingRight: '20px' }}>
              {this.lengthGroups.map((item, index) =>
                <Button key={index} onClick={() => (this.filterTrailsByLength(index))}>{item} miles</Button>)}
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
