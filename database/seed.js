let request = require('request');
require('dotenv-safe').load();
let schemas = require('../database/schemas.js');

///// Importing all JSON files for caching /////
const organizationsJSON = require('../RIDBFullExport_v1/Organizations_API_v1.json');
const recAreasJSON = require('../RIDBFullExport_v1/RecAreas_API_v1.json');
const recAreasAdressesJSON = require('../RIDBFullExport_v1/RecAreaAddresses_API_v1');
const activitiesJSON = require('../RIDBFullExport_v1/Activities_API_v1.json');
const facilitiesJSON = require('../RIDBFullExport_v1/Facilities_API_v1.json');
const facilitiesAddressesJSON = require('../RIDBFullExport_v1/FacilityAddresses_API_v1.json');
const entityLinksJSON = require('../RIDBFullExport_v1/Links_API_v1.json');
const entityMediasJSON = require('../RIDBFullExport_v1/Media_API_v1.json');
const toursJSON = require('../RIDBFullExport_v1/Tours_API_v1.json');
const attributesJSON = require('../RIDBFullExport_v1/Attributes_API_v1.json');
const permitEntranceJSON = require('../RIDBFullExport_v1/PermitEntrances_API_v1.json');
const permittedEquipmentJSON = require('../RIDBFullExport_v1/PermittedEquipment_API_v1.json');
const CampsitesJSON = require('../RIDBFullExport_v1/Campsites_API_v1.json');
const orgEntitiesJSON = require('../RIDBFullExport_v1/OrgEntities_API_v1.json');
const entityActivitesJSON = require('../RIDBFullExport_v1/EntityActivities_API_v1.json');
////////////////////////////////////////////////////////////////////

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
const permitEntrancedata = permitEntranceJSON.RECDATA;
const permittedEquipmentdata = permittedEquipmentJSON.RECDATA;
const Campsitesdata = CampsitesJSON.RECDATA;
const orgEntitiesdata = orgEntitiesJSON.RECDATA;
const entityActivitesdata = entityActivitesJSON.RECDATA;
//////////////////////////////////////////

/////  Helper functions  /////

//makeSets will help us divide the datasets when too large
const makeSets = (array, divider) => {
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

//delayCall will help us invoke the caching function on the various sub-datasets at different times
const delayCall = (array, func, index, schema) => {
  setTimeout(() => {
    func(array[index], schema);
    if (index < array.length - 1) {
      delayCall(array, func, (index + 1), schema);
    } else {
      return;
    }
  }, 1000);
};

//caching will insert the datasets/sub-datasets in our schemas
const caching = function(data, schema) {
  schema.bulkCreate(data).catch((err) => {
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
const permitEntranceSet = makeSets(permitEntrancedata, 5);
const permittedEquipmentSet = makeSets(permittedEquipmentdata, 100);
const CampsitesSet = makeSets(Campsitesdata, 20);
//////////////////////////////////////////////////////////////////////

///// Declarations of individual caching functions //////

//recAreas schema does not match the API schema hence, bulkCreate does not execute.
const recAreasCaching = () => {
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
const facilitiesCaching = (array) => {
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
// delayCall(attributesSet, caching, 0, schemas.attributes);
// delayCall(permitEntranceSet, caching, 0, schemas.permitEntrance);
delayCall(permittedEquipmentSet, caching, 0, schemas.permittedEquipment);
// delayCall(CampsitesSet, caching, 0, schemas.campsites);
// caching(orgEntitiesdata, schemas.orgEntities);
// delayCall(entityActivitesSet, caching, 0, schemas.entityActivity);
//////////////////////////////////////


///// Individual caching functions //////
// recAreasCaching();
// delayCall(facilitiesSet, facilitiesCaching, 0);
//////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
