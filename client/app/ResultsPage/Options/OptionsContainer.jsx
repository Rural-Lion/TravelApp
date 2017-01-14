import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import InterestsContainer from './InterestsContainer.jsx';
import InputsContainer from './InputsContainer.jsx';

const OptionsContainer = (props) => (
  <div >
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered optionsTitle">
      <h1 className="activitiesTitle">Activities</h1>
    </div>
    <div >
      <InterestsContainer />
    </div>
    <div >
      <InputsContainer 
        setPreferences={props.setPreferences}
        startingTime={props.startingTime}
        endingTime={props.endingTime}
        foodCostPerDay={props.foodCostPerDay}
        nightlyCost={props.nightlyCost}
      />
    </div>
  </div>
);


OptionsContainer.propTypes = {

};

export default OptionsContainer;
