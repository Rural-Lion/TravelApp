import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';


const InterestFavicon = props => (
  <FancyBorder color="blue">
    <button
      value={props.interest.index}
      className={`centered ${(props.interest.interest[1]) ? 'includedInterestButton' : 'interestButton'}`}
      onClick={() => { props.handleInterestButtonClick(props.interest.index); }}
    >{props.interest.interest}</button>
  </FancyBorder>
  );

InterestFavicon.propTypes = {
  interest: PropTypes.object,
  handleInterestButtonClick: PropTypes.func,
};

export default InterestFavicon;
