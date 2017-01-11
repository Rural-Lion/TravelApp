let Sequelize = require('sequelize');
let schemas = require('../database/schemas.js');
let db = require('../database/database.js');
let getEntitiesWithinRadiusModel = require('./models.js').getEntitiesWithinRadiusModel;
let getRecAddressModel = require('./models.js').getRecAddressModel;
let getFacilityAddressModel = require('./models.js').getFacilityAddressModel;
let getRecAreaModel = require('./models.js').getRecAreaModel;
let getFacilityModel = require('./models.js').getFacilityModel;
let getRecActivitiesModel = require('./models.js').getRecActivitiesModel;
let getFacilitiesActivitiesModel = require('./models.js').getFacilitiesActivitiesModel;
let getActivitiesModel = require('./models.js').getActivitiesModel;

///////////////////////////////////////////////////////////////
////// HANDLERS USED IN THE APP //////
///////////////////////////////////////////////////////////////

// Get Entites within a given radius
module.exports.getEntitiesWithinRadius = (req, res) => {
  let {query: {latitude, longitude, distance, activities}} = req;
  getEntitiesWithinRadiusModel(latitude, longitude, distance, activities)
  .then(function(entities) {
    res.send(entities);
  })
  .catch((err) => console.log('error: ', err));
};

// Get Address for a RecArea
module.exports.getRecAddress = function(req, res) {
  let {query: {recAreaID}} = req;
  getRecAddressModel(recAreaID)
  .then((recAddress) => {
    res.send(recAddress);
  })
  .catch((err) => console.log('error', err));
};

// Get Address for a Facility
module.exports.getFacilityAddress = function(req, res) {
  let {query: {facilityID}} = req;
  getFacilityAddressModel(facilityID)
  .then((facilityAddress) => {
    res.send(facilityAddress);
  })
  .catch((err) => console.log('error', err));
};

// Get Trails within a radius and the activity list of a specific Facility
module.exports.trailsAndActivitiesWithinRadiusOfFacility = (req, res) => {
  let {query: {latitude, longitude, facilityID}} = req;
  let listOfTrails;
  if (longitude <= -100) {
        db.query(`SELECT trails.TrailCn AS id, trails.TrailName AS name, trails.GISMiles AS length, trails.GEOM AS coordinates FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, 12) AS DECIMAL(13, 8)) - (${longitude})))) * 6371 <= 70)`, {type: db.QueryTypes.SELECT})
        .then((trails) => {
          listOfTrails = trails;
          return schemas.facilities.findOne({
            where: {FacilityID: facilityID},
            include: [{model: schemas.activities}]
          })
        })
        .then(function(fac) {
          const facActivities = fac.dataValues.activities;
          let activityList = [];
          facActivities.forEach((activity) => {
            activityList.push(activity.dataValues.ActivityName);
          });
          let facilityInfo = {
            trails: listOfTrails,
            activities: activityList
          };
          res.send(facilityInfo);
        })
        .catch((err) => console.log('error: ', err));
      } else {
        db.query(`SELECT trails.TrailCn AS id, trails.TrailName AS name, trails.GISMiles AS length, trails.GEOM AS coordinates FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, 11) AS DECIMAL(12, 8)) - (${longitude})))) * 6371 <= 70)`, {type: db.QueryTypes.SELECT})
        .then((trails) => {
          listOfTrails = trails;
          return schemas.facilities.findOne({
            where: {FacilityID: facilityID},
            include: [{model: schemas.activities}]
          })
        })
        .then(function(fac) {
          const facActivities = fac.dataValues.activities;
          let activityList = [];
          facActivities.forEach((activity) => {
            activityList.push(activity.dataValues.ActivityName);
          });
          let facilityInfo = {
            trails: listOfTrails,
            activities: activityList
          };
          res.send(facilityInfo);
        })
        .catch((err) => console.log('error: ', err));
      }
};

// Get Trails within a radius and the activity list of a specific RecArea
module.exports.trailsAndActivitiesWithinRadiusOfRecAreas = (req, res) => {
  let {query: {latitude, longitude, recAreaID}} = req;
  let listOfTrails;
  if (longitude <= -100) {
        db.query(`SELECT trails.TrailCn AS id, trails.TrailName AS name, trails.GISMiles AS length, trails.GEOM AS coordinates FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, 12) AS DECIMAL(13, 8)) - (${longitude})))) * 6371 <= 70)`, {type: db.QueryTypes.SELECT})
        .then((trails) => {
          listOfTrails = trails;
          return schemas.recAreas.findOne({
            where: {RecAreaID: recAreaID},
            include: [{model: schemas.activities}]
          })
        })
        .then(function(recA) {
          const recAActivities = recA.dataValues.activities;
          let activityList = [];
          recAActivities.forEach((activity) => {
            activityList.push(activity.dataValues.ActivityName);
          });
          let recAreaInfo = {
            trails: listOfTrails,
            activities: activityList
          };
          res.send(recAreaInfo);
        })
        .catch((err) => console.log('error: ', err));
      } else {
        db.query(`SELECT trails.TrailCn AS id, trails.TrailName AS name, trails.GISMiles AS length, trails.GEOM AS coordinates FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, 11) AS DECIMAL(12, 8)) - (${longitude})))) * 6371 <= 70)`, {type: db.QueryTypes.SELECT})
        .then((trails) => {
          listOfTrails = trails;
          return schemas.recAreas.findOne({
            where: {RecAreaID: recAreaID},
            include: [{model: schemas.activities}]
          })
        })
        .then(function(recA) {
          const recAActivities = recA.dataValues.activities;
          let activityList = [];
          recAActivities.forEach((activity) => {
            activityList.push(activity.dataValues.ActivityName);
          });
          let recAreaInfo = {
            trails: listOfTrails,
            activities: activityList
          };
          res.send(recAreaInfo);
        })
        .catch((err) => console.log('error: ', err));
      }
};

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
////// HANDLERS FOR TESTING PURPOSES //////
///////////////////////////////////////////////////////////////////////////

 // Get RecAreas Info
module.exports.getRecArea = function(req, res) {
  let {query: {recAreaID}} = req;
  getRecAreaModel(recAreaID)
  .then((recArea) => {
    res.send(recArea);
  })
  .catch(err => console.log('error', err));
};

 // Get Facilities Info
module.exports.getFacility = function(req, res) {
  let {query: {facilityID}} = req;
  getFacilityModel(facilityID)
  .then((facility) => {
    res.send(facility);
  })
  .catch(err => console.log('error', err));
};

 // Get Activities for a RecArea
module.exports.getRecActivities = function(req, res) {
  let {query: { recAreaID }} = req;
  getRecActivitiesModel(recAreaID)
  .then((recArea) => {
      res.send(recArea);
  })
  .catch(err => console.log('error', err));
};

 // Get Activities for a Facility
module.exports.getFacilitiesActivities = function(req, res) {
  let {query: { facilityID }} = req;
  getFacilitiesActivitiesModel(facilityID)
  .then((fac) => {
    res.send(fac);
  })
  .catch(err => console.log('error', err));
};

// Get list of all activities
module.exports.getActivities = function(req, res) {
  let {query: {activity}} = req;
  getActivitiesModel(activity)
  .then((activity) => {
    res.send(activity);
  })
  .catch(err => console.log('error', err));
};

///////////////////////////////////////////////////////////////////////////
