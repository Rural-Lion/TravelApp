import React, { PropTypes } from 'react';
import Step from './Step.jsx';

const Steps = (props) => {
  const steps = props.steps.map((step, index) => <Step step={step} key={index} order={index} />);

  return (
    <div>
      {steps}
    </div>
  );
};

Steps.propTypes = {
  steps: PropTypes.array,
};

export default Steps;
