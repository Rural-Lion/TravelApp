import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import { Link } from 'react-router';
import { ProgressBar } from 'react-bootstrap';

const NavBar = (props) => {
  const timePercent = () => (100 - ((props.usedTime / props.totalTime) * 100));
  const budgetPercent = () => (100 - ((props.usedBudget / props.totalBudget) * 100));

  return (
    <FancyBorder color="yellow">
      <div className="container-fluid navBar" >

        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 progressBars">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <span className="glyphicons glyphicons-money progressBarGlyphicon" />
            <ProgressBar active bsStyle={(timePercent() < 0) ? 'danger' : 'warning'} now={timePercent()} label={`${Math.ceil(props.remainingTime / 3600)} hrs left`} />
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <ProgressBar active bsStyle={(budgetPercent() < 0) ? 'danger' : 'success'} now={budgetPercent()} label={`$${Math.floor(props.totalBudget - props.usedBudget)} left`} />
          </div>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 tabButtons">

          <div className="row">

            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 container-fluid">
              <button type="button" onClick={() => props.selectTab('EntityList')} className="btn btn-primary">PLAN</button>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 container-fluid">
              <button type="button" onClick={() => props.selectTab('ItineraryContainer')} className="btn btn-primary">ITINERARY</button>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 container-fluid">
              <button type="button" onClick={() => props.selectTab('OptionsContainer')} className="btn btn-primary">OPTIONS</button>
            </div>

          </div>


        </div>

      </div>
    </FancyBorder>
  );
};

NavBar.propTypes = {
  selectTab: PropTypes.func,
};

export default NavBar;
