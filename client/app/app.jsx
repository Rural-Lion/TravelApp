import React, { Component, PropTypes } from 'react';
import axios from 'axios';
// import activitiesJSON from './activities';

const INTERESTS = ['hiking', 'skiing', 'boating', 'historical', 'mountains', 'fishing'];

// fancy border to help with styling and page positioning
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

// class interest button
  // passes up individual data when selected
  // renders
    // button with given param

const InterestButton = props => (
  <FancyBorder color="blue" class="interestButton">
    <button className="centered" onClick={(e) => { props.handleInterestButtonClick(e); }}>{props.interest}</button>
  </FancyBorder>
  );

InterestButton.propTypes = {
  interest: PropTypes.string,
  handleInterestButtonClick: PropTypes.func,
};


// class interest buttons
  // pass up selected buttons
  // render
    // interest buttons with given array param

const InterestButtons = (props) => {
  const interests = props.interests;
  const buttons = interests.map((interest, index) =>
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
      <InterestButton interest={interest} key={index} handleInterestButtonClick={props.handleInterestButtonClick} /></div>);

  return (
    <FancyBorder color="green">
      {buttons}
    </FancyBorder>
  );
};

InterestButtons.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.string),
  handleInterestButtonClick: PropTypes.func,
};


// class planVacation Button
  // pass inputs
  // pass selected buttons

const PlanVacationButton = props => (

  <FancyBorder color="yellow">
    <button className="centered" onClick={() => props.handlePlanButtonClick()}>Plan My Vacation</button>
  </FancyBorder>

);

// class inputs
  // pass input values up
  // render inputs
const Inputs = props => (
  <FancyBorder color="yellow" >
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"><FancyBorder color="green"><input data-tag="budgetOfTrip" onChange={e => props.handleChange(e)} className="lpInput" type="text" /></FancyBorder></div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"><FancyBorder color="green"><input data-tag="lengthOfTrip" onChange={e => props.handleChange(e)} className="lpInput" type="text" /></FancyBorder></div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"><FancyBorder color="green"><input data-tag="startingLocation" onChange={e => props.handleChange(e)} className="lpInput" type="text" /></FancyBorder></div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"><FancyBorder color="green"><input data-tag="distanceOfTrip" onChange={e => props.handleChange(e)} className="lpInput" type="text" /></FancyBorder></div>
  </FancyBorder>
  );

Inputs.propTypes = {
  handleChange: PropTypes.func,
};


// class landingPage
  // render
    // header
    // inputs
    // choose interests text
    // interest buttons

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
              <Inputs handleChange={props.handleChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <FancyBorder color="yellow"><div className="text-center"><h5 >Choose at least 2 interests</h5></div></FancyBorder>
        </div>
        <div className="row">
          <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-centered">
            <div className="row">
              <InterestButtons interests={props.interests} handleInterestButtonClick={props.handleInterestButtonClick} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered">
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
};

// class nav bar
  // renders
    // finalize button
    // go back button


const NavBar = props => (
  <FancyBorder color="yellow">
    <div className="row navBar">
      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1">
        <FancyBorder color="green"><button type="button" className="goBackButton btn btn-default">Go Back</button></FancyBorder>
      </div>
      <div className="col-xs-offset-6 col-sm-offset-6 col-md-offset-6 col-lg-offset-6 col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <FancyBorder color="green"><button type="button" className="finalizeButton btn btn-default">{'Finalize >'}</button></FancyBorder>
      </div>
    </div>
  </FancyBorder>
  );

NavBar.propTypes = {

};


// class map
  // renders
    // google map given
    // activityMapButtons
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

};


// class ActivityListEntry
  // renders
    // entry with given activity object

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
          <FancyBorder color="blue"><div dangerouslySetInnerHTML={{ __html: props.activity.description }} /></FancyBorder>
        </div>
        <div className="row">
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <FancyBorder color="blue"><div>{props.activity.phoneNumber}</div></FancyBorder>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <FancyBorder color="blue"><div>{props.activity.address}</div></FancyBorder>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <FancyBorder color="blue"><a href={props.activity.website} >{props.activity.website}</a></FancyBorder>
          </div>
        </div>
      </div>
    </div>
  </FancyBorder>
  );

ActivityListEntry.propTypes = {
  activities: PropTypes.object,
  index: PropTypes.number,
};


// class activityList
  // renders
    // list of activityListEntrys
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

// class resultsPage
  // takes given array of facilities
  // renders
    // nav bar
    // map header
    // map
    // activity header
    // list of activities
const ResultsPage = props => (
  <div className="resultsPage">
    <FancyBorder color="orange">
      <div className="row">
        <NavBar />
      </div>
      <div className="row mapAndList">
        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" >
          <Map userQuery={props.userQuery} selectedActivities={props.selectedActivities} />
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <ActivityList activities={props.activities} />
        </div>
      </div>
    </FancyBorder>
  </div>
  );

ResultsPage.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object),
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      userQuery: {
        budgetOfTrip: 0,
        lengthOfTrip: 0,
        startingLocation: 'honalulu',
        distanceOfTrip: 0,
      },
      userInterests: [],
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
    console.log('called');
    axios.get('https://ridb.recreation.gov/api/v1/recareas?apiKey=2CE3A404B8824CFEA7652104FCEEE328&full=TRUE&limit=10')
    .then((res) => {
      console.log(res.data.RECDATA);
      this.setState({
        activities: generateActivities(res.data.RECDATA),
      });
    }, console.log(this.state.activities));
    // send request to google our database to fetch results
    // route to results page with access to fetched list of results
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
