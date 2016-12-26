import React, { Component, PropTypes } from 'react';
import {FancyBorder} from '../helpers.js';


const PlanVacationButton = props => (
  <FancyBorder color="yellow">
    <button
      className="centered"
      onClick={() => props.handlePlanButtonClick()}
    >
    Plan My Vacation
    </button>
  </FancyBorder>

);

PlanVacationButton.propTypes = {
  handlePlanButtonClick: PropTypes.func,
};

export default PlanVacationButton;