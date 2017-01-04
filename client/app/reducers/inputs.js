// inputs from landing page
      // userQuery: {
      //   budgetOfTrip: 0,
      //   lengthOfTrip: 0,
      //   startingLocation: '',
      //   distanceOfTrip: 0,
      //   startingLocationCoordinates: { lat: 37.775, lng: -122.419 },
      // },

const initialState = {
  startingLocation: '',
  budgetOfTrip: 0,
  lengthOfTrip: 0,
  distanceOfTrip: 0,
};

const setInputs = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return Object.assign({}, state, {
        startingLocation: action.location,
      });
    case 'SET_BUDGET':
      return Object.assign({}, state, {
        startingLocation: action.budget,
      });
    case 'SET_LENGTH':
      return Object.assign({}, state, {
        startingLocation: action.length,
      });
    case 'SET_DISTANCE':
      return Object.assign({}, state, {
        startingLocation: action.distance,
      });
    default:
      return state;
  }
};

export default setInputs;
