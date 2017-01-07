import React, { PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import EntityTrailsMap from './EntityTrailsMap.jsx';

const TrailsContainer = (props) => {
  console.log('SELECTED ENTITY', props.entity);
  return (
    <FancyBorder color="yellow" >
      <div style={{ height: '55vh' }}>
        This is the trails container
        <EntityTrailsMap
          trails={props.entity.trails}
          center={props.entity.coordinates}
          entityID={props.entity.entityID}
        />
      </div>
    </FancyBorder>
  );
};


TrailsContainer.propTypes = {
  entity: PropTypes.object,
};

export default TrailsContainer;
