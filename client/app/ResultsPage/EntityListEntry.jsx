import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import { ProgressBar, Button } from 'react-bootstrap';
import InfoMarker from '../../public/images/infomarker.png';
import GreenCheck from '../../public/images/green-check.png';
import PlusSign from '../../public/images/plus-sign.png';

const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const EntityListEntry = props => (
  <div className="row EntityListEntry" >
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      
      <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
        <a className="results-page-icon" onClick={e => props.handleAddToItineraryClick(e, props.entity)} >{props.entity.isAdded ? <span className="glyphicon glyphicon-ok-sign result-page-check-sign"/> : <span className="glyphicon glyphicon-plus-sign result-page-plus-sign"/>}</a>
      </div>
      <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
        <span className="text-center index number" />
        <span className="title">{`${props.index + 1}.   ${props.entity.name}`}</span>
      </div>
      <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
        <a className="results-page-icon" onClick={e => props.handleEntityClick(e, props.entity)} ><span className="glyphicon glyphicon-info-sign result-page-info-sign"></span></a>
      </div>
    </div>
  </div>
  );
EntityListEntry.propTypes = {
  entity: PropTypes.object,
  index: PropTypes.number,
  handleEntityClick: PropTypes.func,
  handleAddToItineraryClick: PropTypes.func,
};

export default EntityListEntry;


// <img className="result-page-icon result-page-info-icon"src={InfoMarker} alt="" />