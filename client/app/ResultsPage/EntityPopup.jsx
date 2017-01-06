import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FancyBorder } from '../helpers.js';

const EntityPopup = props => (
  <FancyBorder color="green">
    <Modal show={props.showModal} onHide={() => { props.closeModal(); }}>
      <Modal.Header closeButton>
        <Modal.Title>{props.entity.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          Activities:
        </div>
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <FancyBorder color="blue"><div>{props.entity.activities.join(', ')}</div></FancyBorder>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          Description:
        </div>
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <FancyBorder color="blue">
              <div dangerouslySetInnerHTML={{ __html: props.entity.description }} />
            </FancyBorder>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center">
            <FancyBorder color="blue"><div>{props.entity.phone}</div></FancyBorder>
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 text-center">
            <FancyBorder color="blue"><div>{props.entity.email}</div></FancyBorder>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  </FancyBorder>
  );

EntityPopup.propTypes = {
  entity: PropTypes.object,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
};

export default EntityPopup;

