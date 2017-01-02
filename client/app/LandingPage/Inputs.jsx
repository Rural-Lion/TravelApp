import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';

const Inputs = props => (
  <FancyBorder color="yellow" >
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      How much do you want to spend?
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
      How long are you traveling?
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
      Where are you starting from?
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
      How far away do you want to go?
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
