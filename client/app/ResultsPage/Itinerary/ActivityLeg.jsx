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
          <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <div className="row">
              <FancyBorder color="yellow">
                {`to ${this.props.activity.end_address}`}
              </FancyBorder>
            </div>
            <div className="row text-center">
              <FancyBorder color="yellow">
                {`Duration: ${this.props.activity.duration[0]}:${this.props.activity.duration[1]} - Ending Time: ${this.props.activity.currentTime.getHours()}:${this.props.activity.currentTime.getMinutes()}`}
              </FancyBorder>
            </div>
          </div>
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
            <FancyBorder color="yellow">
              {(Math.floor(this.props.activity.remainingTime / 3600) < 0) ? "you're out of time" : `${Math.floor(this.props.activity.remainingTime / 3600)} hours left`}
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
