import React, { Component, PropTypes } from 'react';
import {FancyBorder} from '../helpers.js';
import ActivityListEntry from './ActivityListEntry.jsx';

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

export default ActivityList;