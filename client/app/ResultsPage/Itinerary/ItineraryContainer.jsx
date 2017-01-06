import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../../helpers';

class ItineraryContainer extends Component {
  render() {
    return (
      <FancyBorder color="yellow">
        <div >
          <FancyBorder color="green">
            <h1 className="text-center">Itinerary</h1>
          </FancyBorder>
          <FancyBorder color="green">
            <div className="itineraryContainer" >
              <FancyBorder color="blue">
                <div className="itinerary container-fluid" >
                  <FancyBorder color="purple">
                    <div className="container-fluid">
                      <div className="itineraryEntry container-fluid row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                          <FancyBorder color="orange">
                            <div className="text-center">day 1</div>
                          </FancyBorder>
                        </div>
                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" >
                          <FancyBorder color="orange">
                            <div className="row">
                              <div className="container-fluid">
                                <div className="row legRow">
                                  <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                    <FancyBorder color="yellow">
                                   leg
                                </FancyBorder>
                                  </div>
                                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                    <FancyBorder color="yellow">
                                  time
                                </FancyBorder>
                                  </div>
                                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                    <FancyBorder color="yellow">
                                  cost
                                </FancyBorder>
                                  </div>
                                </div>
                                <div className="row childLegRow">
                                  <div className=" col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1 col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                    <FancyBorder color="yellow">
                                  leg
                                </FancyBorder>
                                  </div>
                                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                    <FancyBorder color="yellow">
                                  time
                                </FancyBorder>
                                  </div>
                                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                    <FancyBorder color="yellow">
                                  distance
                                </FancyBorder>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </FancyBorder>
                        </div>

                      </div>
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
