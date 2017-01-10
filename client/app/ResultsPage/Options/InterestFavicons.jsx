import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';
import InterestFavicon from './InterestFavicon.jsx';

const InterestFavicons = (props) => {
  const buttons = props.interests.map((interest, index) =>
    (<div className="col-xs-1 col-sm-1 col-md-1 col-lg-1" style={{width: "14%"}} key={index}>
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
