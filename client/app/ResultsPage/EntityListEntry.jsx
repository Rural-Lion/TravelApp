import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';

const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const EntityListEntry = props => (
  <FancyBorder color="green">
    <div className="row EntityListEntry" onClick={e => props.handleEntityClick(e, props.entity)}>
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <FancyBorder color="blue"><div className="text-center">{labels[props.index]}</div></FancyBorder>
      </div>
      <div
        className="col-xs-3 col-sm-3 col-md-3 col-lg-3"
        onClick={props.handleAddToItineraryClick} data-latlng={props.entity.coordinates}
      >
        <FancyBorder color="blue"><div className="text-center">Add to itinerary</div></FancyBorder>
      </div>
      <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
        <div className="row">
          <FancyBorder color="blue"><div>{props.entity.name}</div></FancyBorder>
        </div>
        <div className="row">
          <FancyBorder color="blue"><div>{props.entity.activities.join(', ').toLowerCase()}</div></FancyBorder>
        </div>
      </div>
    </div>
  </FancyBorder>
  );

EntityListEntry.propTypes = {
  entity: PropTypes.object,
  index: PropTypes.number,
  handleEntityClick: PropTypes.func,
  handleAddToItineraryClick: PropTypes.func,
};

export default EntityListEntry;
