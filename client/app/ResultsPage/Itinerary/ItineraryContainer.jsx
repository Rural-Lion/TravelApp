import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import DayLegs from './DayLegs.jsx';

class ItineraryContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FancyBorder color="yellow">
        <div >
          <FancyBorder color="green">
            <h1 className="text-center">Itinerary</h1>
          </FancyBorder>
          <DayLegs itinerary={this.props.itinerary} />
        </div>
      </FancyBorder>
    );
  }
}

ItineraryContainer.propTypes = {
  itinerary: PropTypes.arrayOf(PropTypes.object),
};

export default ItineraryContainer;
