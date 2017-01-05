export const toggleInterest = interestId => ({
  type: 'TOGGLE_INTEREST',
  interestId,
});

export const setLocation = location => ({
  type: 'SET_LOCATION',
  location,
});

export const setBudget = budget => ({
  type: 'SET_BUDGET',
  budget,
});

export const setLength = length => ({
  type: 'SET_LENGTH',
  length,
});

export const setDistance = distance => ({
  type: 'SET_DISTANCE',
  distance,
});
