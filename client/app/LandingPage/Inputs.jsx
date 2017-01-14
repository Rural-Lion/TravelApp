import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import { setLocation, setBudget, setDistance, setLength } from '../actions/inputActions.js';
import Autocomplete from 'react-google-autocomplete';

const Inputs = props => (
  <FancyBorder color="yellow" >
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      What is your budget?
        <input
          data-tag="budgetOfTrip"
          onChange={e => props.handleChange(setBudget, e.target.value)}
          className="landing-page-inputs"
          type="text"
          value={props.userQuery.budgetOfTrip}
        />
        <span className="landing-page-input-examples">(e.g. $"300")</span>
      </FancyBorder>
    </div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      How long are you traveling?
        <input
          data-tag="lengthOfTrip"
          onChange={e => props.handleChange(setLength, e.target.value)}
          className="landing-page-inputs"
          type="text"
          value={props.userQuery.lengthOfTrip}
        />
        <span className="landing-page-input-examples">(e.g. "3" days)</span>
      </FancyBorder>
    </div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      Where are you starting from?
        <Autocomplete
          data-tag="startingLocation"
          onPlaceSelected={place => props.handleChange(setLocation, place.formatted_address)}
          onChange={e => props.handleChange(setLocation, e.target.value)}
          className="landing-page-inputs"
          type="text"
          value={props.userQuery.startingLocation}
        />
        <span className="landing-page-input-examples">(e.g. "San Francisco")</span>
      </FancyBorder>
    </div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      How far do you want to go?
        <input
          data-tag="distanceOfTrip"
          onChange={e => props.handleChange(setDistance, e.target.value)}
          className="landing-page-inputs"
          type="text"
          value={props.userQuery.distanceOfTrip}
        />
        <span className="landing-page-input-examples">(e.g. "300" miles)</span>
      </FancyBorder>
    </div>
  </FancyBorder>
  );

Inputs.propTypes = {
  handleChange: PropTypes.func,
  userQuery: PropTypes.object,
};

export default Inputs;