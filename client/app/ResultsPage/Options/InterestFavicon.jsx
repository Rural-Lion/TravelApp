import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers.js';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const favicons = {
  Hiking: require('../../../public/images/hiking.png'),
  Biking: require('../../../public/images/biking.png'),
  Camping: require('../../../public/images/camping.png'),
  'Water Sports': require('../../../public/images/watersports.png'),
  'Cultural Sites': require('../../../public/images/sites.png'),
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
    <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip"><strong>{props.interest.interest[0]}</strong> Check this info.</Tooltip>}>
      <img
        src={favicons[props.interest.interest[0]]}
        value={props.interest.index}
        className={`${(props.interest.interest[1]) ? 'includedInterestFavicon' : 'interestFavicon'} optionsFavicon`}
        onClick={() => { props.handleInterestButtonClick(props.interest.index); }}
      />
    </OverlayTrigger>
  </FancyBorder>
  );

InterestFavicon.propTypes = {
  interest: PropTypes.object,
  handleInterestButtonClick: PropTypes.func,
};

export default InterestFavicon;
