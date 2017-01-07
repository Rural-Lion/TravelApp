import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import { setLocation, setBudget, setDistance, setLength } from '../actions/inputActions.js';
import Autocomplete from 'react-google-autocomplete';

const Inputs = props => (
  <FancyBorder color="yellow" >
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      How much do you want to spend?
        <input
          data-tag="budgetOfTrip"
          onChange={e => props.handleChange(setBudget, e.target.value)}
          className="lpInput"
          type="text"
          value={props.userQuery.budgetOfTrip}
        />
      </FancyBorder>
    </div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      How long are you traveling?
        <input
          data-tag="lengthOfTrip"
          onChange={e => props.handleChange(setLength, e.target.value)}
          className="lpInput"
          type="text"
          value={props.userQuery.lengthOfTrip}
        />
      </FancyBorder>
    </div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      Where are you starting from?
        <Autocomplete
          data-tag="startingLocation"
          onPlaceSelected={place => props.handleChange(setLocation, place.formatted_address)}
          onChange={e => props.handleChange(setLocation, e.target.value)}
          className="lpInput"
          type="text"
          value={props.userQuery.startingLocation}
        />
      </FancyBorder>
    </div>
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <FancyBorder color="green">
      How far away do you want to go?
        <input
          data-tag="distanceOfTrip"
          onChange={e => props.handleChange(setDistance, e.target.value)}
          className="lpInput"
          type="text"
          value={props.userQuery.distanceOfTrip}
        />
      </FancyBorder>
    </div>
  </FancyBorder>
  );

Inputs.propTypes = {
  handleChange: PropTypes.func,
  userQuery: PropTypes.object,
};

export default Inputs;