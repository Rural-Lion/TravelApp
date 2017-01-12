import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';

const favicons = {
  Hiking: require('../../../public/images/hiking.png'),
  Biking: require('../../../public/images/biking.png'),
  Camping: require('../../../public/images/camping.png'),
  'Water Sports': require('../../../public/images/fishing.png'),
  'Cultural Activities': require('../../../public/images/sites.png'),
  Fishing: require('../../../public/images/fishing.png'),
  'Motor Sports': require('../../../public/images/motorsports.png'),
  'Equestrian': require('../../../public/images/horsebackriding.png'),
  'Photography': require('../../../public/images/photography.png'),
  'Winter Sports': require('../../../public/images/winter.png'),
  'Climbing': require('../../../public/images/climbing.png'),
  'Wildlife Viewing': require('../../../public/images/wildlife.png'),
};

const InterestFavicon = props => (
  <FancyBorder color="blue">
    <img
      src={favicons[props.interest.interest[0]]}
      value={props.interest.index}
      className={`${(props.interest.interest[1]) ? 'includedInterestFavicon' : 'interestFavicon'} optionsFavicon`}
      onClick={() => { props.handleInterestButtonClick(props.interest.index); }}
    />
  </FancyBorder>
  );

InterestFavicon.propTypes = {
  interest: PropTypes.object,
  handleInterestButtonClick: PropTypes.func,
};

export default InterestFavicon;
