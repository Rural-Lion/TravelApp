import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';
import { setLocation, setBudget, setDistance, setLength } from '../../actions/inputActions.js';
import Autocomplete from 'react-google-autocomplete';
import { Button } from 'react-bootstrap'

const Inputs = props => (
  <div className='Optionscontainer'>
    <div className='row'>
      <div className='col optionsInput'>
        <strong>Location</strong>
          <Autocomplete id='location' 
            data-tag="startingLocation"
            className="lpInput"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.userQuery.startingLocation}
          />
      </div>
      <div className='col optionsInput'>
        <strong>Distance</strong>
          <input id='distance' 
            data-tag="distanceOfTrip"
            className="lpInput"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.userQuery.distanceOfTrip}
          />
      </div>
    </div>
    <div className='row'>
      <div className='col optionsInput'>
      <strong>Total Budget</strong>
        <input id='budget' 
          data-tag="budgetOfTrip"
          className="lpInput"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.userQuery.budgetOfTrip}
        />
      </div>
      <div className='col optionsInput'>
      <strong>Time Length (Days)</strong>
        <input id='time'
          data-tag="lengthOfTrip"
          className="lpInput"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.userQuery.lengthOfTrip}
        />
      </div>
    </div>
    <div className='row'>
      <div className='col optionsInput'>
          <strong>Start Time</strong>
          <input id='startingTime' 
            data-tag="dayLength1"
            className="lpInput"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.startingTime}
          />
      </div>
      <div className='col optionsInput'>
          <strong>End Time</strong>
          <input id='endingTime' 
            data-tag="dayLength2"
            className="lpInput"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.endingTime}
          />
      </div>
    </div>
    <div className='row'>
      <div className='col optionsInput'>
        <strong>Daily Food Budget</strong>
          <input id='foodCost' 
            data-tag="allowanceForFood"
            className="lpInput"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.foodCostPerDay}
          />
      </div>
      <div className='col optionsInput'>
        <strong>Daily Sleeping Budget</strong>
          <input id='nightlyCost' 
            data-tag="sleep preference"
            className="lpInput"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.nightlyCost} 
          />
      </div>
    </div>
    <div className='row planButton'>
      <div className='col'>
        <Button bsStyle='primary' className='planButton2'
          onClick= { (e) => {
            props.setPreferences(+document.getElementById('foodCost').value, +document.getElementById('startingTime').value, +document.getElementById('endingTime').value, +document.getElementById('nightlyCost').value);
            props.handleChange(setBudget, document.getElementById('budget').value);
            props.handleChange(setLength, document.getElementById('time').value);
            props.handleChange(setLocation, document.getElementById('location').value);
            props.handleChange(setDistance, document.getElementById('distance').value);
            }
          }
        > Plan My Vacation 
        </Button>
      </div>
    </div>
  </div>
  );

Inputs.propTypes = {
  handleChange: PropTypes.func,
  userQuery: PropTypes.object,
};

export default Inputs;