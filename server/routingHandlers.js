let Sequelize = require('sequelize');
let schemas = require('../database/schemas.js');
let db = require('../database/database.js');

///////////////////////////////////////////////////////////////
////// HANDLERS USED IN THE APP //////
///////////////////////////////////////////////////////////////

// Get Entites within a given radius
module.exports.getEntitiesWithinRadius = (req, res) => {
  let {query: {latitude, longitude, distance, activities}} = req;
  db.query(`SELECT * FROM (SELECT facilities.FacilityLatitude, facilities.FacilityLongitude, facilities.FacilityName, facilities.FacilityPhone, facilities.FacilityDescription, facilities.FacilityEmail, recAreas.RecAreaName, recAreas.RecAreaLatitude, recAreas.RecAreaLongitude, recAreas.RecAreaPhone, recAreas.RecAreaDescription, recAreas.RecAreaEmail, entityMedia.URL, entityactivities.EntityID, entityactivities.EntityType, entityactivities.ActivityDescription FROM entityactivities LEFT JOIN recAreas ON recAreas.RecAreaID = entityactivities.EntityID LEFT JOIN facilities ON facilities.FacilityID = entityactivities.EntityID LEFT JOIN entityMedia ON entityactivities.EntityID = entityMedia.EntityID LEFT JOIN activities ON entityactivities.ActivityID = activities.ActivityID WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(recAreaLatitude)) + cos(RADIANS(${latitude})) * cos(RADIANS(recAreaLatitude)) * cos(RADIANS(recAreaLongitude - (${longitude})))) * 6371 <= ${distance} OR acos(sin(RADIANS(${latitude})) * sin(RADIANS(facilityLatitude)) + cos(RADIANS(${latitude})) * cos(RADIANS(facilityLatitude)) * cos(RADIANS(facilityLongitude - (${longitude})))) * 6371 <= ${distance}) AND ActivityName IN (${activities.slice(1, activities.length-1)})) AS matches GROUP BY matches.EntityID LIMIT 50`, {type: db.QueryTypes.SELECT})
  .then(function(entities) {
          res.send(entities);
  })
  .catch((err) => console.log('error: ', err));
};

// Get Address for a RecArea
module.exports.getRecAddress = function(req, res) {
  let {query: {recAreaID}} = req;
  schemas.recAreaAddress.findOne({
    where: {RecAreaID: recAreaID}
  })
  .then(function({
    AddressStateCode, 
    City, 
    PostalCode, 
    RecAreaStreetAddress1, 
    RecAreaStreetAddress2, 
    RecAreaStreetAddress3
  }) {
    res.send({
      State: AddressStateCode,
      City: City,
      PostalCode: PostalCode,
      Address: RecAreaStreetAddress1 + ' ' + RecAreaStreetAddress2 + ' ' + RecAreaStreetAddress3
    });
  })
  .catch((err) => console.log('error', err));
};

// Get Address for a Facility
module.exports.getFacilityAddress = function(req, res) {
  let {query: {facilityID}} = req;
  schemas.facilitiesAddress.findOne({
    where: {FacilityID: facilityID}
  })
  .then(function({
    AddressStateCode, 
    City, 
    PostalCode, 
    FacilityStreetAddress1, 
    FacilityStreetAddress2, 
    FacilityStreetAddress3
  }) {
    res.send({
      State: AddressStateCode,
      City: City,
      PostalCode: PostalCode,
      Address: FacilityStreetAddress1 + ' ' + FacilityStreetAddress2 + ' ' + FacilityStreetAddress3
    });
  })
  .catch((err) => console.log('error', err));
};

// Get Trails within a radius and the activity list of a specific Facility
module.exports.trailsAndActivitiesWithinRadiusOfFacility = (req, res) => {
  let {query: {latitude, longitude, facilityID}} = req;
  if (longitude <= -100) {
        db.query(`SELECT trails.TrailCn AS id, trails.TrailName AS name, trails.GISMiles AS length, trails.GEOM AS coordinates FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, 12) AS DECIMAL(13, 8)) - (${longitude})))) * 6371 <= 70)`, {type: db.QueryTypes.SELECT})
        .then((trails) => {
          schemas.facilities.findOne({
            where: {FacilityID: facilityID},
            include: [{model: schemas.activities}]
          }).then(function(fac) {
            const facActivities = fac.dataValues.activities;
            let activityList = [];
            facActivities.forEach((activity) => {
              activityList.push(activity.dataValues.ActivityName);
            });
            let facilityInfo = {
              trails: trails,
              activities: activityList
            };
            res.send(facilityInfo);
          })
          .catch((err) => console.log('error', err));
        })
        .catch((err) => console.log('error: ', err));
      } else {
        db.query(`SELECT trails.TrailCn AS id, trails.TrailName AS name, trails.GISMiles AS length, trails.GEOM AS coordinates FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, 11) AS DECIMAL(12, 8)) - (${longitude})))) * 6371 <= 70)`, {type: db.QueryTypes.SELECT})
        .then((trails) => {
          schemas.facilities.findOne({
            where: {FacilityID: facilityID},
            include: [{model: schemas.activities}]
          }).then(function(fac) {
            const facActivities = fac.dataValues.activities;
            let activityList = [];
            facActivities.forEach((activity) => {
              activityList.push(activity.dataValues.ActivityName);
            });
            let facilityInfo = {
              trails: trails,
              activities: activityList
            };
            res.send(facilityInfo);
          })
          .catch((err) => console.log('error', err));
        })
        .catch((err) => console.log('error: ', err));
      }
};

// Get Trails within a radius and the activity list of a specific RecArea
module.exports.trailsAndActivitiesWithinRadiusOfRecAreas = (req, res) => {
  let {query: {latitude, longitude, recAreaID}} = req;
  if (longitude <= -100) {
        db.query(`SELECT trails.TrailCn AS id, trails.TrailName AS name, trails.GISMiles AS length, trails.GEOM AS coordinates FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, 12) AS DECIMAL(13, 8)) - (${longitude})))) * 6371 <= 70)`, {type: db.QueryTypes.SELECT})
        .then((trails) => {
          schemas.recAreas.findOne({
            where: {RecAreaID: recAreaID},
            include: [{model: schemas.activities}]
          }).then(function(recA) {
            const recAActivities = recA.dataValues.activities;
            let activityList = [];
            recAActivities.forEach((activity) => {
              activityList.push(activity.dataValues.ActivityName);
            });
            let recAreaInfo = {
              trails: trails,
              activities: activityList
            };
            res.send(recAreaInfo);
          })
          .catch((err) => console.log('error', err));
        })
        .catch((err) => console.log('error: ', err));
      } else {
        db.query(`SELECT trails.TrailCn AS id, trails.TrailName AS name, trails.GISMiles AS length, trails.GEOM AS coordinates FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, 11) AS DECIMAL(12, 8)) - (${longitude})))) * 6371 <= 70)`, {type: db.QueryTypes.SELECT})
        .then((trails) => {
          schemas.recAreas.findOne({
            where: {RecAreaID: recAreaID},
            include: [{model: schemas.activities}]
          }).then(function(recA) {
            const recAActivities = recA.dataValues.activities;
            let activityList = [];
            recAActivities.forEach((activity) => {
              activityList.push(activity.dataValues.ActivityName);
            });
            let recAreaInfo = {
              trails: trails,
              activities: activityList
            };
            res.send(recAreaInfo);
          })
          .catch((err) => console.log('error', err));
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
  schemas.recAreas.findOne({
    where: {RecAreaID: recAreaID},
    include: [
      { model: schemas.recAreaAddress },
      { model: schemas.activities },
      { model: schemas.entityMedia },
    ],
  }).then((recreationArea) => {
    res.send(recreationArea);
  })
  .catch(err => console.log('error', err));
};

 // Get Facilities Info
module.exports.getFacility = function(req, res) {
  let {query: {facilityID}} = req;
  schemas.facilities.findOne({
    where: {FacilityID: facilityID},
    include: [
      { model: schemas.permitEntrances },
      { model: schemas.facilitiesAddress },
      { model: schemas.activities },
      { model: schemas.entityMedia },
      { model: schemas.campsites },
    ],
  }).then((fac) => {
    res.send(fac);
  })
  .catch(err => console.log('error', err));
};

  // Get Organization for a RecArea
module.exports.getRecOrganization = function(req, res) {
  let {query: { recArea }} = req;
  schemas.recAreas.findOne({ 
    where: {RecAreaName: recArea}
  }).then(function(recreationArea) {
    recreationArea.getOrganizations()
    .then((organization) => {
      res.send(organization[0].OrgName);
    });
  })
  .catch(err => console.log('error', err));
};

  // Get Organization for a Facility
module.exports.getFacilityOrganization = function(req, res) {
  let {query: { facility }} = req;
  schemas.facilities.findOne({
    where: { FacilityName: facility },
  }).then((fac) => {
    fac.getOrganizations()
    .then((organization) => {
      console.log(organization);
      res.send(organization[0].OrgName);
    });
  })
  .catch(err => console.log('error', err));
};

 // Get Activities for a RecArea
module.exports.getRecActivities = function(req, res) {
  let {query: { recArea }} = req;
  schemas.recAreas.findOne({
    where: { RecAreaName: recArea },
  }).then((recreationArea) => {
    recreationArea.getActivities()
    .then((activities) => {
      res.send(activities);
    });
  })
  .catch(err => console.log('error', err));
};

 // Get Activities for a Facility
module.exports.getFacilitiesActivities = function(req, res) {
  let {query: { facility }} = req;
  schemas.facilities.findOne({
    where: { FacilityName: facility },
    include: [{ model: schemas.activities }],
  }).then((fac) => {
    res.send(fac);
  })
  .catch(err => console.log('error', err));
};

// Get EntityLinks for a RecArea
module.exports.getRecLinks = function(req, res) {
  let {query: {recArea}} = req;
  console.log("getting in here");
  schemas.recAreas.findOne({
    where: { RecAreaName: recArea },
  })
  .then((recreationArea) => {
    console.log(recreationArea);
    recreationArea.getEntityLinks()
    .then((links) => {
      console.log(links);
      res.send(links);
    });
  })
  .catch(err => console.log('error', err));
};

// Get EntityLinks for a Facility
module.exports.getFacilityLinks = function(req, res) {
  let {query: {facility}} = req;
  schemas.facilities.findOne({
    where: { FacilityName: facility },
  })
  .then((fac) => {
    console.log(fac);
    fac.getEntityLinks()
    .then((links) => {
      console.log(links);
      res.send(links);
    });
  })
  .catch(err => console.log('error', err));
};

// Get EntityMedia for a RecArea
module.exports.getRecMedia = function(req, res) {
  let {query: {recArea}} = req;
  schemas.recAreas.findOne({
    where: { RecAreaName: recArea },
  })
  .then((recreationArea) => {
    console.log(recreationArea);
    recreationArea.getEntityMedia()
    .then((media) => {
      console.log(media);
      res.send(media);
    });
  })
  .catch(err => console.log('error', err));
};

 // Get EntityMedia for a Facility
module.exports.getFacilityMedia = function(req, res) {
  let {query: {facility}} = req;
  schemas.facilities.findOne({
    where: { FacilityName: facility },
  })
  .then((fac) => {
    console.log(fac);
    fac.getEntityMedia()
    .then((media) => {
      console.log(media);
      res.send(media);
    });
  })
  .catch(err => console.log('error', err));
};

// Get Tours for a Facility
module.exports.getFacilityTours = function(req, res) {
  let {query: {facility}} = req;
  schemas.facilities.findOne({
    where: { FacilityName: facility },
  })
  .then((fac) => {
    console.log(fac);
    fac.getTours()
    .then((tours) => {
      console.log(tours);
      res.send(tours);
    });
  })
  .catch(err => console.log('error', err));
};

// Get campsites for a Facility
module.exports.getFacilityCampsites = function(req, res) {
  let {query: {facility}} = req;
  schemas.facilities.findOne({
    where: { FacilityName: facility },
  })
  .then((fac) => {
    console.log(fac);
    fac.getCampsites()
    .then((campsites) => {
      console.log(campsites);
      res.send(campsites);
    });
  })
  .catch(err => console.log('error', err));
};

// Get Facility Permit Entrances
module.exports.getFacilityPermitEntrances = function(req, res) {
  let {query: {facility}} = req;
  schemas.facilities.findOne({
    where: { FacilityName: facility },
    include: [{ model: schemas.permitEntrances }],
  })
  .then((fac) => {
    res.send(fac);
  })
  .catch(err => console.log('error', err));
};

// Get list of all activities
module.exports.getActivities = function(req, res) {
  let {query: {activity}} = req;
  schemas.activities.findOne({
    where: { ActivityName: activity },
    include: [
      { model: schemas.recAreas },
      { model: schemas.facilities },
    ],
  }).then((activity) => {
    res.send(activity);
  })
  .catch(err => console.log('error', err));
};

module.exports.getEntrances = function (req, res) {
  schemas.permitEntrances.findAll().then((entrance) => { res.send(entrance); });
};

///////////////////////////////////////////////////////////////////////////
