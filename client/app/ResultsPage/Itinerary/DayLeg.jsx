import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import ActivityLegs from './ActivityLegs.jsx';

const DayLeg = props => (
  <div className="itineraryEntry" >
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <FancyBorder color="orange">
          <div className="text-center day-text"><h4>{`Day ${props.day}`}</h4></div>
        </FancyBorder>
      </div>
    </div>
    <ActivityLegs activities={props.leg} addTimeToWaypoint={props.addTimeToWaypoint} />
  </div>
  );

DayLeg.propTypes = {
  leg: PropTypes.object,
  day: PropTypes.number,
};

export default DayLeg;
