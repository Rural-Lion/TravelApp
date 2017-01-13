import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';
import { setLocation, setBudget, setDistance, setLength } from '../../actions/inputActions.js';
import Autocomplete from 'react-google-autocomplete';

const Inputs = props => (
  <FancyBorder color="yellow" >
    <div className='optionsInput'>
      <FancyBorder color="green">
      $$$
        <input id='budget' 
          data-tag="budgetOfTrip"
          className="lpInput"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.userQuery.budgetOfTrip}
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
      <FancyBorder color="green">
      Time
        <input id='time'
          data-tag="lengthOfTrip"
          className="lpInput"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.userQuery.lengthOfTrip}
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
      <FancyBorder color="green">
      Location
        <Autocomplete id='location' 
          data-tag="startingLocation"
          className="lpInput"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.userQuery.startingLocation}
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
      <FancyBorder color="green">
      Distance
        <input id='distance' 
          data-tag="distanceOfTrip"
          className="lpInput"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.userQuery.distanceOfTrip}
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
    Day Length
      <FancyBorder  color="green" >
        Wake Up
        <input id='startingTime' 
          data-tag="dayLength1"
          className="lpInput"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.startingTime}
        />
        Come Back to Camp
        <input id='endingTime' 
          data-tag="dayLength2"
          className="lpInput"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.endingTime}
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
      <FancyBorder color="green">
      Daily Allowance for Food
        <input id='foodCost' 
          data-tag="allowanceForFood"
          className="lpInput"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.foodCostPerDay}
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
      <FancyBorder color="green">
      Sleeping Preferences
        <input id='nightlyCost' 
          data-tag="sleep preference"
          className="lpInput"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.nightlyCost} 
        />
      </FancyBorder>
    </div>
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center">
      <button
        onClick= { (e) => {
          props.setPreferences(+document.getElementById('foodCost').value, +document.getElementById('startingTime').value, +document.getElementById('endingTime').value, +document.getElementById('nightlyCost').value);
          props.handleChange(setBudget, document.getElementById('budget').value);
          props.handleChange(setLength, document.getElementById('time').value);
          props.handleChange(setLocation, document.getElementById('location').value);
          props.handleChange(setDistance, document.getElementById('distance').value);
          }
        }
      > Plan My Vacation 
      </button>
    </div>
  </FancyBorder>
  );

Inputs.propTypes = {
  handleChange: PropTypes.func,
  userQuery: PropTypes.object,
};

export default Inputs;