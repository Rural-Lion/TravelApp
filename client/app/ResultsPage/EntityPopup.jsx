import React, { PropTypes } from 'react';
import { Modal, Button, Label } from 'react-bootstrap';
import { FancyBorder } from '../helpers.js';
import TrailsContainer from './TrailsContainer.jsx';

const EntityPopup = (props) => {
  const makeActivityLabels = (activities => (
    activities.map(activity =>
      <h4 className="modalActivityLabel"><Label bsStyle="primary">{activity}</Label></h4>)
  ));

  return (
    <FancyBorder color="green" >
      <Modal
        show={props.showModal} onHide={() => { props.closeModal(); }}
        bsSize="lg" dialogClassName="entityModal"
      >
        <Modal.Header closeButton className="text-center">
          <Modal.Title><h3>{props.entity.name.toUpperCase()}</h3></Modal.Title>
          <FancyBorder color="blue">
            <div>{makeActivityLabels(props.entity.activities)}</div>
          </FancyBorder>
        </Modal.Header>
        <Modal.Body className="container-fluid">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <TrailsContainer entity={props.entity} />
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="row">
              <FancyBorder color="blue">
                <h4>Contact Information</h4>
                <div>Phone number: {props.entity.phoneNumber || 'no info'}</div>
                <div>Email: {props.entity.email || 'no info'}</div>
                <div>Address: {`${props.entity.address.Address}, ${props.entity.address.City}, 
                  ${props.entity.address.PostalCode}, ${props.entity.address.State} ` || 'no info'}</div>
              </FancyBorder>
            </div>
            <div className="row">
              <FancyBorder color="blue">
                <h4>Description</h4>
                <div dangerouslySetInnerHTML={{ __html: props.entity.description }} className="entityModalDescription" />
              </FancyBorder>
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

