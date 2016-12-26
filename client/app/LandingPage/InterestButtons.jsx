import React, { Component, PropTypes } from 'react';
import {FancyBorder} from '../helpers.js';
import InterestButton from './InterestButton.jsx';

const InterestButtons = (props) => {
  const interests = props.interests;
  // generates buttons based off of INTERESTS array. currently hard coded
  const buttons = interests.map((interest, index) =>
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
      <InterestButton
        interest={interest}
        key={index}
        handleInterestButtonClick={props.handleInterestButtonClick}
      /></div>);

  return (
    // renders buttons
    <FancyBorder color="green">
      {buttons}
    </FancyBorder>
  );
};

InterestButtons.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.string),
  handleInterestButtonClick: PropTypes.func,
};

export default InterestButtons;