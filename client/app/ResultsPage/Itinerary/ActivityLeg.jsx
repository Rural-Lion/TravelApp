import React, { PropTypes, Component } from 'react';
import { FancyBorder } from '../../helpers';
import Steps from './Steps.jsx';

class ActivityLeg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSteps: false,
      activity: {},
    };
    this.toggleSteps = this.toggleSteps.bind(this);
  }


  componentWillMount() {
    this.setState({
      activity: this.props.activity,
      type: this.props.activity.type,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('activityleg will receive props');
    this.setState({
      activity: nextProps.activity,
    });
  }


  setTimeInput(name, time) {
    const tempActivity = {};
    Object.assign(tempActivity, this.state.activity);
    tempActivity.duration = time;
    this.setState({
      activity: tempActivity,
    }, () => { this.props.addTimeToWaypoint(name, time); });
  }

  toggleSteps() {
    this.setState({
      showSteps: !this.state.showSteps,
    });
  }

  render() {
    const convertCurrentTime = time => `${Math.floor(time / 3600)}:${Math.floor((time % 3600) / 60)}`;

    const durationText = convertCurrentTime(this.state.activity.duration);
    const createCostText = () => (`-$${Math.floor(this.state.activity.cost.drivingCost)}`);
    const costText = createCostText();


    return (
      <div className="legRow" >
        <div className="row">
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 cost">
            {(this.state.type === 'drive') ? costText : null}
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

            <FancyBorder color="yellow">
              {(this.state.type === 'drive') ?
                <div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="row">
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 stepMarker start" />
                        <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">{`start ${this.props.activity.time.startTime[0]}:${this.props.activity.time.startTime[1]}`}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="row">
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 stepMarker duration" />
                        <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">{`duration ${durationText}`}{this.state.activity.start_address ? <button className="toggleStepButton" onClick={() => this.toggleSteps()}>Show Steps</button> : null}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="row">
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 stepMarker end" />
                        <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">{`end ${this.props.activity.time.endTime[0]}:${this.props.activity.time.endTime[1]}`}</div>
                      </div>
                    </div>
                  </div>
                </div> :
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                      <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 stepMarker adventure" />
                      <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">adventure <input className="legHourInput" onChange={(e) => { this.setTimeInput(this.props.activity.name, (+e.target.value * 3600)); }} value={Math.floor(this.state.activity.duration / 3600)} /></div>
                    </div>
                  </div>
                </div> }
            </FancyBorder>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4  hoursLeftContainer text-center">
            <FancyBorder color="yellow">
              <div className="hoursLeftText">
                {(Math.floor(this.props.activity.time.remainingTime / 3600) < 0) ? "you're out of time" : `${Math.floor(this.props.activity.time.remainingTime / 3600)} hours left`}
              </div>
            </FancyBorder>

          </div>
          {this.state.showSteps ? <Steps steps={this.state.activity.legs} /> : null}
        </div>
      </div>
    );
  }

}

ActivityLeg.propTypes = {
  activity: PropTypes.object,
  addTimeToWaypoint: PropTypes.func,
};

export default ActivityLeg;
