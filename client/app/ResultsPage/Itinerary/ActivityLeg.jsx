import React, { PropTypes, Component } from 'react';
import { FancyBorder } from '../../helpers';
import Steps from './Steps.jsx';
import GreenCar from '../../../public/images/greencar.png';
import RedCar from '../../../public/images/redcar.png';
import BlueMarker from '../../../public/images/bluemarker.png';


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
      name: this.props.activity.name || 'Home',
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
      <div >
        <div className="row">
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 cost">
            {(this.state.type === 'drive') ? costText : null}
          </div>
          <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <FancyBorder color="yellow">
              {(this.state.type === 'drive') ?
                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-12 legRow">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="row">
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 stepMarker">
                          <img className="itinerary-icon" src={GreenCar} />
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 legText startText">{`Start Drive to ${this.state.name} ${this.props.activity.time.startTime[0]}:${this.props.activity.time.startTime[1]}`}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="row">
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 stepMarker duration" />
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 legText endText">
                          <div className="row">
                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 durationText">{`Duration ${durationText}`}</div>
                            <div>{this.state.activity.start_address ? <button className=" glyphicon glyphicon-triangle-bottom toggleStepButton" onClick={() => this.toggleSteps()} /> : null}</div>
                          </div>
                          {this.state.showSteps ? <Steps steps={this.state.activity.legs} /> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 stepMarker">
                          <img className="itinerary-icon" src={RedCar} />
                        </div>
                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 legText durationText">{`End Drive to ${this.state.name} ${this.props.activity.time.endTime[0]}:${this.props.activity.time.endTime[1]}`}</div>
                      </div>
                    </div>
                  </div>
                </div> :
                <div className="row legRow stay-row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                      <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 stepMarker">
                        <img className="itinerary-icon" src={BlueMarker} />
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 legText">{`Stay at ${this.state.name}`} <input className="legHourInput" onChange={(e) => { this.setTimeInput(this.props.activity.name, (+e.target.value * 3600)); }} value={Math.floor(this.state.activity.duration / 3600)} /> hours </div>
                    </div>
                  </div>
                </div> }
            </FancyBorder>
          </div>
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
