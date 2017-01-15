import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import { ProgressBar, Glyphicon } from 'react-bootstrap';

const ProgressBars = (props) => {
  const timePercent = () => (100 - ((props.usedTime / props.totalTime) * 100));
  const budgetPercent = () => (100 - ((props.usedBudget / props.totalBudget) * 100));

  return (
    <FancyBorder color="yellow">
      <div className="container-fluid" >
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 progress-bars">
            <div className="row">
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-progress-glyph">
                <Glyphicon glyph="time" />
              </div>
              <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-progress-bar">
                <ProgressBar
                  active bsStyle={(timePercent() < 0) ? 'danger' : 'success'}
                  now={timePercent()} label={`${Math.ceil((props.totalTime - props.usedTime) / 3600)} hrs left`}
                />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 progress-bars">
            <div className="row">
              <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-progress-glyph">
                <Glyphicon glyph="usd" />
              </div>
              <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-progress-bar">
                <ProgressBar
                  active bsStyle={(budgetPercent() < 0) ? 'danger' : 'warning'}
                  now={budgetPercent()} label={`$${Math.floor(props.totalBudget - props.usedBudget)} left`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FancyBorder>
  );
};

ProgressBars.propTypes = {
  selectTab: PropTypes.func,
};

export default ProgressBars;
