import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import { Link } from 'react-router';

const NavBar = props => (
  <FancyBorder color="yellow">
    <div className="row navBar" >
      <button type="button" onClick={() => props.selectTab('EntityList')} className="btn btn-primary">PLAN</button>
      <button type="button" onClick={() => props.selectTab('ItineraryContainer')} className="btn btn-primary">ITINERARY</button>
      <button type="button" onClick={() => props.selectTab('OptionsContainer')} className="btn btn-primary">OPTIONS</button>
    </div>
  </FancyBorder>
);

NavBar.propTypes = {
  selectTab: PropTypes.func,
};

export default NavBar;
