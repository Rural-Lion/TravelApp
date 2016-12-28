import React, { Component, PropTypes } from 'react';
import {FancyBorder} from '../helpers.js';

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

export default Inputs;