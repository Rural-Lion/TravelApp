const initialState = {
  startingLocation: '',
  budgetOfTrip: 0,
  lengthOfTrip: 0,
  distanceOfTrip: 0,
};

const userQuery = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return Object.assign({}, state, {
        startingLocation: action.location,
      });
    case 'SET_BUDGET':
      return Object.assign({}, state, {
        budgetOfTrip: action.budget,
      });
    case 'SET_LENGTH':
      return Object.assign({}, state, {
        lengthOfTrip: action.length,
      });
    case 'SET_DISTANCE':
      return Object.assign({}, state, {
        distanceOfTrip: action.distance,
      });
    default:
      return state;
  }
};

export default userQuery;
