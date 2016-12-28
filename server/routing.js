const routeLogic= require('./routingLogic');

module.exports = function(app, express) {
  app.get('/recAreaOrg', routeLogic.getRecOrganization);
}
