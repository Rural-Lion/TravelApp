import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import DayLeg from './DayLeg.jsx';

const DayLegs = props =>
  // dayLegs = props.directions.map((leg) => {
  //   <DayLeg directions={props.directions} />;
  // });
   (
     <FancyBorder color="green">
      <div className="itineraryContainer" >
        <FancyBorder color="blue">
          <div className="itinerary container-fluid" >
            <FancyBorder color="purple">
                    <div className="container-fluid">
                      <div className="itineraryEntry container-fluid row" />
                    </div>
                  </FancyBorder>


          </div>
        </FancyBorder>
      </div>
    </FancyBorder>
  );

DayLegs.propTypes = {
  directions: PropTypes.arrayOf(PropTypes.object),
};

export default DayLegs;
