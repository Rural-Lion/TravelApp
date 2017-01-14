import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';
import { setLocation, setBudget, setDistance, setLength } from '../../actions/inputActions.js';
import Autocomplete from 'react-google-autocomplete';
import { Button } from 'react-bootstrap'

const Inputs = props => (
  <div className='options-container'>
    <div className='row'>
      <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5 options-input-container'>
        <strong>Location</strong>
          <Autocomplete id='location' 
            data-tag="startingLocation"
            className="options-inputs"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.userQuery.startingLocation}
          />
      </div>
      <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5 options-input-container'>
        <strong>Distance (km)</strong>
          <input id='distance' 
            data-tag="distanceOfTrip"
            className="options-inputs"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.userQuery.distanceOfTrip}
          />
      </div>
    </div>
    <div className='row'>
      <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5 options-input-container'>
      <strong>Total Budget</strong>
        <input id='budget' 
          data-tag="budgetOfTrip"
          className="options-inputs"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.userQuery.budgetOfTrip}
        />
      </div>
      <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5 options-input-container'>
      <strong>Time Length (days)</strong>
        <input id='time'
          data-tag="lengthOfTrip"
          className="options-inputs"
          type="text"
          onChange={(e) => value=e.target.value}
          value={props.userQuery.lengthOfTrip}
        />
      </div>
    </div>
    <div className='row'>
      <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5 options-input-container'>
          <strong>Start Time</strong>
          <input id='startingTime' 
            data-tag="dayLength1"
            className="options-inputs"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.startingTime}
          />
      </div>
      <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5 options-input-container'>
          <strong>End Time</strong>
          <input id='endingTime' 
            data-tag="dayLength2"
            className="options-inputs"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.endingTime}
          />
      </div>
    </div>
    <div className='row'>
      <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5 options-input-container'>
        <strong>Daily Food Budget</strong>
          <input id='foodCost' 
            data-tag="allowanceForFood"
            className="options-inputs"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.foodCostPerDay}
          />
      </div>
      <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5 options-input-container'>
        <strong>Daily Sleep Budget</strong>
          <input id='nightlyCost' 
            data-tag="sleep preference"
            className="options-inputs"
            type="text"
            onChange={(e) => value=e.target.value}
            value={props.nightlyCost} 
          />
      </div>
    </div>
    <div className='row options-planbutton-container'>
      <div className='col'>
        <Button bsStyle='primary' className='options-planbutton'
          onClick= { (e) => {
            props.setPreferences(+document.getElementById('foodCost').value, +document.getElementById('startingTime').value, +document.getElementById('endingTime').value, +document.getElementById('nightlyCost').value);
            props.handleChange(setBudget, document.getElementById('budget').value);
            props.handleChange(setLength, document.getElementById('time').value);
            props.handleChange(setLocation, document.getElementById('location').value);
            props.handleChange(setDistance, document.getElementById('distance').value);
            props.selectTab('EntityList');
            }
          }
        > Search
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