// ResultsPage
    // NavBar
    // EntityList
      // EntityListEntry
    // Map

import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { FancyBorder } from '../helpers.js';
import NavBar from './NavBar.jsx';
import EntityList from './EntityList.jsx';
import Map from './Map.jsx';


class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userQuery: props.userQuery,
      entities: props.entities,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      userQuery: nextProps.userQuery,
      entities: nextProps.entities,
    });
  }
  render() {
    return (
      <div className="resultsPage">
        <FancyBorder color="orange">
          <div className="row">
            <NavBar />
          </div>
          <div className="row mapAndList">
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" >
              <Map userQuery={this.state.userQuery} entities={this.state.entities} />
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <EntityList entities={this.state.entities} />
            </div>
          </div>
        </FancyBorder>
      </div>
    );
  }
}


ResultsPage.propTypes = {
  userQuery: PropTypes.object,
  entities: PropTypes.arrayOf(PropTypes.object),
};

export default ResultsPage;

