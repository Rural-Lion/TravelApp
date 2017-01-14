import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import DayLeg from './DayLeg.jsx';

const DayLegs = (props) => {
  const dayLegs = props.itinerary.days.map((leg, index) => <DayLeg leg={leg} key={index} day={index + 1} addTimeToWaypoint={props.addTimeToWaypoint} />);
  return (
    <div className="container-fluid" >
          {dayLegs}
        </div>
  );
};

DayLegs.propTypes = {
  itinerary: PropTypes.object,
};

export default DayLegs;
