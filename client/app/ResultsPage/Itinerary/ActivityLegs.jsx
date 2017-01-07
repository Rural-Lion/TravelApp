import React, { PropTypes } from 'react';
import { FancyBorder } from '../../helpers';
import ActivityLeg from './ActivityLeg.jsx';

const ActivityLegs = (props) => {
  const activities = props.activities.map((activity, index) => <ActivityLeg activity={activity} key={index} order={index} />);

  return (
    <FancyBorder color="orange">
      <div className="row">
        {activities}
      </div>
    </FancyBorder>
  );
};


ActivityLegs.propTypes = {
  activities: PropTypes.array,
};

export default ActivityLegs;
