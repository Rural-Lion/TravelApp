import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavBar = (props) => {
  const timePercent = () => (100 - ((props.usedTime / props.totalTime) * 100));
  const budgetPercent = () => (100 - ((props.usedBudget / props.totalBudget) * 100));

  const handleSelect = (selectedKey) => {
    props.selectTab(selectedKey);
  };
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">TravelApp</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <div className="nav-tabs-div">
          <Nav bsStyle="tabs"justified activeKey={3} onSelect={handleSelect} pullPight>
            <NavItem eventKey={'EntityList'} title="Plan">Plan</NavItem>
            <NavItem eventKey={'ItineraryContainer'} title="Itinerary">Itinerary</NavItem>
            <NavItem eventKey={'OptionsContainer'} title="Options">Options</NavItem>
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  selectTab: PropTypes.func,
};
export default NavBar;
