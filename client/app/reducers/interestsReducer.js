const initialState = [
  ['Biking', false], ['Boating', false], ['Historic & Cultural Site', false], ['Camping', false], ['Fishing', false],
  ['Hiking', true], ['Off Highway Vehicle', false], ['Picnicking', false], ['Recreational Vehicles', false],
  ['Visitor Center', false], ['Water Sports', false], ['Wildlife Viewing', false], ['Other Recreation Concession Site', false],
];

const initialState = [
  ['Biking', false, ['BIKING']], ['Boating', false, ['BOATING']], ['Cultural', false, ['HISTORIC & CULTURAL SITE', 'ENVIRONMENTAL EDUCATION']], 
  ['Camping', false, ['PICNICKING', 'CAMPING', 'FIRE LOOKOUTS/CABINS OVERNIGHT', 'HORSE CAMPING']], ['Fishing', false, ['FISHING', 'BOATING']],
  ['Hiking', true, ['HIKING']], ['Winter Sports', false, ['SNOWPARK', 'WINTER SPORTS']], ['Equestrian', false, ['HORSEBACK RIDING', 'HORSE CAMPING']],
  ['Photography', false, ['PHOTOGRAPHY', 'OBSERVATION SITE']], ['Water Activities', false, ['BOATING', 'WATER SPORTS','SWIMMING SITE', 'PADDLING', 'SWIMMING', 'DIVING', 'SNORKELING']], 
  ['Wildlife Viewing', false, ['FISH VIEWING SITE', 'WILDERNESS', 'WILDLIFE VIEWING', 'HUNTING']], ['Motor Sports', false, ['AUTO TOURING', 'OFF HIGHWAY VEHICLE', 'RECREATIONAL VEHICLES']],
];

const interests = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_INTEREST':
      return state.map((interest, index) => {
        if (index !== action.interestId) {
          return interest;
        }
        return [interest[0], !interest[1]];
      });
    default:
      return state;
  }
};

export default interests;