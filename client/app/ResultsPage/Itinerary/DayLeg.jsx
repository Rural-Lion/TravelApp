import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import ActivityLegs from './ActivityLegs.jsx';

const DayLeg = props => (

  <div className="itineraryEntry container-fluid row" >
    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
      <FancyBorder color="orange">
        <div className="text-center">{`Day ${props.day}`}</div>
      </FancyBorder>
    </div>
    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" >
      <ActivityLegs activities={props.leg} />
    </div>
  </div>

  );

DayLeg.propTypes = {
  leg: PropTypes.object,
  day: PropTypes.number,
};

export default DayLeg;
