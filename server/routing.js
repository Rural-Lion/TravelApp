const routeLogic= require('./routingLogic');

module.exports = function(app, express) {

  // Get RecAreas and Facilities Info
  app.get('/recArea', routeLogic.getRecArea);
  app.get('/facility', routeLogic.getFacility);

  // Get Organizations for RecAreas and Facilities
  app.get('/recAreaOrg', routeLogic.getRecOrganization);
  app.get('/facilityOrg', routeLogic.getFacilityOrganization);

  // Get Activities for RecAreas and Facilities
  app.get('/recActivities', routeLogic.getRecActivities);
  app.get('/facilityActivities', routeLogic.getFacilitiesActivities);

  // Get Addresses for RecAreas and Facilities (Not working need to debug)
  // app.get('/recAddress', routeLogic.getRecAddress);
  // app.get('/facilityAddress', routeLogic.getFacilityAddress);

  // Get EntityLinks for RecAreas and Facilities
  app.get('/recLinks', routeLogic.getRecLinks);
  app.get('/facilityLinks', routeLogic.getFacilityLinks);

  // Get EntityMedia for RecAreas and Facilities
  app.get('/recMedia', routeLogic.getRecMedia);
  app.get('/facilityMedia', routeLogic.getFacilityMedia);

  // Get Tours for Facilities
  app.get('/facilityTours', routeLogic.getFacilityTours);
}
