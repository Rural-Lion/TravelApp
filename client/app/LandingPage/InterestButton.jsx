import React, { Component, PropTypes } from 'react';
import {FancyBorder} from '../helpers.js';


const InterestButton = props => (
  <FancyBorder color="blue" class="interestButton">
    <button
      className="centered"
      onClick={(e) => { props.handleInterestButtonClick(e); }}
    >{props.interest}</button>
  </FancyBorder>
  );

InterestButton.propTypes = {
  interest: PropTypes.string,
  handleInterestButtonClick: PropTypes.func,
};

export default InterestButton;
