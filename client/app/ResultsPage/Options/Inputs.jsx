import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';
import { setLocation, setBudget, setDistance, setLength } from '../../actions/inputActions.js';
import Autocomplete from 'react-google-autocomplete';
import PlanVacationButton from './PlanVacationButton.jsx';

const Inputs = props => (
  <FancyBorder color="yellow" >
    <div className='optionsInput'>
      <FancyBorder color="green">
      $$$
        <input style={{width: '350px'}}
          data-tag="budgetOfTrip"
          onChange={e => props.handleChange(setBudget, e.target.value)}
          className="lpInput"
          type="text"
          value={props.userQuery.budgetOfTrip}
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
      <FancyBorder color="green">
      Time
        <input style={{width: '350px'}}
          data-tag="lengthOfTrip"
          onChange={e => props.handleChange(setLength, e.target.value)}
          className="lpInput"
          type="text"
          value={props.userQuery.lengthOfTrip}
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
      <FancyBorder color="green">
      Location
        <Autocomplete style={{width: '350px'}}
          data-tag="startingLocation"
          onPlaceSelected={place => props.handleChange(setLocation, place.formatted_address)}
          onChange={e => props.handleChange(setLocation, e.target.value)}
          className="lpInput"
          type="text"
          value={props.userQuery.startingLocation}
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
      <FancyBorder color="green">
      Distance
        <input style={{width: '350px'}}
          data-tag="distanceOfTrip"
          onChange={e => props.handleChange(setDistance, e.target.value)}
          className="lpInput"
          type="text"
          value={props.userQuery.distanceOfTrip}
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
    Day Length
      <FancyBorder  color="green" >
        Wake Up
        <input style={{width: '150px'}}
          data-tag="dayLength1"
         /*onChange={e => props.handleChange(setDistance, e.target.value)}*/
          className="lpInput"
          type="text"
          /*value={props.userQuery.dayLength}*/
        />
        Come Back to Camp
        <input style={{width: '150px'}}
          data-tag="dayLength2"
         /*onChange={e => props.handleChange(setDistance, e.target.value)}*/
          className="lpInput"
          type="text"
          /*value={props.userQuery.dayLength}*/
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
      <FancyBorder color="green">
      Daily Allowance for Food
        <input style={{width: '350px'}}
          data-tag="allowanceForFood"
          /* onChange={e => props.handleChange(setDistance, e.target.value)} */
          className="lpInput"
          type="text"
          /* value={props.userQuery.distanceOfTrip} */
        />
      </FancyBorder>
    </div>
    <div className='optionsInput'>
      <FancyBorder color="green">
      Sleeping Preferences
        <input style={{width: '350px'}}
          data-tag="sleep preference"
          /* onChange={e => props.handleChange(setDistance, e.target.value)} */
          className="lpInput"
          type="text"
          /* value={props.userQuery.distanceOfTrip} */
        />
      </FancyBorder>
    </div>
    <div className="row">
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered">
        <PlanVacationButton />
      </div>
    </div>
  </FancyBorder>
  );

Inputs.propTypes = {
  handleChange: PropTypes.func,
  userQuery: PropTypes.object,
};

export default Inputs;