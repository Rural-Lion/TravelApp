import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';

const favicons = {
  Hiking: require('../../../public/images/hiking.png'),
  Biking: require('../../../public/images/biking.png'),
  Camping: require('../../../public/images/camping.png'),
  Fishing: require('../../../public/images/fishing.png'),
  'Historic & Cultural Site': require('../../../public/images/sites.png'),
  Boating: require('../../../public/images/boating.png'),
  Picnicking: require('../../../public/images/picnic.png'),
  'Recreational Vehicles': require('../../../public/images/vehicles.png'),
  'Off Highway Vehicle': require('../../../public/images/offhighway.png'),
  'Water Sports': require('../../../public/images/watersports.png'),
  'Wildlife Viewing': require('../../../public/images/wildlife.png'),
  'Other Recreation Concession Site': require('../../../public/images/recreation.png'),
  'Visitor Center': require('../../../public/images/visitor.png'),
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
