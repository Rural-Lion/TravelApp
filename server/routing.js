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

  // Get Organizations for RecAreas and Facilities
  app.get('/recAreaOrg', routeLogic.getRecOrganization);
  app.get('/facilityOrg', routeLogic.getFacilityOrganization);

  // Get Activities for RecAreas and Facilities
  app.get('/recActivities', routeLogic.getRecActivities);
  app.get('/facilityActivities', routeLogic.getFacilitiesActivities);

// Get EntityLinks for RecAreas and Facilities
  app.get('/recLinks', routeLogic.getRecLinks);
  app.get('/facilityLinks', routeLogic.getFacilityLinks);

  // Get EntityMedia for RecAreas and Facilities
  app.get('/recMedia', routeLogic.getRecMedia);
  app.get('/facilityMedia', routeLogic.getFacilityMedia);

  // Get Tours for Facilities
  app.get('/facilityTours', routeLogic.getFacilityTours);

  // Get Facility Campsites
  app.get('/facilityCampsites', routeLogic.getFacilityCampsites);

  // Get Facility Permit Entrances
  app.get('/facilityEntrances', routeLogic.getFacilityPermitEntrances);

  // Get activities for RecArea and Facility
  app.get('/activities', routeLogic.getActivities);

  // Get permitEntrances for RecArea and Facility
  app.get('/permitEntrances', routeLogic.getEntrances);

/////////////////////////////////////////////////////////////
};

