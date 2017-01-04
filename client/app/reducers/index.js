import { combineReducers } from 'redux';
import inputs from './inputs.js';
import activities from './activities.js';

const travelApp = combineReducers({
  inputs,
  activities,
});

export default travelApp;
