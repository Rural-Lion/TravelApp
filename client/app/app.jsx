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
import createLogger from 'redux-logger'
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { FancyBorder } from './helpers';
import LandingPage from './LandingPage/LandingPage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';
import travelApp from './reducers';

const logger = createLogger();
const store = createStore(travelApp, applyMiddleware(logger));
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
