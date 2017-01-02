import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers';
import EntityListEntry from './EntityListEntry.jsx';

// renders activities from given array
  // currently gets array of activities from US API
const EntityList = (props) => {
  const entities = props.entities;
  const entityList = entities.map((activity, index) =>
    <EntityListEntry activity={activity} index={index} key={index} />);

  return (
    <div>
      <div className="row">
        <h1 className="text-center">Results List</h1>
      </div>
      <div className="row EntityListContainer">
        <div className="EntityList">
          <FancyBorder color="yellow">
            {entityList}
          </FancyBorder>
        </div>
      </div>
    </div>

  );
};

EntityList.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.object),
};

export default EntityList;
