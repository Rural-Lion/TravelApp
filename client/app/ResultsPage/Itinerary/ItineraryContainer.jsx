import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import DayLegs from './DayLegs.jsx';

const ItineraryContainer = props => (
  <FancyBorder color="yellow">
    <DayLegs itinerary={props.itinerary} />
  </FancyBorder>
  );

ItineraryContainer.propTypes = {
  itinerary: PropTypes.arrayOf(PropTypes.object),
};

export default ItineraryContainer;
