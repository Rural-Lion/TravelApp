var Organizations = sequelize.define('organizations', {
  'OrgID': Sequelize.INTEGER,
  'OrgImageURL': Sequelize.STRING,
  'OrgURLText': Sequelize.STRING,
  'OrgURLAddress': Sequelize.STRING,
  'OrgType': Sequelize.STRING,
  'OrgAbbrevName': Sequelize.STRING,
  'OrgName': Sequelize.STRING,
  'OrgJurisdictionType': Sequelize.STRING,
  'OrgParentID': Sequelize.INTEGER,
  'LastUpdatedDate': Sequelize.STRING
});

var RecAreas = sequelize.define('recareas', {
  'OrgRecAreaID': Sequelize.INTEGER,
  'GEOJSON': Sequelize.STRING,
  'LastUpdatedDate': Sequelize.STRING,
  'RecAreaEmail': Sequelize.STRING,
  'RecAreaReservationURL': Sequelize.STRING,
  'RecAreaLongitude': Sequelize.INTEGER,
  'RecAreaID': Sequelize.INTEGER,
  'RecAreaPhone': Sequelize.STRING,
  'RecAreaDescription': Sequelize.STRING(1500),
  'RecAreaMapURL': Sequelize.STRING,
  'RecAreaLatitude': Sequelize.INTEGER,
  'StayLimit': Sequelize.STRING,
  'RecAreaFeeDescription': Sequelize.STRING,
  'RecAreaDirections': Sequelize.STRING,
  'Keywords': Sequelize.STRING,
  'RecAreaName': Sequelize.STRING
});