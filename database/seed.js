//// Section 1 - HOW TO USE THE SEED FILE ////

// 1- Complete 'TO START APP' section in the README.md file
// 2- Create an account: https://ridb.recreation.gov/index.cfm?action=login
// 3- Download the 'JSON Format' from the 'RIDB Recreation Data' section
// 4- Copy/Paste the downloaded 'RIDBFullExport_v1' folder in the App Root folder
// 5- Uncomment the first function invocation in the 'Section 7 - Calls of  functions to cache in DB'  at the bottom of this file -  caching(organizationsData, schemas.organizations) -
// 6- From the root folder, run 'node database/seed.js'
// 7- Comment out the same first function - caching(organizationsData, schemas.organizations) -
// 8- Confirm that caching was successful with MySql WorkBench
// 9- Repeat steps 5 to 8 for every function invocation in the parts 1 & 2 of the  'Section 7 - Calls of  functions to cache in DB' at the bottom of this file

///////////////////////////////////////////////////////////////

let request = require('request');
require('dotenv-safe').load();
let schemas = require('../database/schemas.js');
let db = require('../database/database.js');
const client = require('../database/database-redis.js');


// ///// Section 2 - Importing all JSON files for caching /////
// const organizationsJSON = require('../RIDBFullExport_v1/Organizations_API_v1.json');
// const recAreasJSON = require('../RIDBFullExport_v1/RecAreas_API_v1.json');
// const recAreasAdressesJSON = require('../RIDBFullExport_v1/RecAreaAddresses_API_v1');
// const activitiesJSON = require('../RIDBFullExport_v1/Activities_API_v1.json');
// const facilitiesJSON = require('../RIDBFullExport_v1/Facilities_API_v1.json');
// const facilitiesAddressesJSON = require('../RIDBFullExport_v1/FacilityAddresses_API_v1.json');
// const entityLinksJSON = require('../RIDBFullExport_v1/Links_API_v1.json');
// const entityMediasJSON = require('../RIDBFullExport_v1/Media_API_v1.json');
// const toursJSON = require('../RIDBFullExport_v1/Tours_API_v1.json');
// const attributesJSON = require('../RIDBFullExport_v1/Attributes_API_v1.json');
// const permitEntranceJSON = require('../RIDBFullExport_v1/PermitEntrances_API_v1.json');
// const permittedEquipmentJSON = require('../RIDBFullExport_v1/PermittedEquipment_API_v1.json');
// const CampsitesJSON = require('../RIDBFullExport_v1/Campsites_API_v1.json');
// const orgEntitiesJSON = require('../RIDBFullExport_v1/OrgEntities_API_v1.json');
// const entityActivitesJSON = require('../RIDBFullExport_v1/EntityActivities_API_v1.json');
// const recAreaFacilitiesJSON = require('../RIDBFullExport_v1/RecAreaFacilities_API_v1.json');
// ////////////////////////////////////////////////////////////////////

// ///// Section 3 - Creation of Datasets /////
// const organizationsData = organizationsJSON.RECDATA;
// const recAreasData = recAreasJSON.RECDATA;
// const recAreasAdressesData = recAreasAdressesJSON.RECDATA;
// const activitiesData = activitiesJSON.RECDATA;
// const facilitiesData = facilitiesJSON.RECDATA;
// const facilitiesAddressesData = facilitiesAddressesJSON.RECDATA;
// const entityLinksData = entityLinksJSON.RECDATA;
// const entityMediasData = entityMediasJSON.RECDATA;
// const toursData = toursJSON.RECDATA;
// const attributesData = attributesJSON.RECDATA;
// const permitEntranceData = permitEntranceJSON.RECDATA;
// const permittedEquipmentData = permittedEquipmentJSON.RECDATA;
// const CampsitesData = CampsitesJSON.RECDATA;
// const orgEntitiesData = orgEntitiesJSON.RECDATA;
// const entityActivitesData = entityActivitesJSON.RECDATA;
// const recAreaFacilitiesData = recAreaFacilitiesJSON.RECDATA;
// //////////////////////////////////////////

// /////  Section 4 - Helper functions  /////

// //makeSets will help us divide the datasets when too large
// const makeSets = (array, divider) => {
//   let partsLeft = divider;
//   let numberOfItems = array.length / divider;
//   let subsets = [];
//   while (partsLeft > 0) {
//     let subarray = array.slice(numberOfItems * (divider - partsLeft), numberOfItems * (divider - partsLeft + 1));
//     subsets.push(subarray);
//     partsLeft--;
//   }
//   return subsets;
// };

// //delayCall will help us invoke the caching function on the various sub-datasets at different times
// const delayCall = (array, func, index, schema) => {
//   setTimeout(() => {
//     func(array[index], schema);
//     if (index < array.length - 1) {
//       delayCall(array, func, (index + 1), schema);
//     } else {
//       return;
//     }
//   }, 3000);
// };

// //caching will insert the datasets/sub-datasets in our schemas
// const caching = function(data, schema) {
//   schema.bulkCreate(data).catch((err) => {
//     console.log('Error creating organization: ', err);
//   });
// };
// ////////////////////////////////////////

// ///// Section 5 - Preparing datasets when large JSON files //////
// const recAreasSet = makeSets(recAreasData, 10);
// const entityActivitesSet = makeSets(entityActivitesData, 20);
// const facilitiesSet = makeSets(facilitiesData, 10);
// const entityLinksSet = makeSets(entityLinksData, 20);
// const entityMediaSet = makeSets(entityMediasData, 20);
// const attributesSet = makeSets(attributesData, 100);
// const permitEntranceSet = makeSets(permitEntranceData, 5);
// const permittedEquipmentSet = makeSets(permittedEquipmentData, 100);
// const CampsitesSet = makeSets(CampsitesData, 20);
// //////////////////////////////////////////////////////////////////////

// ///// Section 6 - Declarations of individual caching functions //////

// //recAreas schema does not match the API schema hence, bulkCreate does not execute.
// const recAreasCaching = (array) => {
//   for (var i = 0; i < array.length; i++) {
//     schemas.recAreas.create({
//       OrgRecAreaID: array[i].OrgRecAreaID,
//       LastUpdatedDate: array[i].LastUpdatedDate,
//       RecAreaEmail: array[i].RecAreaEmail,
//       RecAreaReservationURL: array[i].RecAreaReservationURL,
//       RecAreaLongitude: array[i].RecAreaLongitude,
//       RecAreaID: array[i].RecAreaID,
//       RecAreaPhone: array[i].RecAreaPhone,
//       RecAreaDescription: array[i].RecAreaDescription,
//       RecAreaMapURL: array[i].RecAreaMapURL,
//       RecAreaLatitude: array[i].RecAreaLatitude,
//       StayLimit: array[i].StayLimit,
//       RecAreaFeeDescription: array[i].RecAreaFeeDescription,
//       RecAreaDirections: array[i].RecAreaDirections,
//       Keywords: array[i].Keywords,
//       RecAreaName: array[i].RecAreaName
//     }).catch((err) => {
//       console.log('Error creating recAreas: ', err);
//     });
//   }
// };

// //facilities schema does not match the API schema hence, bulkCreate does not execute.
// const facilitiesCaching = (array) => {
//   for (var i = 0; i < array.length; i++) {
//     schemas.facilities.create({
//       FacilityDescription: array[i].FacilityDescription,
//       FacilityEmail: array[i].FacilityEmail,
//       FacilityLatitude: array[i].FacilityLatitude,
//       FacilityUseFeeDescription: array[i].FacilityUseFeeDescription,
//       LegacyFacilityID: array[i].LegacyFacilityID,
//       OrgFacilityID: array[i].OrgFacilityID,
//       FacilityMapURL: array[i].FacilityMapURL,
//       FacilityName: array[i].FacilityName,
//       GEOJSON: array[i].GEOJSON,
//       LastUpdatedDate: array[i].LastUpdatedDate,
//       FacilityTypeDescription: array[i].FacilityTypeDescription,
//       FacilityAdaAccess: array[i].FacilityAdaAccess,
//       FacilityDirections: array[i].FacilityDirections,
//       FacilityID: array[i].FacilityID,
//       FacilityReservationURL: array[i].FacilityReservationURL,
//       StayLimit: array[i].StayLimit,
//       FacilityLongitude: array[i].FacilityLongitude,
//       FacilityPhone: array[i].FacilityPhone,
//       Keywords: array[i].Keywords
//     }).catch((err) => {
//       console.log('Error creating facilities: ', err);
//     });
//   }
// };

// //No JSON file available for trails so we are using the node Request module to query the API
// let offset = 0;
// const trailsCaching = () => {
//   setTimeout(function() {
//     if (offset < 27209) {
//       let params = {offset: offset};
//       request({ 
//         url: 'https://ridb.recreation.gov/api/v1/trails/USFS/?apikey=' + process.env.RIDB_API_KEY,
//         qs: params }, (err, resp, body) => {
//         if (err) {
//           console.log('Error: ', err);
//           return;
//         }
//         let trailsData = JSON.parse(body).RECDATA;
//         for (var i = 0; i < trailsData.length; i++) {
//           schemas.trails.create({ 
//             TrailNo: trailsData[i].TrailNo,
//             TrailUSFSID: trailsData[i].TrailUSFSID,
//             ShapeLength: trailsData[i].ShapeLength,
//             MVUMSymbol: trailsData[i].MVUMSymbol,
//             GEOM: trailsData[i].GEOM,
//             TrailName: trailsData[i].TrailName,
//             SegmentLength: trailsData[i].SegmentLength,
//             EMP: trailsData[i].EMP,
//             Attributesubset: trailsData[i].Attributesubset,
//             TrailType: trailsData[i].TrailType,
//             GISMiles: trailsData[i].GISMiles,
//             AdminOrg: trailsData[i].AdminOrg,
//             SecurityId: trailsData[i].SecurityId,
//             BMP: trailsData[i].BMP,
//             TrailClass: trailsData[i].TrailClass,
//             TerraBaseSymbology: trailsData[i].TerraBaseSymbology,
//             ManagingOrg: trailsData[i].ManagingOrg,
//             LastUpdatedDate: trailsData[i].LastUpdatedDate,
//             NationalTrailDesignation: trailsData[i].NationalTrailDesignation,
//             TrailCn: trailsData[i].TrailCn
//           }).catch((err) => {
//             console.log('Error creating trails: ', err);
//           });
//         }
//         return;
//       });
//       offset += 50;
//       trailsCaching();
//     } else {
//       return;
//     }
//   }, 25000);
// }
// ////////////////////////////////////////////////////////////////////////////////////

// ////// Section 7 - Calls of  functions to cache in DB /////

// ///// Part 1 - caching functions//////
// // caching(organizationsData, schemas.organizations);
// // caching(recAreasAdressesData, schemas.recAreaAddress);
// // caching(activitiesData, schemas.activities);
// // caching(facilitiesAddressesData, schemas.facilitiesAddress);
// // delayCall(entityLinksSet, caching, 0, schemas.entityLinks);
// // delayCall(entityMediaSet, caching, 0, schemas.entityMedia);
// // caching(toursData, schemas.tours);
// // delayCall(attributesSet, caching, 0, schemas.attributes);
// // delayCall(permitEntranceSet, caching, 0, schemas.permitEntrance);
// // delayCall(permittedEquipmentSet, caching, 0, schemas.permittedEquipment);
// // delayCall(CampsitesSet, caching, 0, schemas.campsites);
// // caching(orgEntitiesData, schemas.orgEntities);
// // delayCall(entityActivitesSet, caching, 0, schemas.entityActivity);
// // caching(recAreaFacilitiesData, schemas.recAreasFacilities);
// //////////////////////////////////////


// ///// Part 2 - Individual caching functions //////
// // delayCall(recAreasSet, recAreasCaching, 0);
// // delayCall(facilitiesSet, facilitiesCaching, 0);
// // trailsCaching();
// //////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////
////////////         REDIS SEEDING         ////////////////
///////////////////////////////////////////////////////////////////////


const trailsForFacilities = () => {
  let ids = [];
  let facilitiesShort = [];
  schemas.facilities.findAll()
  .then((facilities) => {
    facilitiesShort = facilities.slice(50, 51);
    facilitiesShort.forEach((facility) => {
      db.query(`SELECT * FROM trails WHERE (acos(sin(RADIANS(${facility.FacilityLatitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${facility.FacilityLatitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, 12) AS DECIMAL(13, 8)) - (${facility.FacilityLongitude})))) * 6371 <= 50) LIMIT 1`, {type: db.QueryTypes.SELECT})
      .then((trails) => {
        console.log('facility.ID: ', facility.FacilityID);
        console.log('Trails: ', trails);
        schemas.facilities.findOne({
          where: {FacilityID: facility.FacilityID},
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
          client.set(facility.FacilityID, JSON.stringify(facilityInfo));
        })
        .catch((err) => console.log('error', err));
      })
      .catch((err) => console.log('error: ', err));
    });
  })
  .catch((err) => console.log('error: ', err));
};


trailsForFacilities();
// client.get(202087, function(err, res) {
//   console.log('response: ', JSON.parse(res));
// });

// client.flushdb( function (err, succeeded) {
//     console.log(succeeded); // will be OK if successfull
// });
