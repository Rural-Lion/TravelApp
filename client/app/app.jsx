import React, { Component } from 'react';

const ACTIVITIES = [];
const INTERESTS = [];


const FancyBorder = function (props) {
  return (
    <div className={`FancyBorder FancyBorder-${props.color}`}>
      {props.children}
    </div>
  );
};


// class planVacation Button
  // pass inputs
  // pass selected buttons

const planVacationButton = function (props) {
  return (
    <FancyBorder class="blue">
      <button onClick={e => this.clickHandler(e)}>Plan My Vacation</button>
    </FancyBorder>
  );
};


// class landingPage
  // render
    // header
    // inputs
    // choose interests text
    // interest buttons

class LandingPage extends Component {
  constructor(props) {
    super();
    this.state = {
      userQuery: {
        budgetOfTrip: 0,
        lengthOfTrip: 0,
        startinglocation: [],
        distanceOfTrip: 0,
      },
      interests: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
  }

  render() {
    return (
      <FancyBorder>
        <h1>TravelApp</h1>
        <Inputs />
        <h5>Choose at least 2 interests</h5>
        <InterestButtons interests={props.interests} />
        <PlanVacationButton chosenInterests={this.state.interests} query={this.state.userQuery} />
      </FancyBorder>
    );
  }
 }


// class inputs
  // pass input values up
  // render inputs

// class interest buttons
  // pass up selected buttons
  // render
    // interest buttons with given array param

// class interest button
  // passes up individual data when selected
  // renders
    // button with given param


// class resultsPage
  // takes given array of facilities
  // renders
    // nav bar
    // map header
    // map
    // activity header
    // list of activities

// class nav bar
  // renders
    // finalize button
    // go back button

// class map
  // renders
    // google map given
    // activityMapButtons

// class activityMapButtons
  // renders
    // button with given param

// class activityList
  // renders
    // list of activityListEntrys

// class ActivityListEntry
  // renders
    // entry with given activity object
class App extends Component {
  render() {
    return (
      <FancyBorder color="brown">
        <LandingPage />
        <ResultsPage />
      </FancyBorder>
    );
  }
}

export default App;
