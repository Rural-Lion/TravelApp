let Sequelize = require('sequelize');
let schemas = require('../database/schemas.js');

module.exports.getRecArea = function(req, res) {
  let {query: {recArea}} = req;
  schemas.recAreas.findOne({
    where: {RecAreaName: recArea}
  }).then(function(recreationArea) {
    res.send(recreationArea);
  })
  .catch((err) => console.log('error', err));
};

module.exports.getFacility = function(req, res) {
  let {query: {facility}} = req;
  schemas.facilities.findOne({
    where: {FacilityName: facility}
  }).then(function(fac) {
    res.send(fac);
  })
  .catch((err) => console.log('error', err));
};

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
};

module.exports.getFacilitiesActivities = function(req, res) {
  let {query: { facility }} = req;
  schemas.facilities.findOne({
    where: {FacilityName: facility}
  }).then(function(fac) {
    console.log(fac);
    fac.getActivities()
    .then(function(activities) {
      console.log(activities);
      res.send(activities);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getRecAddress = function(req, res) {
  let {query: {recArea}} = req;
  schemas.recAreas.findOne({
    where: {RecAreaName: recArea}
  })
  .then(function(recreationArea) {
    recreationArea.getRecAreaAddress()
    .then(function(address) {
      console.log(address);
      res.send(address);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getRecLinks = function(req, res) {
  let {query: {recArea}} = req;
  console.log("getting in here");
  schemas.recAreas.findOne({
    where: {RecAreaName: recArea}
  })
  .then(function(recreationArea) {
    console.log(recreationArea);
    recreationArea.getEntityLinks()
    .then(function(links) {
      console.log(links);
      res.send(links);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getFacilityLinks = function(req, res) {
  let {query: {facility}} = req;
  console.log("getting in here");
  schemas.facilities.findOne({
    where: {FacilityName: facility}
  })
  .then(function(fac) {
    console.log(fac);
    fac.getEntityLinks()
    .then(function(links) {
      console.log(links);
      res.send(links);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getRecMedia = function(req, res) {
  let {query: {recArea}} = req;
  console.log("getting in here");
  schemas.recAreas.findOne({
    where: {RecAreaName: recArea}
  })
  .then(function(recreationArea) {
    console.log(recreationArea);
    recreationArea.getEntityMedia()
    .then(function(media) {
      console.log(media);
      res.send(media);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getFacilityMedia = function(req, res) {
  let {query: {facility}} = req;
  console.log("getting in here");
  schemas.facilities.findOne({
    where: {FacilityName: facility}
  })
  .then(function(fac) {
    console.log(fac);
    fac.getEntityMedia()
    .then(function(media) {
      console.log(media);
      res.send(media);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getFacilityTours = function(req, res) {
  let {query: {facility}} = req;
  console.log("getting in here");
  schemas.facilities.findOne({
    where: {FacilityName: facility}
  })
  .then(function(fac) {
    console.log(fac);
    fac.getTours()
    .then(function(tours) {
      console.log(tours);
      res.send(tours);
    });
  })
  .catch((err) => console.log('error', err));
};