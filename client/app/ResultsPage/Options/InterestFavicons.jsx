import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';
import InterestFavicon from './InterestFavicon.jsx';

const InterestFavicons = (props) => {
  const buttons = props.interests.map((interest, index) =>
    (<div className="col-xs-6 col-sm-4 col-md-3 col-lg-2 icons" key={index}>
      <InterestFavicon
        interest={{ interest, index }}
        handleInterestButtonClick={props.handleInterestButtonClick}
      /></div>),
    );
  return (
    <div>
      {buttons}
    </div>
  );
};

InterestFavicons.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.array),
  handleInterestButtonClick: PropTypes.func,
};

export default InterestFavicons;
