let Sequelize = require('sequelize');
let schemas = require('../database/schemas.js');

module.exports.getRecOrganization = function(req, res) {
  let {query: { recArea }} = req;
  schemas.recAreas.findOne({ 
    where: {RecAreaName: recArea}
  }).then(function(recreationArea) {
    recreationArea.getOrganizations()
    .then(function(organization) {
      console.log(organization);
      res.send(organization[0].OrgName);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getFacilityOrganization = function(req, res) {
  let {query: { facility }} = req;
  schemas.facilities.findOne({
    where: {FacilityName: facility}
  }).then(function(fac) {
    fac.getOrganizations()
    .then(function(organization) {
      console.log(organization);
      res.send(organization[0].OrgName);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getRecActivities = function(req, res) {
  let {query: { recArea }} = req;
  schemas.recAreas.findOne({
    where: {RecAreaName: recArea}
  }).then(function(recreationArea) {
    console.log(recreationArea);
    recreationArea.getActivities()
    .then(function(activities) {
      console.log(activities);
      res.send(activities);
    });
  })
  .catch((err) => console.log('error', err));
}