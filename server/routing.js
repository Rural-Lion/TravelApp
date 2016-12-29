const routeLogic= require('./routingLogic');

module.exports = function(app, express) {
  app.get('/recAreaOrg', routeLogic.getRecOrganization);
  app.get('/facilityOrg', routeLogic.getFacilityOrganization);
  app.get('/recActivities', routeLogic.getRecActivities);
}
