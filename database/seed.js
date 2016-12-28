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

///// Section 2 - Importing all JSON files for caching /////
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
const recAreaFacilitiesJSON = require('../RIDBFullExport_v1/RecAreaFacilities_API_v1.json');
////////////////////////////////////////////////////////////////////

///// Section 3 - Creation of Datasets /////
const organizationsData = organizationsJSON.RECDATA;
const recAreasData = recAreasJSON.RECDATA;
const recAreasAdressesData = recAreasAdressesJSON.RECDATA;
const activitiesData = activitiesJSON.RECDATA;
const facilitiesData = facilitiesJSON.RECDATA;
const facilitiesAddressesData = facilitiesAddressesJSON.RECDATA;
const entityLinksData = entityLinksJSON.RECDATA;
const entityMediasData = entityMediasJSON.RECDATA;
const toursData = toursJSON.RECDATA;
const attributesData = attributesJSON.RECDATA;
const permitEntranceData = permitEntranceJSON.RECDATA;
const permittedEquipmentData = permittedEquipmentJSON.RECDATA;
const CampsitesData = CampsitesJSON.RECDATA;
const orgEntitiesData = orgEntitiesJSON.RECDATA;
const entityActivitesData = entityActivitesJSON.RECDATA;
const recAreaFacilitiesData = recAreaFacilitiesJSON.RECDATA;
//////////////////////////////////////////

/////  Section 4 - Helper functions  /////

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

///// Section 5 - Preparing datasets when large JSON files //////
const recAreasSet = makeSets(recAreasData, 10);
const entityActivitesSet = makeSets(entityActivitesData, 20);
const facilitiesSet = makeSets(facilitiesData, 10);
const entityLinksSet = makeSets(entityLinksData, 20);
const entityMediaSet = makeSets(entityMediasData, 20);
const attributesSet = makeSets(attributesData, 100);
const permitEntranceSet = makeSets(permitEntranceData, 5);
const permittedEquipmentSet = makeSets(permittedEquipmentData, 100);
const CampsitesSet = makeSets(CampsitesData, 20);
//////////////////////////////////////////////////////////////////////

///// Section 6 - Declarations of individual caching functions //////

//recAreas schema does not match the API schema hence, bulkCreate does not execute.
const recAreasCaching = (array) => {
  for (var i = 0; i < array.length; i++) {
    schemas.recAreas.create({
      OrgRecAreaID: array[i].OrgRecAreaID,
      LastUpdatedDate: array[i].LastUpdatedDate,
      RecAreaEmail: array[i].RecAreaEmail,
      RecAreaReservationURL: array[i].RecAreaReservationURL,
      RecAreaLongitude: array[i].RecAreaLongitude,
      RecAreaID: array[i].RecAreaID,
      RecAreaPhone: array[i].RecAreaPhone,
      RecAreaDescription: array[i].RecAreaDescription,
      RecAreaMapURL: array[i].RecAreaMapURL,
      RecAreaLatitude: array[i].RecAreaLatitude,
      StayLimit: array[i].StayLimit,
      RecAreaFeeDescription: array[i].RecAreaFeeDescription,
      RecAreaDirections: array[i].RecAreaDirections,
      Keywords: array[i].Keywords,
      RecAreaName: array[i].RecAreaName
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

//No JSON file available for trails so we are using the node Request module to query the API
const trailsCaching = () => {
  let offset = 0;
  let params = {offset: offset};
  while(offset < 27209) {
    request({ 
      url: 'https://ridb.recreation.gov/api/v1/trails/USFS/?apikey=' + process.env.RIDB_API_KEY,
      qs: params }, (err, resp, body) => {
      if (err) {
        console.log('Error: ', err);
        return;
      }
      let trailsData = JSON.parse(body).RECDATA;
      for (var i = 0; i < trailsData.length; i++) {
        schemas.trails.create({ 
          TypicalTreadWidth:  trailsData[i].TypicalTreadWidth,
          MinimumTrailWidth: trailsData[i].MinimumTrailWidth,
          TypicalTreadCrossSlope: trailsData[i].TypicalTreadCrossSlope,
          TerraMotorized: trailsData[i].TerraMotorized,
          AllowedSnowUse: trailsData[i].AllowedSnowUse,
          PackSaddleRestricted: trailsData[i].PackSaddleRestricted,
          TrailSurface: trailsData[i].TrailSurface,
          TrailNo: trailsData[i].TrailNo,
          AllowedTerraUse: trailsData[i].AllowedTerraUse,
          XcountrySkiAccptDisc: trailsData[i].XcountrySkiAccptDisc,
          TrailUSFSID: trailsData[i].TrailUSFSID,
          NonmotorWatercraftManaged: trailsData[i].NonmotorWatercraftManaged,
          XcountrySkiManaged: trailsData[i].XcountrySkiManaged,
          BicycleManaged: trailsData[i].BicycleManaged,
          ShapeLength: trailsData[i].ShapeLength,
          MVUMSymbol: trailsData[i].MVUMSymbol,
          MotorcycleManaged: trailsData[i].MotorcycleManaged,
          GEOM: trailsData[i].GEOM,
          TrailName: trailsData[i].TrailName,
          NonmotorWatercraftAccptDisc: trailsData[i].NonmotorWatercraftAccptDisc,
          MotorcycleAccptDisc: trailsData[i].MotorcycleAccptDisc,
          SegmentLength: trailsData[i].SegmentLength,
          MotorcycleRestricted: trailsData[i].MotorcycleRestricted,
          SnowmobileManaged: trailsData[i].SnowmobileManaged,
          EMP: trailsData[i].EMP,
          MotorWatercraftManaged: trailsData[i].MotorWatercraftManaged,
          PackSaddleManaged: trailsData[i].PackSaddleManaged,
          ATVAccptDisc: trailsData[i].ATVAccptDisc,
          SnowshoeAccptDisc: trailsData[i].SnowshoeAccptDisc,
          SurfaceFirmness: trailsData[i].SurfaceFirmness,
          SnowshoeRestricted: trailsData[i].SnowshoeRestricted,
          SnowmobileRestricted: trailsData[i].SnowmobileRestricted,
          Attributesubset: trailsData[i].Attributesubset,
          SpecialMgmtArea: trailsData[i].SpecialMgmtArea,
          FourwdAccptDisc: trailsData[i].FourwdAccptDisc,
          MotorWatercraftRestricted: trailsData[i].MotorWatercraftRestricted,
          NonmotorWatercraftRestricted: trailsData[i].NonmotorWatercraftRestricted,
          HikerPedestrianAccptDisc: trailsData[i].HikerPedestrianAccptDisc,
          ATVManaged: trailsData[i].ATVManaged,
          TrailType: trailsData[i].TrailType,
          BicycleRestricted: trailsData[i].BicycleRestricted,
          GISMiles: trailsData[i].GISMiles,
          AdminOrg: trailsData[i].AdminOrg,
          HikerPedestrianRestricted: trailsData[i].HikerPedestrianRestricted,
          SecurityId: trailsData[i].SecurityId,
          AccessibilityStatus: trailsData[i].AccessibilityStatus,
          BMP: trailsData[i].BMP,
          HikerPedestrianManaged: trailsData[i].HikerPedestrianManaged,
          FourwdRestricted: trailsData[i].FourwdRestricted,
          TypicalTrailGrade: trailsData[i].TypicalTrailGrade,
          WaterMotorized: trailsData[i].WaterMotorized,
          ATVRestricted: trailsData[i].ATVRestricted,
          SnowmobileAccptDisc: trailsData[i].SnowmobileAccptDisc,
          SnowshoeManaged: trailsData[i].SnowshoeManaged,
          XcountrySkiRestricted: trailsData[i].XcountrySkiRestricted,
          TrailClass: trailsData[i].TrailClass,
          TerraBaseSymbology: trailsData[i].TerraBaseSymbology,
          ManagingOrg: trailsData[i].ManagingOrg,
          FourwdManaged: trailsData[i].FourwdManaged,
          LastUpdatedDate: trailsData[i].LastUpdatedDate,
          NationalTrailDesignation: trailsData[i].NationalTrailDesignation,
          MotorWatercraftAccptDisc: trailsData[i].MotorWatercraftAccptDisc,
          BicycleAccptDisc: trailsData[i].BicycleAccptDisc,
          SnowMotorized:trailsData[i].SnowMotorized,
          PackSaddleAccptDisc: trailsData[i].PackSaddleAccptDisc,
          TrailCn: trailsData[i].TrailCn
        }).catch((err) => {
          console.log('Error creating trails: ', err);
        });
      }
      return;
    });
    offset += 50;
  }
}
////////////////////////////////////////////////////////////////////////////////////

////// Section 7 - Calls of  functions to cache in DB /////

///// Part 1 - caching functions//////
// caching(organizationsData, schemas.organizations);
// caching(recAreasAdressesData, schemas.recAreaAddress);
// caching(activitiesData, schemas.activities);
// caching(facilitiesAddressesData, schemas.facilitiesAddress);
// delayCall(entityLinksSet, caching, 0, schemas.entityLinks);
// delayCall(entityMediaSet, caching, 0, schemas.entityMedia);
// caching(toursData, schemas.tours);
// delayCall(attributesSet, caching, 0, schemas.attributes);
// delayCall(permitEntranceSet, caching, 0, schemas.permitEntrance);
// delayCall(permittedEquipmentSet, caching, 0, schemas.permittedEquipment);
// delayCall(CampsitesSet, caching, 0, schemas.campsites);
// caching(orgEntitiesData, schemas.orgEntities);
// delayCall(entityActivitesSet, caching, 0, schemas.entityActivity);
// caching(recAreaFacilitiesData, schemas.recAreasFacilities);
//////////////////////////////////////


///// Part 2 - Individual caching functions //////
// delayCall(recAreasSet, recAreasCaching, 0);
// delayCall(facilitiesSet, facilitiesCaching, 0);
// trailsCaching();
//////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

// EntityLinks 41638/46306
// EntityMedia 14645/16715
// Attributes (not sure)
// PermittedEquipment 537946/???
// Campsites 100906/101013
// 

