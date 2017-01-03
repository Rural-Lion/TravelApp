// ResultsPage
    // NavBar
    // EntityList
      // EntityListEntry
    // Map

import React, { Component, PropTypes } from 'react';
import { FancyBorder } from '../helpers';
import NavBar from './NavBar.jsx';
import EntityList from './EntityList.jsx';
import EntityPopup from './EntityPopup.jsx';
import Map from './Map.jsx';


class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: props.entities,
      selectedEntity: {},
      showModal: false,
    };

    this.handleEntityClick = this.handleEntityClick.bind(this);
    this.handleEntityModalCloseClick = this.handleEntityModalCloseClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      entities: nextProps.entities,
    });
  }

  handleEntityClick(e, activity) {
    console.log(e);
    console.log(activity);
    this.setState({
      selectedEntity: activity,
    });
  }

  handleEntityModalCloseClick() {

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
              <Map userQuery={this.props.userQuery} entities={this.state.entities} />
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <EntityList entities={this.props.entities} handleEntityClick={this.handleEntityClick} />
            </div>
          </div>
          <div className="conatiner">
            {this.state.showModal ? <EntityPopup entity={this.state.selectedEntity} handleEntityModalCloseClick={this.state.handleEntityModalCloseClick} /> : null }
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
