let request = require('request');
require('dotenv-safe').load();
let schemas = require('../database/schemas.js');
let recAreasJSON = require('../RIDBFullExport_v1/RecAreas_API_v1.json');
let activitiesJSON = require('../RIDBFullExport_v1/Activities_API_v1.json');
let orgEntitiesJSON = require('../RIDBFullExport_v1/OrgEntities_API_v1.json');


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
  for (var i = 0; i < data.length; i++) {
    // console.log('data: ', data[i].EntityID);
    schemas.orgEntities.create({
      EntityID: data[i].EntityID,
      EntityType: data[i].EntityType,
      OrgID: data[i].OrgID,
    }).catch((err) => {
      console.log('Error creating activities: ', err);
    });
  }
  
};

orgEntitiesCaching();

