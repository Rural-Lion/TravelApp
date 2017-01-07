import React, { PropTypes, Component } from 'react';
import { FancyBorder } from '../../helpers';
import Steps from './Steps.jsx';

class ActivityLeg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSteps: false,
    };
    this.toggleSteps = this.toggleSteps.bind(this);
  }

  toggleSteps() {
    this.setState({
      showSteps: !this.state.showSteps,
    });
  }

  render() {
    let steps;
    if (this.state.showSteps) {
      steps = <Steps steps={this.props.activity.legs} />;
    } else {
      steps = <div />;
    }
    return (
      <div className="container-fluid">
        <div className="row legRow" onClick={() => this.toggleSteps()}>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <FancyBorder color="yellow">
              {`${this.props.activity.start_address} to ${this.props.activity.end_address}`}
            </FancyBorder>
          </div>
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <FancyBorder color="yellow">
              {`${this.props.activity.duration[0]}:${this.props.activity.duration[1]}`}
            </FancyBorder>
          </div>
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <FancyBorder color="yellow">
              {this.props.activity.distance}
            </FancyBorder>
          </div>
        </div>
        {steps}
      </div>
    );
  }

}

ActivityLeg.propTypes = {
  activity: PropTypes.object,
};

export default ActivityLeg;
