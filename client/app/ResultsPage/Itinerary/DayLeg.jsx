import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import ActivityLegs from './ActivityLegs.jsx';

const DayLeg = props => (
  <div className="itineraryEntry" >
    <div className="row">
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <FancyBorder color="orange">
          <div className="text-center">{`Day ${props.day}`}</div>
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
