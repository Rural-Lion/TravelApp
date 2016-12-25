import React, { Component, PropTypes } from 'react';
import axios from 'axios';

// FRONT END COMPONENT TREE

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

// for questions on the proptypes after the components, check it out on docs. they are pretty cool


// interests for interest buttons are hard coded in
const INTERESTS = ['hiking', 'skiing', 'boating', 'historical', 'mountains', 'fishing'];

// function for creating objects from the results of api request to the US website
const generateActivities = res => res.map(({
                  RECAREAADDRESS: [{ PostalCode, RecAreaStreetAddress1, City, AddressStateCode }],
                  RecAreaLatitude,
                  RecAreaLongitude,
                  RecAreaName,
                  RecAreaPhone,
                  RecAreaDescription,
                  ACTIVITY,
                   MEDIA,
               }) => {
  const activities = ACTIVITY.map(({ ActivityName }) => ActivityName);

  return {
    img: MEDIA,
    name: RecAreaName,
    phoneNumber: RecAreaPhone,
    description: RecAreaDescription,
    coordinates: [RecAreaLongitude, RecAreaLatitude],
    address: `${RecAreaStreetAddress1} ${City}, ${AddressStateCode} ${PostalCode}`,
    activities,
  };
});

// all components are being passed through this function,
// in order to put borders around kthem to make styling easier
  // uncomment the classes on the css page to enable the borders
const FancyBorder = function (props) {
  return (
    <div className={`FancyBorder FancyBorder-${props.color}`}>
      {props.children}
    </div>
  );
};

FancyBorder.propTypes = {
  color: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
};


const InterestButton = props => (
  <FancyBorder color="blue" class="interestButton">
    <button
      className="centered"
      onClick={(e) => { props.handleInterestButtonClick(e); }}
    >{props.interest}</button>
  </FancyBorder>
  );

InterestButton.propTypes = {
  interest: PropTypes.string,
  handleInterestButtonClick: PropTypes.func,
};

const InterestButtons = (props) => {
  const interests = props.interests;
  // generates buttons based off of INTERESTS array. currently hard coded
  const buttons = interests.map((interest, index) =>
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
      <InterestButton
        interest={interest}
        key={index}
        handleInterestButtonClick={props.handleInterestButtonClick}
      /></div>);

  return (
    // renders buttons
    <FancyBorder color="green">
      {buttons}
    </FancyBorder>
  );
};

InterestButtons.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.string),
  handleInterestButtonClick: PropTypes.func,
};


const PlanVacationButton = props => (
  <FancyBorder color="yellow">
    <button
      className="centered"
      onClick={() => props.handlePlanButtonClick()}
    >
    Plan My Vacation
    </button>
  </FancyBorder>

);

PlanVacationButton.propTypes = {
  handlePlanButtonClick: PropTypes.func,
};

const Inputs = props => (
  <FancyBorder color="yellow" >
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      [//input for budget]
        <input
          data-tag="budgetOfTrip"
          onChange={e => props.handleChange(e)}
          className="lpInput"
          type="text"
        />
      </FancyBorder>
    </div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      [//input for length of trip]
        <input
          data-tag="lengthOfTrip"
          onChange={e => props.handleChange(e)}
          className="lpInput"
          type="text"
        />
      </FancyBorder>
    </div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      [// input for starting location]
        <input
          data-tag="startingLocation"
          onChange={e => props.handleChange(e)}
          className="lpInput"
          type="text"
        />
      </FancyBorder>
    </div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      [// input for distance willing to travel]
        <input
          data-tag="distanceOfTrip"
          onChange={e => props.handleChange(e)}
          className="lpInput"
          type="text"
        />
      </FancyBorder>
    </div>
  </FancyBorder>
  );

Inputs.propTypes = {
  handleChange: PropTypes.func,
};

const LandingPage = function (props) {
  return (
    <div className="landingPage">
      <FancyBorder color="orange">
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered text-center">
            <FancyBorder color="yellow"><h1>TravelApp</h1></FancyBorder>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-centered">
            <div className="row">
              [// renders input boxes]
              <Inputs handleChange={props.handleChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <FancyBorder color="yellow">
            <div className="text-center">
              <h5 >Choose at least 2 interests</h5>
            </div>
          </FancyBorder>
        </div>
        <div className="row">
          <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-centered">
            <div className="row">
              [// renders interest buttons]
              <InterestButtons
                interests={props.interests}
                handleInterestButtonClick={props.handleInterestButtonClick}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered">
              [//planVacationButton:sends api request to get list of activities,then sets state]
            <PlanVacationButton handlePlanButtonClick={props.handlePlanButtonClick} />
          </div>
        </div>
      </FancyBorder>
    </div>
  );
};

LandingPage.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.string),
  handleInterestButtonClick: PropTypes.func,
  handleChange: PropTypes.func,
  handlePlanButtonClick: PropTypes.func,
};


const NavBar = props => (
  <FancyBorder color="yellow">
    <div className="row navBar">
      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1">
        <FancyBorder color="green">
        [//currently doesnt do anything]
          <button type="button" className="goBackButton btn btn-default">Go Back</button>
        </FancyBorder>
      </div>
      <div className="col-xs-offset-6 col-sm-offset-6 col-md-offset-6 col-lg-offset-6 col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <FancyBorder color="green">
        [//currently doesnt do anything]
          <button type="button" className="finalizeButton btn btn-default">{'Finalize >'}</button>
        </FancyBorder>
      </div>
    </div>
  </FancyBorder>
  );

NavBar.propTypes = {

};

// INCOMPLETE
  // has no interaction with user inputs or events
const Map = props => (
  <div>
    <div className="row">
      <h1 className="text-center">Results Map</h1>
    </div>
    <div className="row mapContainer">
      <iframe
        frameBorder="0"
        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCBYpJtIs3LND6eRzsNbPldwx9cqHh3WOM&origin=${props.userQuery.startingLocation}&destination=${props.selectedActivities[props.selectedActivities - 1]}`}
        allowFullScreen
        className="map"
      />

    </div>
  </div>

  );

Map.propTypes = {
  userQuery: PropTypes.object,
  selectedActivities: PropTypes.array,
};


const ActivityListEntry = props => (
  <FancyBorder color="green">
    <div className="row activityListEntry">
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <FancyBorder color="blue"><div className="text-center">{props.index}</div></FancyBorder>
      </div>
      <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
        <div className="row">
          <FancyBorder color="blue"><div>{props.activity.name}</div></FancyBorder>
        </div>
        <div className="row">
          <FancyBorder color="blue"><div>{props.activity.activities.join(', ').toLowerCase()}</div></FancyBorder>
        </div>
        <div className="row">
          <FancyBorder color="blue">
            <div dangerouslySetInnerHTML={{ __html: props.activity.description }} />
          </FancyBorder>
        </div>
        <div className="row">
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <FancyBorder color="blue"><div>{props.activity.phoneNumber}</div></FancyBorder>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <FancyBorder color="blue"><div>{props.activity.address}</div></FancyBorder>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <FancyBorder color="blue">
              <a href={props.activity.website} >{props.activity.website}</a>
            </FancyBorder>
          </div>
        </div>
      </div>
    </div>
  </FancyBorder>
  );

ActivityListEntry.propTypes = {
  activity: PropTypes.object,
  index: PropTypes.number,
};

// renders activities from given array
  // currently gets array of activities from US API
const ActivityList = (props) => {
  const activities = props.activities;
  const activityList = activities.map((activity, index) =>
    <ActivityListEntry activity={activity} index={index} key={index} />);

  return (
    <div>
      <div className="row">
        <h1 className="text-center">Results List</h1>
      </div>
      <div className="row activityListContainer">
        <div className="activityList">
          <FancyBorder color="yellow">
            {activityList}
          </FancyBorder>
        </div>
      </div>
    </div>

  );
};

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object),
};

const ResultsPage = props => (
  <div className="resultsPage">
    <FancyBorder color="orange">
      [//render navbar]
      <div className="row">
        <NavBar />
      </div>
      <div className="row mapAndList">
        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" >
          [//render map]
          <Map userQuery={props.userQuery} selectedActivities={props.selectedActivities} />
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          [// render activitylist]
          <ActivityList activities={props.activities} />
        </div>
      </div>
    </FancyBorder>
  </div>
  );

ResultsPage.propTypes = {
  userQuery: PropTypes.object,
  activities: PropTypes.arrayOf(PropTypes.object),
  selectedActivities: PropTypes.array,
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      // inputs from landing page
      userQuery: {
        budgetOfTrip: 0,
        lengthOfTrip: 0,
        startingLocation: 'honalulu',
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
      userQuery,
    });
  }

  handlePlanButtonClick() {
    axios.get('https://ridb.recreation.gov/api/v1/recareas?apiKey=2CE3A404B8824CFEA7652104FCEEE328&full=TRUE&limit=10')
    .then((res) => {
      this.setState({
        activities: generateActivities(res.data.RECDATA),
      });
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
