import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';

const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const EntityListEntry = props => (
  <FancyBorder color="green">
    <div className="row EntityListEntry" onClick={e => props.handleEntityClick(e, props.entity)}>
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <FancyBorder color="blue"><div className="text-center"><strong>{labels[props.index]}</strong></div></FancyBorder>
        <FancyBorder color="blue">
          <div>
            <img className='mapImage center-block' src={require("../../public/images/Map.png")} onClick={e => props.handleAddToItineraryClick(e, props.entity)}/>
          </div>
        </FancyBorder>
      </div>
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <div className='title'>{props.entity.name}</div>
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
