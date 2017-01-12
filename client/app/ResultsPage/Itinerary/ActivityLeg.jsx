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

    const convertCurrentTime = (time) => {
      var time = [Math.floor(time / 3600), Math.floor((time % 3600) / 60)];
      return time;
    };
    const duration = convertCurrentTime(this.props.activity.duration);
    return (
      <div className="container-fluid">
        <div className="row legRow" >
          <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <div className="row">
              <FancyBorder color="yellow">
                {`${(this.props.activity.start_address) ? 'Drive to' : 'Adventure at'} ${(this.props.activity.name) ? this.props.activity.name : 'Home'}`}
              </FancyBorder>

            </div>
            <div className="row text-center">
              <FancyBorder color="yellow">
                <span>
                  {`Start Time: ${this.props.activity.time.startTime[0]}:${this.props.activity.time.startTime[1]} - `}
                </span>
                {this.props.activity.start_address ? (`${duration[0]  }:${  duration[1]}`) : <input className="legHourInput" onChange={(e) => { this.props.addTimeToWaypoint(this.props.activity.name, (+e.target.value * 3600)); }} value={duration[0]} /> }
                <span>
                  {` - Ending Time: ${this.props.activity.time.endTime[0]}:${this.props.activity.time.endTime[1]}`}
                </span>
              </FancyBorder>
            </div>
          </div>
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
            <FancyBorder color="yellow">
              {(Math.floor(this.props.activity.time.remainingTime / 3600) < 0) ? "you're out of time" : `${Math.floor(this.props.activity.time.remainingTime / 3600)} hours left`}
            </FancyBorder>
            <button onClick={() => this.toggleSteps()}>...</button>
          </div>
        </div>
        {steps}
      </div>
    );
  }

}

ActivityLeg.propTypes = {
  activity: PropTypes.object,
  addTimeToWaypoint: PropTypes.func,
};

export default ActivityLeg;
