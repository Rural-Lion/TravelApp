import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';

const Step = props => (
  <div className="row childLegRow">
    <div className=" col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1 col-xs-7 col-sm-7 col-md-7 col-lg-7">
      <FancyBorder color="yellow">
        <div dangerouslySetInnerHTML={{ __html: props.step.instructions }} />
      </FancyBorder>
    </div>
    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
      <FancyBorder color="yellow">
        {props.step.duration}
      </FancyBorder>
    </div>
    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
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
