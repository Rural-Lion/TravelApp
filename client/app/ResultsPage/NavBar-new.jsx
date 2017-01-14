import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers.js';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'EntityList',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedKey) {
    console.log('props inside handler', this);
    this.props.selectTab(selectedKey);
    this.setState({
      active: selectedKey,
    });
  }

  render() {
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
            <Nav bsStyle="tabs"justified activeKey={this.state.active} onSelect={this.handleSelect} pullRight>
              <NavItem eventKey={'EntityList'} title="Plan">Plan</NavItem>
              <NavItem eventKey={'ItineraryContainer'} title="Itinerary">Itinerary</NavItem>
              <NavItem eventKey={'OptionsContainer'} title="Options">Options</NavItem>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  selectTab: PropTypes.func,
};
export default NavBar;
