import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';

const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const EntityListEntry = props => (
  <FancyBorder color="green">
    <div className="row EntityListEntry" >
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <FancyBorder color="blue"><div className="text-center">{labels[props.index]}</div></FancyBorder>
        <FancyBorder color="blue">
          <div>
            <button className="btn-primary" onClick={e => props.handleEntityClick(e, props.entity)}>Read more</button>
            <button className="btn-primary" onClick={e => props.handleAddToItineraryClick(e, props.entity)}>Directions</button>
          </div>
        </FancyBorder>
      </div>
      <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
        <div className="row">
          <FancyBorder color="blue"><div>{props.entity.name}</div></FancyBorder>
        </div>
        <div className="row">
          <FancyBorder color="blue"><div>{props.entity.email}</div></FancyBorder>
        </div>
        <div className="image">
          <img src={props.entity.image}/>
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
