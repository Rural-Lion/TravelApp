import React, { Component, PropTypes } from 'react';
import {FancyBorder} from '../helpers.js';

const NavBar = props => (
  <FancyBorder color="yellow">
    <div className="row navBar">
      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1">
        <FancyBorder color="green">
        [//currently doesnt do anything]
          <button type="button" className="goBackButton btn btn-default">Go Back</button>
        </FancyBorder>
      </div>
      <div className="col-xs-offset-6 col-sm-offset-6 col-md-offset-6 col-lg-offset-6 col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <FancyBorder color="green">
        [//currently doesnt do anything]
          <button type="button" className="finalizeButton btn btn-default">{'Finalize >'}</button>
        </FancyBorder>
      </div>
    </div>
  </FancyBorder>
  );

NavBar.propTypes = {

};

export default NavBar;