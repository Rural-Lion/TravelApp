import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';

const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const EntityListEntry = props => (
  <FancyBorder color="green">
    <div className="row EntityListEntry" onClick={e => props.handleEntityClick(e, props.entity)}>
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <FancyBorder color="blue"><div className="text-center">{labels[props.index]}</div></FancyBorder>
      </div>
      <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
        <div className="row">
          <FancyBorder color="blue"><div>{props.entity.name}</div></FancyBorder>
        </div>
        <div className="row">
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <FancyBorder color="blue"><div>{props.entity.phoneNumber}</div></FancyBorder>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <FancyBorder color="blue"><div>{props.entity.address}</div></FancyBorder>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <FancyBorder color="blue">
              <a href={props.entity.website} >{props.entity.website}</a>
            </FancyBorder>
          </div>
        </div>
      </div>
    </div>
  </FancyBorder>
  );

EntityListEntry.propTypes = {
  entity: PropTypes.object,
  index: PropTypes.number,
  handleEntityClick: PropTypes.func,
};

export default EntityListEntry;
