import React, { PropTypes } from 'react';
import Step from './Step.jsx';

const Steps = (props) => {
  const steps = props.steps.map((step, index) => <Step step={step} key={index} order={index} />);

  return (
    <div className="row directions">
      <div className="childLegRow">
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        Mins
    </div>
        <div className=" col-xs-7 col-sm-7 col-md-7 col-lg-7">
      Directions
    </div>
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
      Km
    </div>
      </div>
      {steps}
    </div>
  );
};

Steps.propTypes = {
  steps: PropTypes.array,
};

export default Steps;
