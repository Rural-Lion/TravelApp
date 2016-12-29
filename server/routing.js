const routeLogic= require('./routingLogic');

module.exports = function(app, express) {
  // Get RecAreas and Facilities
  app.get('/recArea', routeLogic.getRecArea);
  app.get('/facility', routeLogic.getFacility);

  // Get Organizations for RecAreas and Facilities
  app.get('/recAreaOrg', routeLogic.getRecOrganization);
  app.get('/facilityOrg', routeLogic.getFacilityOrganization);

  // Get Activities for RecAreas and Facilities
  app.get('/recActivities', routeLogic.getRecActivities);
  app.get('/facilityActivities', routeLogic.getFacilitiesActivities);

  // Get Addresses for RecAreas and Facilities
  // app.get('/recAddress', routeLogic.getRecAddress);
  // app.get('/facilityAddress', routeLogic.getFacilityAddress);
}
