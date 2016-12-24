let request = require('request');
require('dotenv-safe').load();
let schemas = require('../database/schemas.js');
let recAreasJSON = require('../RIDBFullExport_v1/RecAreas_API_v1.json');
let activitiesJSON = require('../RIDBFullExport_v1/Activities_API_v1.json');
let orgEntitiesJSON = require('../RIDBFullExport_v1/OrgEntities_API_v1.json');
let entityActivitesJSON = require('../RIDBFullExport_v1/EntityActivities_API_v1.json');

// var organizationsCaching = function () {
//   let offset = 0;
//   let params = {offset: offset};

//   request({ 
//     url: 'https://ridb.recreation.gov/api/v1/organizations?apikey=' + process.env.RIDB_API_KEY,
//     qs: params }, function(err, resp, body) {
//     if (err) {
//       console.log('Error: ', err);
//       return;
//     }
//     let data = JSON.parse(body).RECDATA;
//     for (var i = 0; i < data.length; i++) {
//       schemas.organizations.create({
//         OrgID: data[i].OrgID,
//         OrgImageURL: data[i].OrgImageURL,
//         OrgURLText: data[i].OrgURLText,
//         OrgURLAddress: data[i].OrgURLAddress,
//         OrgType: data[i].OrgType,
//         OrgAbbrevName: data[i].OrgAbbrevName,
//         OrgName: data[i].OrgName,
//         OrgJurisdictionType: data[i].OrgJurisdictionType,
//         OrgParentID: data[i].OrgParentID,
//         LastUpdatedDate: data[i].LastUpdatedDate
//       }).catch((err) => {
//         console.log('Error creating organization: ', err);
//       });
//     }
//     return;
//   });
// };
   
// organizationsCaching();

var recAreasCaching = function () {
  const data = recAreasJSON.RECDATA;
  for (var i = 0; i < data.length; i++) {
    schemas.recAreas.create({
      OrgRecAreaID: data[i].OrgRecAreaID,
      GEOJSON: data[i].GEOJSON,
      LastUpdatedDate: data[i].LastUpdatedDate,
      RecAreaEmail: data[i].RecAreaEmail,
      RecAreaReservationURL: data[i].RecAreaReservationURL,
      RecAreaLongitude: data[i].RecAreaLongitude,
      RecAreaID: data[i].RecAreaID,
      RecAreaPhone: data[i].RecAreaPhone,
      RecAreaDescription: data[i].RecAreaDescription,
      RecAreaMapURL: data[i].RecAreaMapURL,
      RecAreaLatitude: data[i].RecAreaLatitude,
      StayLimit: data[i].StayLimit,
      RecAreaFeeDescription: data[i].RecAreaFeeDescription,
      RecAreaDirections: data[i].RecAreaDirections,
      Keywords: data[i].Keywords,
      RecAreaName: data[i].RecAreaName
    }).catch((err) => {
      console.log('Error creating recAreas: ', err);
    });
  }
  
};
   
// recAreasCaching();

var activitiesCaching = function () {
  const data = activitiesJSON.RECDATA;
  for (var i = 0; i < data.length; i++) {
    schemas.activities.create({
      ActivityParentID: data[i].ActivityParentID,
      ActivityLevel: data[i].ActivityLevel,
      ActivityName: data[i].ActivityName,
      ActivityID: data[i].ActivityID,
    }).catch((err) => {
      console.log('Error creating activities: ', err);
    });
  }
  
};
   
// activitiesCaching();

var orgEntitiesCaching = function () {
  const data = orgEntitiesJSON.RECDATA;
  schemas.orgEntities.bulkCreate(data).catch((err) => {
    console.log('Error creating orgEntities: ', err);
  });
};

// orgEntitiesCaching();
const data1 = entityActivitesJSON.RECDATA;
console.log(data1.length);
const set1 = data1.slice(0, 10000);
const set2 = data1.slice(10000, 20000);
const set3 = data1.slice(20000, 30000);
const set4 = data1.slice(30000, 40000);
const set5 = data1.slice(40000, 50000);
const set6 = data1.slice(50000, 60000);
const set7 = data1.slice(60000, 70000);
const set8 = data1.slice(70000, 80000);
const set9 = data1.slice(80000, 90000);
const set10 = data1.slice(90000, 100000);
const set11 = data1.slice(100000, 110000);
const set12 = data1.slice(110000);

var entityActivityCaching = function (set) {
  schemas.entityActivity.bulkCreate(set).catch((err) => {
    console.log('Error creating entityActivity: ', err);
  });
};

setTimeout(function() {
  return entityActivityCaching(set1);
}, 2000);
setTimeout(function() {
  return entityActivityCaching(set2);
}, 4000);
setTimeout(function() {
  return entityActivityCaching(set3);
}, 6000);
setTimeout(function() {
  return entityActivityCaching(set4);
}, 8000);
setTimeout(function() {
  return entityActivityCaching(set5);
}, 10000);
setTimeout(function() {
  return entityActivityCaching(set6);
}, 12000);
setTimeout(function() {
  return entityActivityCaching(set7);
}, 14000);
setTimeout(function() {
  return entityActivityCaching(set8);
}, 16000);
setTimeout(function() {
  return entityActivityCaching(set9);
}, 18000);
setTimeout(function() {
  return entityActivityCaching(set10);
}, 20000);
setTimeout(function() {
  return entityActivityCaching(set11);
}, 22000);
setTimeout(function() {
  return entityActivityCaching(set12);
}, 24000);




