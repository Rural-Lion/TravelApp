import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';


const InterestButton = props => (
  <FancyBorder color="blue">
    <button
      className={`centered btn-default ${(props.userInterests.indexOf(props.interest) !== -1) ? 'includedInterestButton' : 'interestButton'}`}
      onClick={(e) => { props.handleInterestButtonClick(e); }}
    >{props.interest}</button>
  </FancyBorder>
  );

InterestButton.propTypes = {
  userInterests: PropTypes.array,
  interest: PropTypes.string,
  handleInterestButtonClick: PropTypes.func,
};

export default InterestButton;
