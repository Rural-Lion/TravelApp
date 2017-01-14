// LandingPage
    // InputsContainer
      // Inputs
    // PlanVacationButton
    // InterestButtonsContainer
      // InterestButtons
        // interestButton

import React from 'react';
import { FancyBorder } from '../helpers.js';
import InputsContainer from './InputsContainer.jsx';
import PlanVacationButton from './PlanVacationButton.jsx';
import InterestsContainer from './InterestsContainer.jsx';

const LandingPage = () => (
  <div className="landingPage container-fluid">
    <FancyBorder className="landingPage container-fluid" color="orange">
      <div className="landingPageContainer">
        <div className="landingPageContent">
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered text-center landing-page-title">
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
              <div className="text-center landing-page-interest-title">
                <h3>What is your plan?</h3>
              </div>
            </FancyBorder>
          </div>
          <div className="row">
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-centered">
              <div className="row">
                <InterestsContainer />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-centered">
              <PlanVacationButton />
            </div>
          </div>
        </div>
      </div>
    </FancyBorder>
  </div>
  );

export default LandingPage;
