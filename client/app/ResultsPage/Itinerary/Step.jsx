import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';

const Step = props => (
  <div className="childLegRow">
    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
      <FancyBorder color="yellow">
        {props.step.duration}
      </FancyBorder>
    </div>
    <div className=" col-xs-9 col-sm-9 col-md-9 col-lg-9">
      <FancyBorder color="yellow">
        <div dangerouslySetInnerHTML={{ __html: props.step.instructions }} />
      </FancyBorder>
    </div>
    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
      <FancyBorder color="yellow">
        {props.step.distance}
      </FancyBorder>
    </div>
  </div>
  );


Step.propTypes = {
  step: PropTypes.object,
};

export default Step;
