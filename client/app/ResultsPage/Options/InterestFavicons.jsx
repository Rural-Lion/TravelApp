import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';
import InterestFavicon from './InterestFavicon.jsx';

const InterestFavicons = (props) => {
  const buttons = props.interests.map((interest, index) =>
    (<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" key={index}>
      <InterestFavicon
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

InterestFavicons.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.array),
  handleInterestButtonClick: PropTypes.func,
};

export default InterestFavicons;
