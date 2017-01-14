import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import { ProgressBar, Button } from 'react-bootstrap';
import InfoMarker from '../../public/images/infomarker.png';

const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const EntityListEntry = props => (
  <div className="row EntityListEntry" >
    <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">
      <div className="row">
        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"><a onClick={e => props.handleAddToItineraryClick(e, props.entity)} >{props.entity.isAdded ? <img className="infoButton"src="http://www.clipartbest.com/cliparts/Kin/jry/Kinjrykiq.png" alt="" /> : <img className="infoButton"src="http://iconshow.me/media/images/ui/slim-square-icons/png/256/add.png" alt="" />}</a></div>
        <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">
          <span className="text-center index number" />
          <span className="title">{`${props.index + 1}.   ${props.entity.name}`}</span>
        </div>
      </div>
    </div>
    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
      <a onClick={e => props.handleEntityClick(e, props.entity)} ><img className="infoButton"src={InfoMarker} alt="" /></a>
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
