import { combineReducers } from 'redux';
import userQuery from './userQueryReducer.js';
// import activities from './activities.js';

const travelApp = combineReducers({
  userQuery,
  //activities,
});

export default travelApp;
