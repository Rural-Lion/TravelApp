let Sequelize = require('sequelize');
let geolib = require('geolib');
let schemas = require('../database/schemas.js');
let db = require('../database/database.js');
let Promise = require("bluebird");

module.exports.getRecArea = function(req, res) {
  let {query: {recArea}} = req;
  schemas.recAreas.findOne({
    where: {RecAreaName: recArea},
    include: [
      {model: schemas.recAreaAddress}, 
      {model: schemas.activities}, 
      {model: schemas.entityMedia }
      ]
  }).then(function(recreationArea) {
    res.send(recreationArea);
  })
  .catch((err) => console.log('error', err));
};

module.exports.getFacility = function(req, res) {
  let {query: {facility}} = req;
  schemas.facilities.findOne({
    where: {FacilityName: facility},
    include: [
      {model: schemas.permitEntrances},
      {model: schemas.facilitiesAddress},
      {model: schemas.activities},
      {model: schemas.entityMedia},
      {model: schemas.campsites}
    ]
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
      console.log("organization for recArea", organization);
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
    where: {FacilityName: facility},
    include: [{model: schemas.activities}]
  }).then(function(fac) {
      res.send(fac);
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

module.exports.getFacilityAddress = function(req, res) {
  let {query: {facility}} = req;
  schemas.facilities.findOne({
    where: {FacilityName: facility}
  })
  .then(function(fac) {
    fac.getFacilitiesAddress()
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

module.exports.getFacilityCampsites = function(req, res) {
  let {query: {facility}} = req;
  console.log("getting in here");
  schemas.facilities.findOne({
    where: {FacilityName: facility}
  })
  .then(function(fac) {
    console.log(fac);
    fac.getCampsites()
    .then(function(campsites) {
      console.log(campsites);
      res.send(campsites);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getFacilityPermitEntrances = function(req, res) {
  let {query: {facility}} = req;
  console.log("getting in here");
  schemas.facilities.findOne({
    where: {FacilityName: facility},
    include: [{model: schemas.permitEntrances}]
  })
  .then(function(fac) {
    res.send(fac);
  })
  .catch((err) => console.log('error', err));
};

module.exports.getTourMedia = function(req, res) {
  let {query: {tour}} = req;
  console.log("getting in here");
  schemas.tours.findOne({
    where: {TourName: tour}
  })
  .then(function(tour) {
    console.log(tour);
    tour.getEntityMedia()
    .then(function(media) {
      console.log(media);
      res.send(media);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getTourAttributes = function(req, res) {
  let {query: {tour}} = req;
  console.log("getting in here");
  schemas.tours.findOne({
    where: {TourName: tour}
  })
  .then(function(tour) {
    console.log(tour);
    tour.getAttributes()
    .then(function(attributes) {
      console.log(attributes);
      res.send(attributes);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getCampsitesEquipment = function(req, res) {
  let {query: {campsite}} = req;
  console.log("getting in here");
  schemas.campsites.findOne({
    where: {CampsiteName: campsite}
  })
  .then(function(camp) {
    console.log(camp);
    camp.getPermittedEquipment()
    .then(function(equipment) {
      console.log(equipment);
      res.send(equipment);
    });
  })
  .catch((err) => console.log('error', err));
};

module.exports.getActivities = function(req, res) {
  let {query: {activity}} = req;
  schemas.activities.findOne({
    where: {ActivityName: activity},
    include: [
      {model: schemas.recAreas}, 
      {model: schemas.facilities}
      ]
  }).then(function(activity) {
    console.log(activity);
    res.send(activity);
  })
  .catch((err) => console.log('error', err));
};

module.exports.getEntrances = function(req, res) {
  schemas.permitEntrances.findAll().then((entrance) => { res.send(entrance) });
};

module.exports.getEntitiesWithinRadius = (req, res) => {
  let {query: {latitude, longitude, distance, activities}} = req;
  db.query(`SELECT * FROM entityactivities LEFT JOIN recAreas ON recAreas.RecAreaID = entityactivities.EntityID LEFT JOIN facilities ON facilities.FacilityID = entityactivities.EntityID LEFT JOIN entityMedia ON entityactivities.EntityID = entityMedia.EntityID LEFT JOIN activities ON entityactivities.ActivityID = activities.ActivityID WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(recAreaLatitude)) + cos(RADIANS(${latitude})) * cos(RADIANS(recAreaLatitude)) * cos(RADIANS(recAreaLongitude - (${longitude})))) * 6371 <= ${distance} OR acos(sin(RADIANS(${latitude})) * sin(RADIANS(facilityLatitude)) + cos(RADIANS(${latitude})) * cos(RADIANS(facilityLatitude)) * cos(RADIANS(facilityLongitude - (${longitude})))) * 6371 <= ${distance}) AND ActivityName IN (${activities.slice(1, activities.length-1)}) LIMIT 10`, {type: db.QueryTypes.SELECT})
  .then(function(entities) {
          res.send(entities);
  })
  .catch((err) => console.log('error: ', err));
};

// module.exports.getEntitiesWithinRadius = (req, res) => {
//   let {query: {latitude, longitude, distance, activities}} = req;
//   northLat = geolib.computeDestinationPoint({latitude, longitude}, 1000*distance, 0).latitude;
//   southLat = geolib.computeDestinationPoint({latitude, longitude}, 1000*distance, 180).latitude;
//   eastLong = geolib.computeDestinationPoint({latitude, longitude}, 1000*distance, 90).longitude;
//   westLong = geolib.computeDestinationPoint({latitude, longitude}, 1000*distance, 270).longitude;
//   schemas.recAreas.findAll({
//     where: {
//       $and: {
//         RecAreaLongitude: { between: [westLong, eastLong] },
//         RecAreaLatitude: { between: [southLat, northLat] }
//       }
//     },
//     attributes: ['RecAreaID', 'RecAreaPhone', 'RecAreaDescription', 'RecAreaLatitude', 'RecAreaLongitude', 'RecAreaName'], 
//     include: [
//       {model: schemas.activities}, 
//       {model: schemas.entityMedia}
//       ]
//   }).then(function(recreationArea) {
//     res.send(recreationArea);
//   })
//   .catch((err) => console.log('error', err));
// };


// module.exports.getTrailsWithinRadius = (req, res) => {
//   let {query: {latitude, longitude}} = req;

//   db.query(`SELECT * FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 32, 10) AS DECIMAL(10, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 32, 10) AS DECIMAL(10, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 12, 10) AS DECIMAL(10, 8)) - (${longitude})))) * 6371 <= 1000)`, {type: db.QueryTypes.SELECT})
//   .then(function(entities) {
//           res.send(entities);
//   })
//   .catch((err) => console.log('error: ', err));
// };

module.exports.getTrailsWithinRadius = (req, res) => {
  let {query: {latitude, longitude}} = req;

  db.query(`SELECT * FROM trails WHERE TrailUSFSID = 538`, {type: db.QueryTypes.SELECT})
  .then(function(entities) {
          res.send(entities);
  })
  .catch((err) => console.log('error: ', err));
};

// module.exports.getEntitiesWithinRadius = (req, res) => {
//   let {query: {latitude, longitude, distance, activities}} = req;
//   northLat = geolib.computeDestinationPoint({latitude, longitude}, 1000*distance, 0).latitude;
//   southLat = geolib.computeDestinationPoint({latitude, longitude}, 1000*distance, 180).latitude;
//   eastLong = geolib.computeDestinationPoint({latitude, longitude}, 1000*distance, 90).longitude;
//   westLong = geolib.computeDestinationPoint({latitude, longitude}, 1000*distance, 270).longitude;
//   schemas.recAreas.findAll({
//     where: {
//       $and: {
//         RecAreaLongitude: { between: [westLong, eastLong] },
//         RecAreaLatitude: { between: [southLat, northLat] }
//       }
//     },
//     attributes: ['RecAreaID', 'RecAreaPhone', 'RecAreaDescription', 'RecAreaLatitude', 'RecAreaLongitude', 'RecAreaName'], 
//     include: [
//       {model: schemas.activities}, 
//       {model: schemas.entityMedia}
//       ]
//   }).then(function(recreationArea) {
//     res.send(recreationArea);
//   })
//   .catch((err) => console.log('error', err));
// };

