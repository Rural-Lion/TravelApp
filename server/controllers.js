let Sequelize = require('sequelize');
let schemas = require('../database/schemas.js');
let db = require('../database/database.js');
let getEntitiesWithinRadiusModel = require('./models.js').getEntitiesWithinRadiusModel;
let getRecAddressModel = require('./models.js').getRecAddressModel;
let getFacilityAddressModel = require('./models.js').getFacilityAddressModel;
let getRecActivitiesModel = require('./models.js').getRecActivitiesModel;
let getFacilitiesActivitiesModel = require('./models.js').getFacilitiesActivitiesModel;
let trailsAndActivitiesWithinRadiusOfFacilityModel = require('./models.js').trailsAndActivitiesWithinRadiusOfFacilityModel;
let trailsAndActivitiesWithinRadiusOfRecAreasModel = require('./models.js').trailsAndActivitiesWithinRadiusOfRecAreasModel;
let getRecAreaModel = require('./models.js').getRecAreaModel;
let getFacilityModel = require('./models.js').getFacilityModel;
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
module.exports.getRecAddress = (req, res) => {
  let {query: {recAreaID}} = req;
  getRecAddressModel(recAreaID)
  .then((recAddress) => {
    res.send(recAddress);
  })
  .catch((err) => console.log('error', err));
};

// Get Address for a Facility
module.exports.getFacilityAddress = (req, res) => {
  let {query: {facilityID}} = req;
  getFacilityAddressModel(facilityID)
  .then((facilityAddress) => {
    res.send(facilityAddress);
  })
  .catch((err) => console.log('error', err));
};

// Get Activities for a RecArea
module.exports.getRecActivities = (req, res) => {
  let {query: { recAreaID }} = req;
  getRecActivitiesModel(recAreaID)
  .then((recArea) => {
      res.send(recArea);
  })
  .catch(err => console.log('error', err));
};

 // Get Activities for a Facility
module.exports.getFacilitiesActivities = (req, res) => {
  let {query: { facilityID }} = req;
  getFacilitiesActivitiesModel(facilityID)
  .then((fac) => {
    res.send(fac);
  })
  .catch(err => console.log('error', err));
};

// Get Trails within a radius and the activity list of a specific Facility
module.exports.trailsAndActivitiesWithinRadiusOfFacility = (req, res) => {
  let {query: {latitude, longitude, facilityID}} = req;
  trailsAndActivitiesWithinRadiusOfFacilityModel(latitude, longitude, facilityID)
  .then((facilityInfo) => {
    res.send(facilityInfo);
  })
  .catch((err) => console.log('error: ', err));
};

// Get Trails within a radius and the activity list of a specific RecArea
module.exports.trailsAndActivitiesWithinRadiusOfRecAreas = (req, res) => {
  let {query: {latitude, longitude, recAreaID}} = req;
  trailsAndActivitiesWithinRadiusOfRecAreasModel(latitude, longitude, recAreaID)
  .then((recAreaInfo) => {
    res.send(recAreaInfo);
  })
  .catch((err) => console.log('error: ', err));
};

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
////// HANDLERS FOR TESTING PURPOSES //////
///////////////////////////////////////////////////////////////////////////

 // Get RecAreas Info
module.exports.getRecArea = (req, res) => {
  let {query: {recAreaID}} = req;
  getRecAreaModel(recAreaID)
  .then((recArea) => {
    res.send(recArea);
  })
  .catch(err => console.log('error', err));
};

 // Get Facilities Info
module.exports.getFacility = (req, res) => {
  let {query: {facilityID}} = req;
  getFacilityModel(facilityID)
  .then((facility) => {
    res.send(facility);
  })
  .catch(err => console.log('error', err));
};

// Get list of all activities
module.exports.getActivities = (req, res) => {
  let {query: {activity}} = req;
  getActivitiesModel(activity)
  .then((activity) => {
    res.send(activity);
  })
  .catch(err => console.log('error', err));
};

///////////////////////////////////////////////////////////////////////////
