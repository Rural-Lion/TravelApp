import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import { Link } from 'react-router';

const NavBar = props => (
  <FancyBorder color="yellow">
    <div className="row navBar" />
  </FancyBorder>
);

NavBar.propTypes = {

};

export default NavBar;
