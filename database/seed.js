let request = require('request');
require('dotenv-safe').load();
let schemas = require('../database/schemas.js');

//Importing all JSON files for caching
let organizationsJSON = require('../RIDBFullExport_v1/Organizations_API_v1.json');
let recAreasJSON = require('../RIDBFullExport_v1/RecAreas_API_v1.json');
let recAreasAdressesJSON = require('../RIDBFullExport_v1/RecAreaAddresses_API_v1');
let activitiesJSON = require('../RIDBFullExport_v1/Activities_API_v1.json');
let orgEntitiesJSON = require('../RIDBFullExport_v1/OrgEntities_API_v1.json');
let entityActivitesJSON = require('../RIDBFullExport_v1/EntityActivities_API_v1.json');
let attributesJSON = require('../RIDBFullExport_v1/Attributes_API_v1.json');

///// Creation of Datasets /////
const organizationsdata = organizationsJSON.RECDATA;
const recAreasdata = recAreasJSON.RECDATA;
const recAreasAdresses = recAreasAdressesJSON.RECDATA;
const activitiesdata = activitiesJSON.RECDATA;
const orgEntitiesdata = orgEntitiesJSON.RECDATA;
const entityActivites = entityActivitesJSON.RECDATA;
///////////////////////

/////  Helper functions  /////
const makeSets = function(array, divider) {
  let partsLeft = divider;
  let numberOfItems = array.length / divider;
  let subsets = [];
  while (partsLeft > 0) {
    let subarray = array.slice(numberOfItems * (divider - partsLeft), numberOfItems * (divider - partsLeft + 1));
    subsets.push(subarray);
    partsLeft--;
  }
  return subsets;
};

const delayCall = function(array, func, index, schema) {
  const delay = index * 2000;
  setTimeout(function() {
    func(array[index], schema);
    if (index < array.length - 1) {
      delayCall(array, func, (index + 1), schema);
    } else {
      return;
    }
  }, delay);
};

const caching = function(data, schema) {
  schema.bulkCreate(data).then(function() {
  }).catch((err) => {
    console.log('Error creating organization: ', err);
  });
};
////////////////////////////////////////

///// Preparing datasets when large JSON files //////
const entityActivitesSet = makeSets(entityActivites, 20);

///////////////////////////////////////////////////////////////////

///// Declarations of individual caching functions //////

//recAreas schema does not match the API schema hence, bulkCreate does not execute.
var recAreasCaching = function () {
  for (var i = 0; i < recAreasdata.length; i++) {
    schemas.recAreas.create({
      OrgRecAreaID: recAreasdata[i].OrgRecAreaID,
      GEOJSON: recAreasdata[i].GEOJSON,
      LastUpdatedDate: recAreasdata[i].LastUpdatedDate,
      RecAreaEmail: recAreasdata[i].RecAreaEmail,
      RecAreaReservationURL: recAreasdata[i].RecAreaReservationURL,
      RecAreaLongitude: recAreasdata[i].RecAreaLongitude,
      RecAreaID: recAreasdata[i].RecAreaID,
      RecAreaPhone: recAreasdata[i].RecAreaPhone,
      RecAreaDescription: recAreasdata[i].RecAreaDescription,
      RecAreaMapURL: recAreasdata[i].RecAreaMapURL,
      RecAreaLatitude: recAreasdata[i].RecAreaLatitude,
      StayLimit: recAreasdata[i].StayLimit,
      RecAreaFeeDescription: recAreasdata[i].RecAreaFeeDescription,
      RecAreaDirections: recAreasdata[i].RecAreaDirections,
      Keywords: recAreasdata[i].Keywords,
      RecAreaName: recAreasdata[i].RecAreaName
    }).catch((err) => {
      console.log('Error creating recAreas: ', err);
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////


////// Calls of  functions to cache in DB /////

/////caching functions//////
// caching(organizationsdata, schemas.organizations);
caching(recAreasAdresses, schemas.recAreaAddress);
// caching(activitiesdata, schemas.activities);
// caching(orgEntitiesdata, schemas.orgEntities);
// delayCall(entityActivitesSet, caching, 0, schemas.entityActivity);
/////////////////////////////////////


///// Individual caching functions //////
// recAreasCaching();
//////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
