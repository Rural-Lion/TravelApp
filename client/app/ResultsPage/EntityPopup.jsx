import React, { PropTypes } from 'react';
import { Modal, Button, Label } from 'react-bootstrap';
import { FancyBorder } from '../helpers.js';

const EntityPopup = (props) => {
  const makeActivityLabels = (activities => (
    activities.map(activity =>
      <h4 className="modalActivityLabel"><Label bsStyle="primary">{activity}</Label></h4>)
  ));

  return (
    <FancyBorder color="green" >
      <Modal
        show={props.showModal} onHide={() => { props.closeModal(); }}
        bsSize="large" dialogClassName="entityModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.entity.name}</Modal.Title>
          <FancyBorder color="blue">
            <div>{makeActivityLabels(props.entity.activities)}</div>
          </FancyBorder>
        </Modal.Header>
        <Modal.Body className="container">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          THIS WILL BE THE MAP
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 entityModalBody">
            <FancyBorder color="blue">
              <div dangerouslySetInnerHTML={{ __html: props.entity.description }} />
            </FancyBorder>
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
};
EntityPopup.propTypes = {
  entity: PropTypes.object,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
};

export default EntityPopup;

