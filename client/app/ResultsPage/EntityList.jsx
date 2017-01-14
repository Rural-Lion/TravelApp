import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers';
import EntityListEntry from './EntityListEntry.jsx';

// renders activities from given array
  // currently gets array of activities from US API
const EntityList = (props) => {
  const entities = props.entities;
  const entityList = entities.map((entity, index) =>
    <EntityListEntry
      entity={entity}
      index={index}
      key={index}
      handleEntityClick={props.handleEntityClick}
      handleAddToItineraryClick={props.handleAddToItineraryClick}
    />);

  return (
    <FancyBorder color="green">
      <div className="EntityListContainer">
        <div className="EntityList">
          <FancyBorder color="blue">
            {entityList}
          </FancyBorder>
        </div>
      </div>
    </FancyBorder>
  );
};

EntityList.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.object),
  handleEntityClick: PropTypes.func,
  handleAddToItineraryClick: PropTypes.func,
};

export default EntityList;
