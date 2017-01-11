const routeLogic = require('./routingHandlers');

module.exports = function (app, express) {

//////////////////////////////////////////////////////////
////// ROUTES USED IN THE APP //////
//////////////////////////////////////////////////////////

  // Get Entites within a given radius
  app.get('/entitiesWithinRadius', routeLogic.getEntitiesWithinRadius);

 // Get Address for a RecArea or a Facility
  app.get('/recAddress', routeLogic.getRecAddress);
  app.get('/facilityAddress', routeLogic.getFacilityAddress);

  // Get Trails within a radius and the activity list of a specific Entity
  app.get('/trailsAndActivitiesWithinRadiusOfFacility', routeLogic.trailsAndActivitiesWithinRadiusOfFacility);
  app.get('/trailsAndActivitiesWithinRadiusOfRecAreas', routeLogic.trailsAndActivitiesWithinRadiusOfRecAreas);  

/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
////// ROUTES FOR TESTING PURPOSES //////
//////////////////////////////////////////////////////////////

 // Get RecAreas and Facilities Info
  app.get('/recArea', routeLogic.getRecArea);
  app.get('/facility', routeLogic.getFacility);

  // Get Activities for RecAreas and Facilities
  app.get('/recActivities', routeLogic.getRecActivities);
  app.get('/facilityActivities', routeLogic.getFacilitiesActivities);

  // Get EntityMedia for RecAreas and Facilities
  app.get('/recMedia', routeLogic.getRecMedia);
  app.get('/facilityMedia', routeLogic.getFacilityMedia);

  // Get activities for RecArea and Facility
  app.get('/activities', routeLogic.getActivities);

/////////////////////////////////////////////////////////////
};

