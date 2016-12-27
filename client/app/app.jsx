// App - all state is held here for now
  // LandingPage
    // Inputs
    // PlanVacationButton
    // InterestButtons
      // interestButton
  // ResultsPage
    // NavBar
    // ActivityList
      // ActivityListEntry
    // Map

import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import {INTERESTS, generateActivities, FancyBorder} from './helpers.js';
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
        startingLocation: 'honolulu',
        distanceOfTrip: 0,
      },
      // users interests, generated from clicking interest buttons on landing page
      userInterests: [],
      // list of results, generated from api call, used by results page
      activities: [],
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
      userQuery: userQuery
    });
  }

  handlePlanButtonClick() {
    axios.get('https://ridb.recreation.gov/api/v1/recareas?apiKey=2CE3A404B8824CFEA7652104FCEEE328&full=TRUE&limit=10')
    .then((res) => {
      this.setState({
        activities: generateActivities(res.data.RECDATA),
      }, () => {console.log("Activities", this.state.activities)});
    });
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
          activities={this.state.activities}
          userQuery={this.state.userQuery}
          selectedActivities={this.state.activities}
        />
      </FancyBorder>
    );
  }
}
export default App;
