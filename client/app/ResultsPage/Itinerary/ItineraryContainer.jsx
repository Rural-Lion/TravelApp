import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers';

class ItineraryContainer extends Component {
  render() {
    return (
      <FancyBorder color="yellow">
        <div >
          <FancyBorder color="green">
            <h1 className="text-center">asdf</h1>
          </FancyBorder>
          <FancyBorder color="green">
            <div className="itineraryContainer" >
              <FancyBorder color="blue">
                <div className="itinerary" >
                  <FancyBorder color="purple">
                    <div className="itineraryEntry">
                      <div>day 1</div>
                    </div>
                  </FancyBorder>
                </div>
              </FancyBorder>
            </div>
          </FancyBorder>
        </div>
      </FancyBorder>
    );
  }
}

ItineraryContainer.propTypes = {

};

export default ItineraryContainer;
