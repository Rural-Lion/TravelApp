const routeLogic = require('./routingLogic');

module.exports = function (app, express) {

  // Get Entites with Radius
  app.get('/entitiesWithinRadius', routeLogic.getEntitiesWithinRadius);

  // Get Trails with Radius
  app.get('/trailsWithinRadius', routeLogic.getTrailsWithinRadius);

  // Get RecAreas and Facilities Info
  app.get('/recArea', routeLogic.getRecArea);
  app.get('/facility', routeLogic.getFacility);

  // Get Organizations for RecAreas and Facilities
  app.get('/recAreaOrg', routeLogic.getRecOrganization);
  app.get('/facilityOrg', routeLogic.getFacilityOrganization);

  // Get Activities for RecAreas and Facilities
  app.get('/recActivities', routeLogic.getRecActivities);
  app.get('/facilityActivities', routeLogic.getFacilitiesActivities);

  // Get Addresses for RecAreas and Facilities
  app.get('/recAddress', routeLogic.getRecAddress);
  app.get('/facilityAddress', routeLogic.getFacilityAddress);

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

  app.get('/permitEntrances', routeLogic.getEntrances);

};

