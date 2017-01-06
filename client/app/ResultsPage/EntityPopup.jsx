import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import { FancyBorder } from '../helpers.js';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderWidth: '0px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
};


const EntityPopup = props => (


  <FancyBorder color="green">
    <Modal
      isOpen={props.showModal}
      onReqeustClose={props.handleEntityModalCloseClick}
      style={customStyles}

    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="row EntityListEntry">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={() => { props.handleEntityModalCloseClick(); }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <FancyBorder color="blue">
                <h4 className="modal-title">{props.entity.name}</h4>
              </FancyBorder>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                Activities:
              </div>
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                  <FancyBorder color="blue"><div>{props.entity.activities.join(", ")}</div></FancyBorder> 
                </div>
              </div>
              <div className="row entityDescriptionRow">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                Description:
              </div>
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                  <FancyBorder color="blue">
                    <div dangerouslySetInnerHTML={{ __html: props.entity.description }} />
                  </FancyBorder>
                </div>
              </div>
              <div className="row entityContactsRow">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center">
                  <FancyBorder color="blue"><div>{props.entity.phone}</div></FancyBorder>
                </div>
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 text-center">
                  <FancyBorder color="blue"><div>{props.entity.email}</div></FancyBorder>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { props.handleEntityModalCloseClick(); }}
                >
                Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </FancyBorder>
  );

EntityPopup.propTypes = {
  entity: PropTypes.object,
  handleEntityModalCloseClick: PropTypes.func,
  showModal: PropTypes.bool,
};

export default EntityPopup;

