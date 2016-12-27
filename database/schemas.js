let Sequelize = require('sequelize');
let db = require('./database.js');

const Organizations = db.define('organizations', {
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

Organizations.sync().then(() => {
  console.log('Organizations created successfully');
});

const RecAreas = db.define('recAreas', {
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

RecAreas.sync().then(() => {
  console.log('RecAreas created successfully');
});


const RecAreaAddress = db.define('recAreaAddress', {
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

RecAreaAddress.sync().then(() => {
  console.log('RecAreaAddress created successfully');
});

const Activities = db.define('activities', {
  ActivityParentID: Sequelize.INTEGER,
  ActivityLevel: Sequelize.INTEGER,
  ActivityName: Sequelize.STRING(60),
  ActivityID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  }
});

Activities.sync().then(() => {
  console.log('Activities created successfully');
});


const Facilities = db.define('facilities', {
  FacilityDescription: Sequelize.STRING(4000),
  FacilityEmail: Sequelize.STRING(60),
  FacilityLatitude: Sequelize.DECIMAL(10, 6),
  FacilityUseFeeDescription: Sequelize.STRING,
  LegacyFacilityID: Sequelize.STRING(20),
  OrgFacilityID: Sequelize.STRING,
  FacilityMapURL: Sequelize.STRING,
  FacilityName: Sequelize.STRING,
  LastUpdatedDate: Sequelize.STRING,
  FacilityTypeDescription: Sequelize.STRING(1024),
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

Facilities.sync().then(() => {
  console.log('Facilities created successfully');
});

const FacilitiesAddress = db.define('facilitiesAddress', {
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

FacilitiesAddress.sync().then(() => {
  console.log('FacilitiesAddress created successfully');
});

const EntityLinks = db.define('entityLinks', {
  EntityID: Sequelize.INTEGER,
  Description: Sequelize.STRING(1500),
  LinkType: Sequelize.STRING(500),
  Title: Sequelize.STRING(500),
  EntityType: Sequelize.STRING(50),
  URL: Sequelize.STRING(2000)
});

EntityLinks.sync().then(() => {
  console.log('EntityLinks created successfully');
});

const EntityMedia = db.define('entityMedia', {
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
  EntityMediaID: Sequelize.INTEGER,
  Description: Sequelize.STRING(1500),
  Title: Sequelize.STRING(500)
});

EntityMedia.sync().then(() => {
  console.log('EntityMedia created successfully');
});

const Tours = db.define('tours', {
  TourName: Sequelize.STRING,
  CreatedDate: Sequelize.STRING,
  TourDescription: Sequelize.STRING(1024),
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

Tours.sync().then(() => {
  console.log('Tours created successfully');
});

const Attributes = db.define('attributes', {
  AttributeID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  AttributeName: Sequelize.STRING(60),
  AttributeValue: Sequelize.STRING
});

Attributes.sync().then(() => {
  console.log('Attributes created successfully');
});

const PermitEntrance = db.define('permitentrance', {
  PermitEntranceDescription: Sequelize.STRING(1024),
  Longitude: Sequelize.DECIMAL(10, 5),
  PermitEntranceType: Sequelize.STRING,
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

PermitEntrance.sync().then(() => {
  console.log('PermitEntrance created successfully');
});

const PermittedEquipment = db.define('permittedEquipment', {
  EquipmentName: Sequelize.STRING,
  MaxLength: Sequelize.INTEGER
});

PermittedEquipment.sync().then(() => {
  console.log('PermittedEquipment created successfully');
});

const Campsites = db.define('campsites', {
  CampsiteID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  CreatedDate: Sequelize.STRING,
  Loop: Sequelize.STRING,
  FacilityID: Sequelize.INTEGER,
  CampsiteName: Sequelize.STRING,
  CampsiteAccessible: Sequelize.STRING(10),
  CampsiteType: Sequelize.STRING,
  TypeOfUse: Sequelize.STRING,
  LastUpdatedDate: Sequelize.STRING
});

Campsites.sync().then(() => {
  console.log('Campsites created successfully');
});

const Trails = db.define('trails', {
  TypicalTreadWidth: Sequelize.STRING(30),
  MinimumTrailWidth: Sequelize.STRING(15),
  TypicalTreadCrossSlope: Sequelize.STRING(10),
  TerraMotorized: Sequelize.STRING(3),
  AllowedSnowUse: Sequelize.STRING(3),
  PackSaddleRestricted: Sequelize.STRING(11),
  TrailSurface: Sequelize.STRING(40),
  TrailNo: Sequelize.STRING(30),
  AllowedTerraUse: Sequelize.STRING(6),
  XcountrySkiAccptDisc: Sequelize.STRING(100),
  TrailUSFSID: Sequelize.INTEGER,
  NonmotorWatercraftManaged: Sequelize.STRING(100),
  XcountrySkiManaged: Sequelize.STRING(100),
  BicycleManaged: Sequelize.STRING(100),
  ShapeLength: Sequelize.FLOAT(8),
  MVUMSymbol: Sequelize.INTEGER(4),
  MotorcycleManaged: Sequelize.STRING(100),
  GEOM: Sequelize.TEXT,
  TrailName: Sequelize.STRING(30),
  NonmotorWatercraftAccptDisc: Sequelize.STRING(100),
  MotorcycleAccptDisc: Sequelize.STRING(100),
  SegmentLength: Sequelize.FLOAT(8),
  MotorcycleRestricted: Sequelize.STRING(11),
  SnowmobileManaged: Sequelize.STRING(100),
  EMP: Sequelize.FLOAT(8),
  MotorWatercraftManaged: Sequelize.STRING(100),
  PackSaddleManaged: Sequelize.STRING(100),
  ATVAccptDisc: Sequelize.STRING(100),
  SnowshoeAccptDisc: Sequelize.STRING(100),
  SurfaceFirmness: Sequelize.STRING(20),
  SnowshoeRestricted: Sequelize.STRING(11),
  SnowmobileRestricted: Sequelize.STRING(11),
  Attributesubset: Sequelize.STRING(50),
  SpecialMgmtArea: Sequelize.STRING(50),
  FourwdAccptDisc: Sequelize.STRING(100),
  MotorWatercraftRestricted: Sequelize.STRING(11),
  NonmotorWatercraftRestricted: Sequelize.STRING(11),
  HikerPedestrianAccptDisc: Sequelize.STRING(100),
  ATVManaged: Sequelize.STRING(100),
  TrailType: Sequelize.STRING(5),
  BicycleRestricted: Sequelize.STRING(11),
  GISMiles: Sequelize.FLOAT(8),
  AdminOrg: Sequelize.STRING(10),
  HikerPedestrianRestricted: Sequelize.STRING(11),
  SecurityId: Sequelize.STRING(4),
  AccessibilityStatus: Sequelize.STRING(40),
  BMP: Sequelize.FLOAT(8),
  HikerPedestrianManaged: Sequelize.STRING(100),
  FourwdRestricted: Sequelize.STRING(11),
  TypicalTrailGrade: Sequelize.STRING(20),
  WaterMotorized: Sequelize.STRING(3),
  ATVRestricted: Sequelize.STRING(11),
  SnowmobileAccptDisc: Sequelize.STRING(100),
  SnowshoeManaged: Sequelize.STRING(100),
  XcountrySkiRestricted: Sequelize.STRING(11),
  TrailClass: Sequelize.STRING(1),
  TerraBaseSymbology: Sequelize.STRING(5),
  ManagingOrg: Sequelize.STRING(10),
  FourwdManaged: Sequelize.STRING(100),
  LastUpdatedDate: Sequelize.DATE(3),
  NationalTrailDesignation: Sequelize.INTEGER(4),
  MotorWatercraftAccptDisc: Sequelize.STRING(100),
  BicycleAccptDisc: Sequelize.STRING(100),
  SnowMotorized: Sequelize.STRING(3),
  PackSaddleAccptDisc: Sequelize.STRING(100),
  TrailCn: Sequelize.STRING(34)
})

Trails.sync().then(() => {
  console.log('Trails created successfully');
});

//////////////////////////// Join Tables ////////////////////////////////
const OrgEntity = db.define('orgentity', {
  EntityID: Sequelize.INTEGER,
  EntityType: Sequelize.STRING(20),
  OrgID: Sequelize.INTEGER,
});

OrgEntity.sync().then(() => {
  console.log('OrgEntity created successfully');
});

const EntityActivity = db.define('entityactivity', {
  EntityID: Sequelize.INTEGER,
  EntityType: Sequelize.STRING(1024),
  ActivityID: Sequelize.INTEGER,
  ActivityDescription: Sequelize.STRING(1024),
  ActivityFeeDescription: Sequelize.STRING(1024)
});

EntityActivity.sync().then(() => {
  console.log('EntityActivity created successfully');
});

const RecAreasFacilities = db.define('recareasfacilities', {
  RecAreaID: Sequelize.INTEGER,
  FacilityID: Sequelize.INTEGER
});

RecAreasFacilities.sync().then(() => {
  console.log('RecAreasFacilities created successfully');
});
////////////////////////////////////////////////////////////////////////////////

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
  entityActivity: EntityActivity,
  recAreasFacilities: RecAreasFacilities,
  trails: Trails
};

// Sequelize Relationships

Organizations.belongsToMany(RecAreas, { through: 'orgEntities' }); 
RecAreas.belongsToMany(Organizations, { through: 'orgEntities', foreignKey: 'EntityID' });
Organizations.belongsToMany(Facilities, { through: 'orgEntities' });
Facilities.belongsToMany(Organizations, { through: 'orgEntities', foreignKey: 'EntityID' });

RecAreas.hasOne(RecAreaAddress);
RecAreaAddress.belongsTo(RecAreas);
// EntityActivity is a junction table linking Activities to both recAreas and Facilities
RecAreas.belongsToMany(Activities, { through: 'EntityActivity', foreignKey: 'EntityID' }); 
Activities.belongsToMany(RecAreas, { through: 'EntityActivity' }); 
RecAreas.hasMany(EntityLinks);
EntityLinks.belongsTo(RecAreas);
RecAreas.hasMany(EntityMedia);
EntityMedia.belongsTo(RecAreas);

Facilities.hasOne(FacilitiesAddress);
FacilitiesAddress.belongsTo(Facilities);
Facilities.belongsToMany(Activities, { through: 'EntityActivity', foreignKey: 'EntityID' }); 
Activities.belongsToMany(Facilities, { through: 'EntityActivity' });
Facilities.hasMany(EntityLinks); 
EntityLinks.belongsTo(Facilities);
Facilities.hasMany(EntityMedia); 
EntityMedia.belongsTo(Facilities);
Facilities.hasMany(Tours);
Tours.belongsTo(Facilities);
Facilities.hasMany(Campsites);
Campsites.belongsTo(Facilities);
Facilities.hasMany(PermitEntrance);
PermitEntrance.belongsTo(Facilities);

Tours.hasMany(EntityMedia);
EntityMedia.belongsTo(Tours);
Tours.hasMany(Attributes);
// Attributes Table defines attributes for each tour, permit entrance and campsite
Attributes.belongsTo(Tours, { foreignKey: 'EntityID' }); 

PermitEntrance.hasMany(EntityMedia);
EntityMedia.belongsTo(PermitEntrance);
PermitEntrance.hasMany(Attributes);
Attributes.belongsTo(PermitEntrance, { foreignKey: 'EntityID' }); 

Campsites.hasMany(EntityMedia);
EntityMedia.belongsTo(Campsites);
Campsites.hasMany(Attributes);
Attributes.belongsTo(Campsites, { foreignKey: 'EntityID' }); 
Campsites.hasMany(PermittedEquipment);
// Permitted Equipment Table defines equipment for each campsite - similar to the Attributes Table
PermittedEquipment.belongsTo(Campsites); 

// Still need to incorporate Trails
// Still need to link Facilities to RecAreas via RecAreaFacility (can test later)

<<<<<<< 3965575bd7ee33733474ad5d812e7eaa13e21a49
//Also need to incorporate Trails
=======
>>>>>>> DATABASE-BE:Finish schema relationships-RS

