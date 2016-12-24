let Sequelize = require('sequelize');
let db = require('./database.js');

var Organizations = db.define('organizations', {
  OrgID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  OrgImageURL: Sequelize.STRING,
  OrgURLText: Sequelize.STRING,
  OrgURLAddress: Sequelize.STRING,
  OrgType: Sequelize.STRING(40),
  OrgAbbrevName: Sequelize.STRING(20),
  OrgName: Sequelize.STRING(60),
  OrgJurisdictionType: Sequelize.STRING(20),
  OrgParentID: Sequelize.INTEGER,
  LastUpdatedDate: Sequelize.STRING
});

Organizations.sync().then(function() {
  console.log('Organizations created successfully');
});

var RecAreas = db.define('recAreas', {
  OrgRecAreaID: Sequelize.STRING,
  // GEOJSON: Sequelize.STRING,
  LastUpdatedDate: Sequelize.STRING,
  RecAreaEmail: Sequelize.STRING,
  RecAreaReservationURL: Sequelize.STRING,
  RecAreaLongitude: Sequelize.DECIMAL(10, 5),
  RecAreaID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  RecAreaPhone: Sequelize.STRING,
  RecAreaDescription: Sequelize.STRING(1500),
  RecAreaMapURL: Sequelize.STRING,
  RecAreaLatitude: Sequelize.DECIMAL(10, 5),
  StayLimit: Sequelize.STRING,
  RecAreaFeeDescription: Sequelize.STRING(1500),
  RecAreaDirections: Sequelize.STRING(1500),
  Keywords: Sequelize.STRING(4000),
  RecAreaName: Sequelize.STRING
});

RecAreas.sync().then(function() {
  console.log('RecAreas created successfully');
});


var RecAreaAddress = db.define('recAreaAddress', {
  PostalCode: Sequelize.STRING(20),
  RecAreaAddressID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  City: Sequelize.STRING(60),
  RecAreaID: Sequelize.INTEGER,
  RecAreaAddressType: Sequelize.STRING(20),
  AddressCountryCode: Sequelize.STRING(5),
  RecAreaStreetAddress2: Sequelize.STRING,
  RecAreaStreetAddress3: Sequelize.STRING,
  LastUpdatedDate: Sequelize.STRING,
  RecAreaStreetAddress1: Sequelize.STRING,
  AddressStateCode: Sequelize.STRING(20)
});

RecAreaAddress.sync().then(function() {
  console.log('RecAreaAddress created successfully');
});

var Activities = db.define('activities', {
  ActivityParentID: Sequelize.INTEGER,
  ActivityLevel: Sequelize.INTEGER,
  ActivityName: Sequelize.STRING(60),
  ActivityID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  }
});

Activities.sync().then(function() {
  console.log('Activities created successfully');
});


var Facilities = db.define('facilities', {
  FacilityDescription: Sequelize.STRING(1500),
  FacilityEmail: Sequelize.STRING(60),
  FacilityLatitude: Sequelize.DECIMAL(10, 5),
  FacilityUseFeeDescription: Sequelize.STRING,
  LegacyFacilityID: Sequelize.STRING(20),
  OrgFacilityID: Sequelize.STRING,
  FacilityMapURL: Sequelize.STRING,
  FacilityName: Sequelize.STRING,
  GEOJSON: Sequelize.STRING,
  LastUpdatedDate: Sequelize.STRING,
  FacilityTypeDescription: Sequelize.STRING(1024),
  FacilityAdaAccess: Sequelize.STRING(1024),
  FacilityDirections: Sequelize.STRING(1500),
  FacilityID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  FacilityReservationURL: Sequelize.STRING,
  StayLimit: Sequelize.STRING(500),
  FacilityLongitude: Sequelize.DECIMAL(10, 5),
  FacilityPhone: Sequelize.STRING,
  Keywords: Sequelize.STRING(4000)
});

Facilities.sync().then(function() {
  console.log('Facilities created successfully');
});

var FacilitiesAddress = db.define('facilitiesAddress', {
  PostalCode: Sequelize.STRING(20),
  FacilityAddressType: Sequelize.STRING(20),
  City: Sequelize.STRING(60),
  FacilityID: Sequelize.INTEGER,
  FacilityStreetAddress3: Sequelize.STRING,
  FacilityStreetAddress2: Sequelize.STRING,
  FacilityAddressID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  FacilityStreetAddress1: Sequelize.STRING,
  AddressCountryCode: Sequelize.STRING(5),
  AddressStateCode: Sequelize.STRING(20)
});

FacilitiesAddress.sync().then(function() {
  console.log('FacilitiesAddress created successfully');
});

var EntityLinks = db.define('entityLinks', {
  EntityID: Sequelize.INTEGER,
  Description: Sequelize.STRING(1500),
  LinkType: Sequelize.STRING(500),
  Title: Sequelize.STRING(500),
  EntityLinkID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  EntityType: Sequelize.STRING(50),
  URL: Sequelize.STRING(2000)
});

EntityLinks.sync().then(function() {
  console.log('EntityLinks created successfully');
});

var EntityMedia = db.define('entityMedia', {
  MediaID: Sequelize.INTEGER,
  Credits: Sequelize.STRING(1000),
  EntityID: Sequelize.INTEGER,
  MediaType: Sequelize.STRING(500),
  EmbedCode: Sequelize.STRING(1500),
  Width: Sequelize.INTEGER,
  Height: Sequelize.INTEGER,
  Subtitle: Sequelize.STRING(1000),
  EntityType: Sequelize.STRING(50),
  URL: Sequelize.STRING(2000),
  EntityMediaID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  Description: Sequelize.STRING(1500),
  Title: Sequelize.STRING(500)
});

EntityMedia.sync().then(function() {
  console.log('EntityMedia created successfully');
});

var Tours = db.define('tours', {
  TourName: Sequelize.STRING,
  CreatedDate: Sequelize.STRING,
  TourDescription: Sequelize.STRING,
  TourType: Sequelize.STRING,
  FacilityID: Sequelize.INTEGER,
  TourDuration: Sequelize.INTEGER,
  TourID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  TourAccessible: Sequelize.STRING(10),
  LastUpdatedDate: Sequelize.STRING
});

Tours.sync().then(function() {
  console.log('Tours created successfully');
});

var Attributes = db.define('attributes', {
  AttributeID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  AttributeName: Sequelize.STRING(60),
  AttributeValue: Sequelize.STRING
});

Attributes.sync().then(function() {
  console.log('Attributes created successfully');
});

var PermitEntrance = db.define('permitentrance', {
  PermitEntranceDescription: Sequelize.STRING,
  Longitude: Sequelize.DECIMAL(10, 5),
  PermitEntranceType: Sequelize.STRING,
  GEOJSON: Sequelize.STRING,
  LastUpdatedDate: Sequelize.STRING,
  PermitEntranceID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  District: Sequelize.STRING(60),
  CreatedDate: Sequelize.STRING,
  Town: Sequelize.STRING(60),
  FacilityID: Sequelize.INTEGER,
  PermitEntranceName: Sequelize.STRING(512),
  Latitude: Sequelize.DECIMAL(10, 5),
  PermitEntranceAccessible: Sequelize.STRING(10),
});

PermitEntrance.sync().then(function() {
  console.log('PermitEntrance created successfully');
});

var PermittedEquipment = db.define('permittedEquipment', {
  PermittedEquipmentID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  EquipmentName: Sequelize.STRING,
  MaxLength: Sequelize.INTEGER
});

PermittedEquipment.sync().then(function() {
  console.log('PermittedEquipment created successfully');
});

var Campsites = db.define('campsites', {
  CampsiteID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  CreatedDate: Sequelize.DATE,
  Loop: Sequelize.STRING,
  FacilityID: Sequelize.INTEGER,
  CampsiteName: Sequelize.INTEGER,
  CampsiteAccessible: Sequelize.STRING(10),
  CampsiteType: Sequelize.INTEGER,
  TypeOfUse: Sequelize.STRING,
  LastUpdatedDate: Sequelize.DATE
});

Campsites.sync().then(function() {
  console.log('Campsites created successfully');
});

//JOIN TABLES

var OrgEntity = db.define('orgentity', {
  EntityID: Sequelize.INTEGER,
  EntityType: Sequelize.STRING(20),
  OrgID: Sequelize.INTEGER,
});

OrgEntity.sync().then(function() {
  console.log('OrgEntity created successfully');
});

var EntityActivity = db.define('entityactivity', {
  EntityID: Sequelize.INTEGER,
  EntityType: Sequelize.STRING(1024),
  ActivityID: Sequelize.INTEGER,
  ActivityDescription: Sequelize.STRING(1024),
  ActivityFeeDescription: Sequelize.STRING(1024)
});

EntityActivity.sync().then(function() {
  console.log('EntityActivity created successfully');
});


module.exports = {
  organizations: Organizations,
  recAreas: RecAreas,
  recAreaAddress: RecAreaAddress,
  activities: Activities,
  facilities: Facilities,
  facilitiesAddress: FacilitiesAddress,
  entityLinks: EntityLinks,
  entityMedia: EntityMedia,
  tours: Tours,
  attributes: Attributes,
  permitEntrance: PermitEntrance,
  permittedEquipment: PermittedEquipment,
  campsites: Campsites,
  orgEntities: OrgEntity,
  entityActivity: EntityActivity
};