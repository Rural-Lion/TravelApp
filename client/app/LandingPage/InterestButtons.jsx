import React, { PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import InterestButton from './InterestButton.jsx';

const InterestButtons = (props) => {
  const buttons = props.interests.map((interest, index) =>
    (<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" key={index}>
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
