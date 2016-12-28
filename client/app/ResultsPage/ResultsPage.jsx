// ResultsPage
    // NavBar
    // ActivityList
      // ActivityListEntry
    // Map

import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import {FancyBorder} from '../helpers.js';
import NavBar from './NavBar.jsx';
import ActivityList from './ActivityList.jsx';
import Map from './Map.jsx';

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

export default ResultsPage;
