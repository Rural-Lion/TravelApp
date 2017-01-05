import { combineReducers } from 'redux';
import userQuery from './userQueryReducer.js';
import interests from './interestsReducer.js';

const travelApp = combineReducers({
  userQuery,
  interests,
});

export default travelApp;
