import React, { PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import InterestButton from './InterestButton.jsx';

const InterestButtons = (props) => {
  const buttons = props.interests.map((interest, index) =>
    (<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" key={index}>
      <InterestButton
        interest={{ interest, index }}
        handleInterestButtonClick={props.handleInterestButtonClick}
      /></div>),
    );
  return (
    <FancyBorder color="green">
      {buttons}
    </FancyBorder>
  );
};

InterestButtons.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.array),
  handleInterestButtonClick: PropTypes.func,
};

export default InterestButtons;
