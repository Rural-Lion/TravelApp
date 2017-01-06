// App - all state is held here for now
  // LandingPage
    // InputsContainer
      // Inputs
    // PlanVacationButton
    // InterestButtonsContainer
      // InterestButtons
        // interestButton
  // ResultsPage
    // NavBar
    // EntityList
      // EntityListEntry
    // MapContainer
      // Map

import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { FancyBorder } from './helpers';
import LandingPage from './LandingPage/LandingPage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';
import travelApp from './reducers';

const store = createStore(travelApp);
console.log(store.getState());

const App = () => (
  <Provider store={store}>
    <FancyBorder color="red">
      <Router history={hashHistory}>
        <Route path="/" component={LandingPage} />
        <Route path="/results" component={ResultsPage} />
      </Router>
    </FancyBorder>
  </Provider>
);
export default App;
