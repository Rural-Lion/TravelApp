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
    <div>
      <FancyBorder color="green">
        <div>
          <h1 className="text-center">Results List</h1>
        </div>
      </FancyBorder>
      <FancyBorder color="green">
        <div className="row EntityListContainer">
          <div className="EntityList">
            <FancyBorder color="blue">
              {entityList}
            </FancyBorder>
          </div>
        </div>
      </FancyBorder>
    </div>

  );
};

EntityList.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.object),
  handleEntityClick: PropTypes.func,
  handleAddToItineraryClick: PropTypes.func,
};

export default EntityList;
