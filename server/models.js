let schemas = require('../database/schemas.js');
let db = require('../database/database.js');


module.exports.getEntitiesWithinRadiusModel = (latitude, longitude, distance, activities) => {
  return  db.query(`SELECT * FROM (SELECT facilities.FacilityLatitude, facilities.FacilityLongitude, facilities.FacilityName, facilities.FacilityPhone, facilities.FacilityDescription, facilities.FacilityEmail, recAreas.RecAreaName, recAreas.RecAreaLatitude, recAreas.RecAreaLongitude, recAreas.RecAreaPhone, recAreas.RecAreaDescription, recAreas.RecAreaEmail, entityMedia.URL, entityactivities.EntityID, entityactivities.EntityType, entityactivities.ActivityDescription FROM entityactivities LEFT JOIN recAreas ON recAreas.RecAreaID = entityactivities.EntityID LEFT JOIN facilities ON facilities.FacilityID = entityactivities.EntityID LEFT JOIN entityMedia ON entityactivities.EntityID = entityMedia.EntityID LEFT JOIN activities ON entityactivities.ActivityID = activities.ActivityID WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(recAreaLatitude)) + cos(RADIANS(${latitude})) * cos(RADIANS(recAreaLatitude)) * cos(RADIANS(recAreaLongitude - (${longitude})))) * 6371 <= ${distance} OR acos(sin(RADIANS(${latitude})) * sin(RADIANS(facilityLatitude)) + cos(RADIANS(${latitude})) * cos(RADIANS(facilityLatitude)) * cos(RADIANS(facilityLongitude - (${longitude})))) * 6371 <= ${distance}) AND ActivityName IN (${activities.slice(1, activities.length-1)})) AS matches GROUP BY matches.EntityID LIMIT 50`, {type: db.QueryTypes.SELECT});
};

module.exports.getRecAddressModel = (recAreaID) => {
  return schemas.recAreaAddress.findOne({
    where: {RecAreaID: recAreaID}
  })
  .then(({
    AddressStateCode, 
    City, 
    PostalCode, 
    RecAreaStreetAddress1, 
    RecAreaStreetAddress2, 
    RecAreaStreetAddress3
  }) => {
    return {
      State: AddressStateCode,
      City: City,
      PostalCode: PostalCode,
      Address: RecAreaStreetAddress1 + ' ' + RecAreaStreetAddress2 + ' ' + RecAreaStreetAddress3
    };
  });
};

module.exports.getFacilityAddressModel = (facilityID) => {
  return schemas.facilitiesAddress.findOne({
    where: {FacilityID: facilityID}
  })
  .then(({
    AddressStateCode, 
    City, 
    PostalCode, 
    FacilityStreetAddress1, 
    FacilityStreetAddress2, 
    FacilityStreetAddress3
  }) => {
    return {
      State: AddressStateCode,
      City: City,
      PostalCode: PostalCode,
      Address: FacilityStreetAddress1 + ' ' + FacilityStreetAddress2 + ' ' + FacilityStreetAddress3
    };
  });
};

module.exports.getRecActivitiesModel = (recAreaID) => {
  return schemas.recAreas.findOne({
    where: { RecAreaID: recAreaID },
    include: [{ model: schemas.activities }],
  });
}

module.exports.getFacilitiesActivitiesModel = (facilityID) => {
  return schemas.facilities.findOne({
    where: { FacilityID: facilityID },
    include: [{ model: schemas.activities }],
  });
}

module.exports.trailsAndActivitiesWithinRadiusOfFacilityModel = (latitude, longitude, facilityID) => {
  let listOfTrails;
  if (longitude <= -100) {
    return db.query(`SELECT trails.TrailCn AS id, trails.TrailName AS name, trails.GISMiles AS length, trails.GEOM AS coordinates FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, 12) AS DECIMAL(13, 8)) - (${longitude})))) * 6371 <= 70)`, {type: db.QueryTypes.SELECT})
    .then((trails) => {
      listOfTrails = trails;
      return module.exports.getFacilitiesActivitiesModel(facilityID);
    })
    .then(function(fac) {
      const facActivities = fac.dataValues.activities;
      let activityList = [];
      facActivities.forEach((activity) => {
        activityList.push(activity.dataValues.ActivityName);
      });
      let facilityInfo = {
        trails: listOfTrails,
        activities: activityList
      };
      return facilityInfo;
    })
  } else {
    return db.query(`SELECT trails.TrailCn AS id, trails.TrailName AS name, trails.GISMiles AS length, trails.GEOM AS coordinates FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, 11) AS DECIMAL(12, 8)) - (${longitude})))) * 6371 <= 70)`, {type: db.QueryTypes.SELECT})
    .then((trails) => {
      listOfTrails = trails;
      return module.exports.getFacilitiesActivitiesModel(facilityID);
    })
    .then(function(fac) {
      const facActivities = fac.dataValues.activities;
      let activityList = [];
      facActivities.forEach((activity) => {
        activityList.push(activity.dataValues.ActivityName);
      });
      let facilityInfo = {
        trails: listOfTrails,
        activities: activityList
      };
      return facilityInfo;
    })
  }
}


module.exports.getRecAreaModel = (recAreaID) => {
  return schemas.recAreas.findOne({
    where: {RecAreaID: recAreaID},
    include: [
      { model: schemas.recAreaAddress },
      { model: schemas.activities },
      { model: schemas.entityMedia },
    ],
  });
};

module.exports.getFacilityModel = (facilityID) => {
  return schemas.facilities.findOne({
    where: {FacilityID: facilityID},
    include: [
      { model: schemas.permitEntrances },
      { model: schemas.facilitiesAddress },
      { model: schemas.activities },
      { model: schemas.entityMedia },
      { model: schemas.campsites },
    ],
  });
};

module.exports.getActivitiesModel = (activity) => {
  return schemas.activities.findOne({
    where: { ActivityName: activity },
    include: [
      { model: schemas.recAreas },
      { model: schemas.facilities },
    ],
  });
}