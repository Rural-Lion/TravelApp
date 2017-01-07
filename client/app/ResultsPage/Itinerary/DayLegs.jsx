import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import DayLeg from './DayLeg.jsx';

const DayLegs = (props) => {
  const dayLegs = props.itinerary.map((leg, index) => <DayLeg leg={leg} key={index} day={index + 1} />);
  return (
    <FancyBorder color="green">
      <div className="itineraryContainer" >
        <FancyBorder color="blue">
          <div className="itinerary container-fluid" >
            <FancyBorder color="purple">
              <div className="container-fluid">
                {dayLegs}
              </div>
            </FancyBorder>
          </div>
        </FancyBorder>
      </div>
    </FancyBorder>
  );
};

DayLegs.propTypes = {
  itinerary: PropTypes.arrayOf(PropTypes.object),
};

export default DayLegs;
