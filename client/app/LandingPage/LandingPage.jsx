// LandingPage
    // Inputs
    // PlanVacationButton
    // InterestButtons
      // interestButton
import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { FancyBorder } from '../helpers.js';
import Inputs from './Inputs.jsx';
import PlanVacationButton from './PlanVacationButton.jsx';
import InterestButtons from './InterestButtons.jsx';

const LandingPage = function (props) {
  return (
    <div className="landingPage">
      <FancyBorder color="orange">
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered text-center">
            <FancyBorder color="yellow"><h1>TravelApp</h1></FancyBorder>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-centered">
            <div className="row">
              <Inputs handleChange={props.handleChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <FancyBorder color="yellow">
            <div className="text-center">
              <h5 >Choose at least 2 interests</h5>
            </div>
          </FancyBorder>
        </div>
        <div className="row">
          <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-centered">
            <div className="row">
              <InterestButtons
                interests={props.interests}
                handleInterestButtonClick={props.handleInterestButtonClick}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered">
            <PlanVacationButton handlePlanButtonClick={props.handlePlanButtonClick} />
          </div>
        </div>
      </FancyBorder>
    </div>
  );
};

LandingPage.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.string),
  handleInterestButtonClick: PropTypes.func,
  handleChange: PropTypes.func,
  handlePlanButtonClick: PropTypes.func,
};

export default LandingPage;
