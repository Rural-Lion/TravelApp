let request = require('request');
require('dotenv-safe').load();
let schemas = require('../database/schemas.js');

//Importing all JSON files for caching
let organizationsJSON = require('../RIDBFullExport_v1/Organizations_API_v1.json');
let recAreasJSON = require('../RIDBFullExport_v1/RecAreas_API_v1.json');
let recAreasAdressesJSON = require('../RIDBFullExport_v1/RecAreaAddresses_API_v1');
let activitiesJSON = require('../RIDBFullExport_v1/Activities_API_v1.json');
let facilitiesJSON = require('../RIDBFullExport_v1/Facilities_API_v1.json');
let facilitiesAddressesJSON = require('../RIDBFullExport_v1/FacilityAddresses_API_v1.json');
let entityLinksJSON = require('../RIDBFullExport_v1/Links_API_v1.json');
let entityMediasJSON = require('../RIDBFullExport_v1/Media_API_v1.json');
let toursJSON = require('../RIDBFullExport_v1/Tours_API_v1.json');
let attributesJSON = require('../RIDBFullExport_v1/Attributes_API_v1.json');
let orgEntitiesJSON = require('../RIDBFullExport_v1/OrgEntities_API_v1.json');
let entityActivitesJSON = require('../RIDBFullExport_v1/EntityActivities_API_v1.json');

///// Creation of Datasets /////
const organizationsdata = organizationsJSON.RECDATA;
const recAreasdata = recAreasJSON.RECDATA;
const recAreasAdressesdata = recAreasAdressesJSON.RECDATA;
const activitiesdata = activitiesJSON.RECDATA;
const facilitiesdata = facilitiesJSON.RECDATA;
const facilitiesAddressesdata = facilitiesAddressesJSON.RECDATA;
const entityLinksdata = entityLinksJSON.RECDATA;
const entityMediasdata = entityMediasJSON.RECDATA;
const toursdata = toursJSON.RECDATA;
const attributesdata = attributesJSON.RECDATA;
const orgEntitiesdata = orgEntitiesJSON.RECDATA;
const entityActivitesdata = entityActivitesJSON.RECDATA;
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
  setTimeout(function() {
    func(array[index], schema);
    if (index < array.length - 1) {
      delayCall(array, func, (index + 1), schema);
    } else {
      return;
    }
  }, 2000);
};

const caching = function(data, schema) {
  schema.bulkCreate(data).then(function() {
  }).catch((err) => {
    console.log('Error creating organization: ', err);
  });
};
////////////////////////////////////////

///// Preparing datasets when large JSON files //////
const entityActivitesSet = makeSets(entityActivitesdata, 20);
const facilitiesSet = makeSets(facilitiesdata, 10);
const entityLinksSet = makeSets(entityLinksdata, 20);
const entityMediaSet = makeSets(entityMediasdata, 20);
const attributesSet = makeSets(attributesdata, 100);
///////////////////////////////////////////////////////////////////

///// Declarations of individual caching functions //////

//recAreas schema does not match the API schema hence, bulkCreate does not execute.
const recAreasCaching = function () {
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

//facilities schema does not match the API schema hence, bulkCreate does not execute.
const facilitiesCaching = function (array) {
  for (var i = 0; i < array.length; i++) {
    schemas.facilities.create({
      FacilityDescription: array[i].FacilityDescription,
      FacilityEmail: array[i].FacilityEmail,
      FacilityLatitude: array[i].FacilityLatitude,
      FacilityUseFeeDescription: array[i].FacilityUseFeeDescription,
      LegacyFacilityID: array[i].LegacyFacilityID,
      OrgFacilityID: array[i].OrgFacilityID,
      FacilityMapURL: array[i].FacilityMapURL,
      FacilityName: array[i].FacilityName,
      GEOJSON: array[i].GEOJSON,
      LastUpdatedDate: array[i].LastUpdatedDate,
      FacilityTypeDescription: array[i].FacilityTypeDescription,
      FacilityAdaAccess: array[i].FacilityAdaAccess,
      FacilityDirections: array[i].FacilityDirections,
      FacilityID: array[i].FacilityID,
      FacilityReservationURL: array[i].FacilityReservationURL,
      StayLimit: array[i].StayLimit,
      FacilityLongitude: array[i].FacilityLongitude,
      FacilityPhone: array[i].FacilityPhone,
      Keywords: array[i].Keywords
    }).catch((err) => {
      console.log('Error creating facilities: ', err);
    });
  }
};


////////////////////////////////////////////////////////////////////////////////////


////// Calls of  functions to cache in DB /////

/////caching functions//////
// caching(organizationsdata, schemas.organizations);
// caching(recAreasAdressesdata, schemas.recAreaAddress);
// caching(activitiesdata, schemas.activities);
// caching(facilitiesAddressesdata, schemas.facilitiesAddress);
// delayCall(entityLinksSet, caching, 0, schemas.entityLinks);
// delayCall(entityMediaSet, caching, 0, schemas.entityMedia);
// caching(toursdata, schemas.tours);
delayCall(attributesSet, caching, 0, schemas.attributes);
// caching(orgEntitiesdata, schemas.orgEntities);
// delayCall(entityActivitesSet, caching, 0, schemas.entityActivity);
/////////////////////////////////////


///// Individual caching functions //////
// recAreasCaching();
// delayCall(facilitiesSet, facilitiesCaching, 0);
//////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
