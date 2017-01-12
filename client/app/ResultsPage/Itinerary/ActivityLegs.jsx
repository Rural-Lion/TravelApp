import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import ActivityLeg from './ActivityLeg.jsx';

const ActivityLegs = (props) => {
  const activities = props.activities.legs.map((activity, index) => <ActivityLeg addTimeToWaypoint={props.addTimeToWaypoint} activity={activity} key={index} order={index} />);

  return (
    <FancyBorder color="orange">
      <div className="row">
        {activities}
      </div>
    </FancyBorder>
  );
};


ActivityLegs.propTypes = {
  activities: PropTypes.object,
};

export default ActivityLegs;
