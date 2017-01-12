const controllers = require('./controllers');

module.exports = function (app, express) {

//////////////////////////////////////////////////////////
////// ROUTES USED IN THE APP //////
//////////////////////////////////////////////////////////

  // Get Entites within a given radius
  app.get('/entitiesWithinRadius', controllers.getEntitiesWithinRadius);

 // Get Address for a RecArea or a Facility
  app.get('/recAddress', controllers.getRecAddress);
  app.get('/facilityAddress', controllers.getFacilityAddress);

  // Get Trails within a radius and the activity list of a specific Entity
  app.get('/trailsAndActivitiesWithinRadiusOfFacility', controllers.trailsAndActivitiesWithinRadiusOfFacility);
  app.get('/trailsAndActivitiesWithinRadiusOfRecAreas', controllers.trailsAndActivitiesWithinRadiusOfRecAreas);  

/////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
////// ROUTES FOR TESTING PURPOSES //////
//////////////////////////////////////////////////////////////////////

 // Get RecAreas and Facilities Info
  app.get('/recArea', controllers.getRecArea);
  app.get('/facility', controllers.getFacility);

  // Get Activities for RecAreas and Facilities
  app.get('/recActivities', controllers.getRecActivities);
  app.get('/facilityActivities', controllers.getFacilitiesActivities);

  // Get activities for RecArea and Facility
  app.get('/activities', controllers.getActivities);

//////////////////////////////////////////////////////////////////////
};

