// LandingPage
    // Inputs
    // PlanVacationButton
    // InterestButtons
      // interestButton
import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { FancyBorder } from '../helpers.js';
import InputsContainer from './InputsContainer.jsx';
import PlanVacationButton from './PlanVacationButton.jsx';
import InterestButtons from './InterestButtons.jsx';

const LandingPage = props => (
  <div className="landingPage container-fluid">
      <FancyBorder className="landingPage container-fluid" color="orange">
        <div className="landingPageContainer">
          <div className="landingPageContent">
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered text-center">
                <FancyBorder color="yellow"><h1>TravelApp</h1></FancyBorder>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-centered">
                <div className="row">
                  <InputsContainer className="inputs" />
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
                    userInterests={props.userInterests}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered">
                <PlanVacationButton handlePlanButtonClick={props.handlePlanButtonClick} />
              </div>
            </div>
          </div>
        </div>
      </FancyBorder>
    </div>
  );

LandingPage.propTypes = {
  userInterests: PropTypes.array,
  interests: PropTypes.arrayOf(PropTypes.string),
  handleInterestButtonClick: PropTypes.func,
  handlePlanButtonClick: PropTypes.func,
  userQuery: PropTypes.object,
};

export default LandingPage;
