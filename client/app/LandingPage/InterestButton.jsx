import React, { PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';


const InterestButton = props => (
  <FancyBorder color="blue">
    <button
      value={props.interest.index}
      className={`centered ${(props.interest.interest[1]) ? 'includedInterestButton' : 'interestButton'}`}
      onClick={() => { props.handleInterestButtonClick(props.interest.index); }}
    >{props.interest.interest[0]}</button>
  </FancyBorder>
  );

InterestButton.propTypes = {
  interest: PropTypes.object,
  handleInterestButtonClick: PropTypes.func,
};

export default InterestButton;
