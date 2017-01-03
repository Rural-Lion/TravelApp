// App - all state is held here for now
  // LandingPage
    // Inputs
    // PlanVacationButton
    // InterestButtons
      // interestButton
  // ResultsPage
    // NavBar
    // EntityList
      // EntityListEntry
    // Map

import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { INTERESTS, generateActivities, getCoordinates, FancyBorder } from './helpers';
import LandingPage from './LandingPage/LandingPage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // inputs from landing page
      userQuery: {
        budgetOfTrip: 0,
        lengthOfTrip: 0,
        startingLocation: '',
        distanceOfTrip: 0,
        startingLocationCoordinates: {},
      },
      // users interests, generated from clicking interest buttons on landing page
      userInterests: [],
      // list of results, generated from api call, used by results page
      entities: [],
    };

    this.handleInterestButtonClick = this.handleInterestButtonClick.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handlePlanButtonClick = this.handlePlanButtonClick.bind(this);
  }

  handleInterestButtonClick(e) {
    const newArray = this.state.userInterests.slice();
    const indexOf = newArray.indexOf(e.target.innerHTML);
    if (indexOf === -1) {
      newArray.push(e.target.innerHTML);
    } else {
      newArray.splice(indexOf, 1);
    }
    this.setState({
      userInterests: newArray,
    });
  }

  handleInputOnChange(e) {
    const userQuery = Object.assign({}, this.state.userQuery);
    const key = e.target.dataset.tag;
    userQuery[key] = e.target.value;
    this.setState({
      userQuery,
    }, () => { console.log(userQuery.startingLocation); });
  }

  handlePlanButtonClick() {
    const latLng = getCoordinates(this.state.userQuery.startingLocation);
    if (latLng) {
      const userQuery = Object.assign({}, this.state.userQuery);
      userQuery.startingLocationCoordinates = latLng;
      this.setState(
        userQuery,
      );
      axios.get('/entitiesWithinRadius', {
        params: {
          latitude: latLng.lat,
          longitude: latLng.lng,
          distance: this.state.userQuery.distanceOfTrip,
          activities: this.state.userInterests,
        },
      })
      .then((res) => {
        console.log('RES', res);
        this.setState({
          entities: generateActivities(res.data.RECDATA),
        }, () => { console.log('entities in app', this.state.entities); });
      });
    }
  }

  render() {
    return (
      <FancyBorder color="red">
        <LandingPage
          interests={INTERESTS}
          handleInterestButtonClick={this.handleInterestButtonClick}
          handlePlanButtonClick={this.handlePlanButtonClick}
          handleChange={this.handleInputOnChange}
        />
        <ResultsPage
          userQuery={this.state.userQuery}
          entities={this.state.entities}
        />
      </FancyBorder>
    );
  }
}
export default App;
