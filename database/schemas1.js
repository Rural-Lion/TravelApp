var Organizations = sequelize.define('organizations', {
  OrgID: Sequelize.INTEGER,
  OrgImageURL: Sequelize.STRING,
  OrgURLText: Sequelize.STRING,
  OrgURLAddress: Sequelize.STRING,
  OrgType: Sequelize.STRING,
  OrgAbbrevName: Sequelize.STRING,
  OrgName: Sequelize.STRING,
  OrgJurisdictionType: Sequelize.STRING,
  OrgParentID: Sequelize.INTEGER,
  LastUpdatedDate: Sequelize.STRING
});

var RecAreas = sequelize.define('recAreas', {
  OrgRecAreaID: Sequelize.INTEGER,
  GEOJSON: Sequelize.STRING,
  LastUpdatedDate: Sequelize.STRING,
  RecAreaEmail: Sequelize.STRING,
  RecAreaReservationURL: Sequelize.STRING,
  RecAreaLongitude: Sequelize.INTEGER,
  RecAreaID: Sequelize.INTEGER,
  RecAreaPhone: Sequelize.STRING,
  RecAreaDescription: Sequelize.STRING(1500),
  RecAreaMapURL: Sequelize.STRING,
  RecAreaLatitude: Sequelize.INTEGER,
  StayLimit: Sequelize.STRING,
  RecAreaFeeDescription: Sequelize.STRING,
  RecAreaDirections: Sequelize.STRING,
  Keywords: Sequelize.STRING,
  RecAreaName: Sequelize.STRING
});

var RecAreaAddress = sequilize.define('recAreaAddress', {
  PostalCode: Sequelize.INTEGER,
  RecAreaAddressID: Sequelize.INTEGER,
  City: Sequelize.STRING,
  RecAreaID: Sequelize.INTEGER,
  RecAreaAddressType: Sequelize.STRING,
  AddressCountryCode: Sequelize.STRING,
  RecAreaStreetAddress2: Sequelize.STRING,
  RecAreaStreetAddress3: Sequelize.STRING,
  LastUpdatedDate: Sequelize.STRING,
  RecAreaStreetAddress1: Sequelize.STRING,
  AddressStateCode: Sequelize.STRING
});

var Activities = sequelize.define('activities', {
  ActivityParentID: Sequelize.INTEGER,
  ActivityLevel: Sequelize.INTEGER,
  ActivityName: Sequelize.STRING,
  ActivityID: Sequelize.INTEGER
});


var Facilities = sequelize.define('facilities', {
  FacilityDescription: Sequelize.STRING,
  FacilityEmail: Sequelize.STRING,
  FacilityLatitude: Sequelize.INTEGER,
  FacilityUseFeeDescription: Sequelize.STRING,
  LegacyFacilityID: Sequelize.STRING,
  OrgFacilityID: Sequelize.STRING,
  FacilityMapURL: Sequelize.STRING,
  FacilityName: Sequelize.STRING,
  GEOJSON: Sequelize.STRING,
  LastUpdatedDate: Sequelize.STRING,
  FacilityTypeDescription: Sequelize.STRING,
  FacilityAdaAccess: Sequelize.STRING,
  FacilityDirections: Sequelize.STRING,
  FacilityID: Sequelize.INTEGER,
  FacilityReservationURL: Sequelize.STRING,
  StayLimit: Sequelize.STRING,
  FacilityLongitude: Sequelize.INTEGER,
  FacilityPhone: Sequelize.STRING,
  Keywords: Sequelize.STRING
});

var FacilitiesAddress = sequelize.define('facilitiesAddress', {
  PostalCode: Sequelize.INTEGER,
  FacilityAddressType: Sequelize.STRING,
  City: Sequelize.STRING,
  FacilityID: Sequelize.INTEGER,
  FacilityStreetAddress3: Sequelize.STRING,
  FacilityStreetAddress2: Sequelize.STRING,
  FacilityAddressID: Sequelize.INTEGER,
  FacilityStreetAddress1: Sequelize.STRING,
  AddressCountryCode: Sequelize.STRING,
  AddressStateCode: Sequelize.STRING
});

var EntityLinks = sequelize.define('entityLinks', {
  EntityID: Sequelize.INTEGER,
  Description: Sequelize.STRING,
  LinkType: Sequelize.STRING,
  Title: Sequelize.STRING,
  EntityLinkID: Sequelize.INTEGER,
  EntityType: Sequelize.STRING,
  URL: Sequelize.STRING
});

var EntityMedia = sequelize.define('entityMedia', {
  MediaID: Sequelize.INTEGER,
  Credits: Sequelize.STRING,
  EntityID: Sequelize.INTEGER,
  MediaType: Sequelize.STRING,
  EmbedCode: Sequelize.STRING,
  Width: Sequelize.INTEGER,
  Height: Sequelize.INTEGER,
  Subtitle: Sequelize.STRING,
  EntityType: Sequelize.STRING,
  URL: Sequelize.STRING,
  EntityMediaID: Sequelize.INTEGER,
  Description: Sequelize.STRING,
  Title: Sequelize.STRING
});

var Tours = sequelize.define('tours', {
  TourName: Sequelize.STRING,
  CreatedDate: Sequelize.STRING,
  TourDescription: Sequelize.STRING,
  TourType: Sequelize.STRING,
  FacilityID: Sequelize.INTEGER,
  TourDuration: Sequelize.INTEGER,
  TourID: Sequelize.INTEGER,
  TourAccessible: false,
  LastUpdatedDate: Sequelize.STRING
});

var Attributes = sequelize.define('attributes', {
  AttributeID: Sequelize.INTEGER,
  AttributeName: Sequelize.STRING,
  AttributeValue: Sequelize.STRING
});

var PermitEntrance = sequelize.define('permitentrance', {
  PermitEntranceDescription: Sequelize.STRING,
  Longitude: Sequelize.INTEGER,
  PermitEntranceType: Sequelize.STRING,
  GEOJSON: Sequelize.STRING,
  LastUpdatedDate: Sequelize.STRING,
  PermitEntranceID: Sequelize.INTEGER,
  District: Sequelize.STRING,
  CreatedDate: Sequelize.STRING,
  Town: Sequelize.STRING,
  FacilityID: Sequelize.INTEGER,
  PermitEntranceName: Sequelize.STRING,
  Latitude: Sequelize.INTEGER,
  PermitEntranceAccessible: Sequelize.BOOLEAN,
});

var PermittedEquipment = sequelize.define('permittedEquipment', {
  PermittedEquipmentID: Sequelize.INTEGER,
  EquipmentName: Sequelize.STRING,
  MaxLength: Sequelize.INTEGER
});

var Campsites = sequelize.define('campsites', {
  CampsiteID: Sequelize.INTEGER,
  CreatedDate: Sequelize.DATE,
  Loop: Sequelize.STRING,
  FacilityID: Sequelize.INTEGER,
  CampsiteName: Sequelize.INTEGER,
  CampsiteAccessible: Sequelize.BOOLEAN,
  CampsiteType: Sequelize.INTEGER,
  TypeOfUse: Sequelize.STRING,
  LastUpdatedDate: Sequelize.DATE
});