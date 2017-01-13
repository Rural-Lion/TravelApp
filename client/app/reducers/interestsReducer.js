const initialState = [
  ['Biking', false, ['BIKING']], ['Fishing', false, ['FISHING', 'BOATING']], ['Cultural Sites', false, ['HISTORIC & CULTURAL SITE', 'ENVIRONMENTAL EDUCATION']], 
  ['Camping', false, ['PICNICKING', 'CAMPING', 'FIRE LOOKOUTS/CABINS OVERNIGHT', 'HORSE CAMPING']], ['Climbing', false, ['CLIMBING']],
  ['Hiking', true, ['HIKING']], ['Winter Sports', false, ['SNOWPARK', 'WINTER SPORTS']], ['Equestrian', false, ['HORSEBACK RIDING', 'HORSE CAMPING']],
  ['Photography', false, ['PHOTOGRAPHY', 'OBSERVATION SITE']], ['Water Sports', false, ['BOATING', 'WATER SPORTS','SWIMMING SITE', 'PADDLING', 'SWIMMING', 'DIVING', 'SNORKELING']], 
  ['Wildlife Viewing', false, ['FISH VIEWING SITE', 'WILDERNESS', 'WILDLIFE VIEWING', 'HUNTING']], ['Motor Sports', false, ['AUTO TOURING', 'OFF HIGHWAY VEHICLE', 'RECREATIONAL VEHICLES']],
];

const interests = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_INTEREST':
      return state.map((interest, index) => {
        if (index !== action.interestId) {
          return interest;
        }
        return [interest[0], !interest[1], interest[2]];
      });
    default:
      return state;
  }
};

export default interests;