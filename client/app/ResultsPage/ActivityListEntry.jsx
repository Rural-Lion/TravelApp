import React, { Component, PropTypes } from 'react';
import {FancyBorder} from '../helpers.js';


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

export default ActivityListEntry;
