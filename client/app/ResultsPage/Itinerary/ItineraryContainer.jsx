import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import DayLegs from './DayLegs.jsx';

const ItineraryContainer = props => (
  <div ref={(node) => {props.setItineraryDom(node)}}>
    <FancyBorder color="yellow">
      <DayLegs itinerary={props.itinerary} addTimeToWaypoint={props.addTimeToWaypoint} />
    </FancyBorder>
  </div>
  );

ItineraryContainer.propTypes = {
  itinerary: PropTypes.object,
};

export default ItineraryContainer;
