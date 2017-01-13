let schemas = require('../database/schemas.js');
let db = require('../database/database.js');

/////////////////////////////////////////////////
////// HELPER FUNCTIONS //////
////////////////////////////////////////////////

// Helper function for trailsAndActivitiesWithinRadiusOfFacilityModel
const findTrails = (latitude, longitude, geom2, decimal1) => {
  return db.query(`SELECT trails.TrailCn AS id, trails.TrailName AS name, trails.GISMiles AS length, trails.GEOM AS coordinates FROM trails WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) + cos(RADIANS(${latitude})) * cos(RADIANS(CAST(SUBSTRING(GEOM, 33, 10) AS DECIMAL(11, 8)))) * cos(RADIANS(CAST(SUBSTRING(GEOM, 13, ${geom2}) AS DECIMAL(${decimal1}, 8)) - (${longitude})))) * 6371 <= 70)`, {type: db.QueryTypes.SELECT});
}

// Helper function for trailsAndActivitiesWithinRadiusOfFacilityModel
const entityInfo = (entity, trails) => {
  const entityActivities = entity.dataValues.activities;
      let activityList = [];
      entityActivities.forEach((activity) => {
        activityList.push(activity.dataValues.ActivityName);
      });
      const entityInfo = {
        trails: trails,
        activities: activityList
      };
      return entityInfo;
}

////////////////////////////////////////////////

//////////////////////////////////////////////////////////
////// MODELS USED IN THE APP //////
//////////////////////////////////////////////////////////

// Get Entites within a given radius - Model
module.exports.getEntitiesWithinRadiusModel = (latitude, longitude, distance, activities) => {
  console.log(activities);
  return  db.query(`SELECT * FROM (SELECT facilities.FacilityLatitude, facilities.FacilityLongitude, facilities.FacilityName, facilities.FacilityPhone, facilities.FacilityDescription, facilities.FacilityEmail, recAreas.RecAreaName, recAreas.RecAreaLatitude, recAreas.RecAreaLongitude, recAreas.RecAreaPhone, recAreas.RecAreaDescription, recAreas.RecAreaEmail, entityMedia.URL, entityactivities.EntityID, entityactivities.EntityType, entityactivities.ActivityDescription FROM entityactivities LEFT JOIN recAreas ON recAreas.RecAreaID = entityactivities.EntityID LEFT JOIN facilities ON facilities.FacilityID = entityactivities.EntityID LEFT JOIN entityMedia ON entityactivities.EntityID = entityMedia.EntityID LEFT JOIN activities ON entityactivities.ActivityID = activities.ActivityID WHERE (acos(sin(RADIANS(${latitude})) * sin(RADIANS(recAreaLatitude)) + cos(RADIANS(${latitude})) * cos(RADIANS(recAreaLatitude)) * cos(RADIANS(recAreaLongitude - (${longitude})))) * 6371 <= ${distance} OR acos(sin(RADIANS(${latitude})) * sin(RADIANS(facilityLatitude)) + cos(RADIANS(${latitude})) * cos(RADIANS(facilityLatitude)) * cos(RADIANS(facilityLongitude - (${longitude})))) * 6371 <= ${distance}) AND ActivityName IN (${activities.slice(1, activities.length-1)})) AS matches GROUP BY matches.EntityID LIMIT 50`, {type: db.QueryTypes.SELECT});
};

// Get Address for a RecArea - Model
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

// Get Address for a Facility - Model
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

// Get Activities for a RecArea - Model
module.exports.getRecActivitiesModel = (recAreaID) => {
  return schemas.recAreas.findOne({
    where: { RecAreaID: recAreaID },
    include: [{ model: schemas.activities }],
  });
}

 // Get Activities for a Facility - Model
module.exports.getFacilitiesActivitiesModel = (facilityID) => {
  return schemas.facilities.findOne({
    where: { FacilityID: facilityID },
    include: [{ model: schemas.activities }],
  });
}

// Get Trails within a radius and the activity list of a specific Facility - Model
module.exports.trailsAndActivitiesWithinRadiusOfFacilityModel = (latitude, longitude, facilityID) => {
  let listOfTrails;
  if (longitude <= -100) {
    return findTrails(latitude, longitude, 12, 13)
    .then((trails) => {
      listOfTrails = trails;
      return module.exports.getFacilitiesActivitiesModel(facilityID);
    })
    .then((facilityActivities) => {
      return entityInfo(facilityActivities, listOfTrails);
    })
  } else {
    return findTrails(latitude, longitude, 11, 12)
    .then((trails) => {
      listOfTrails = trails;
      return module.exports.getFacilitiesActivitiesModel(facilityID);
    })
    .then((facilityActivities) => {
      return entityInfo(facilityActivities, listOfTrails);
    })
  }
}

// Get Trails within a radius and the activity list of a specific RecArea - Model
module.exports.trailsAndActivitiesWithinRadiusOfRecAreasModel = (latitude, longitude, recAreaID) => {
  let listOfTrails;
  if (longitude <= -100) {
    return findTrails(latitude, longitude, 12, 13)
    .then((trails) => {
      listOfTrails = trails;
      return module.exports.getRecActivitiesModel(recAreaID);
    })
    .then((recAreaActivities) => {
      return entityInfo(recAreaActivities, listOfTrails);
    })
    .catch((err) => console.log('error: ', err));
  } else {
    return findTrails(latitude, longitude, 11, 12)
    .then((trails) => {
      listOfTrails = trails;
      return module.exports.getRecActivitiesModel(recAreaID);
    })
    .then((recAreaActivities) => {
      return entityInfo(recAreaActivities, listOfTrails);
    })
  }
}

//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
////// MODELS FOR TESTING PURPOSES //////
///////////////////////////////////////////////////////////////////////

 // Get RecAreas Info - Model
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

 // Get Facilities Info - Model
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

// Get list of all activities - Model
module.exports.getActivitiesModel = (activity) => {
  return schemas.activities.findOne({
    where: { ActivityName: activity },
    include: [
      { model: schemas.recAreas },
      { model: schemas.facilities },
    ],
  });
}

///////////////////////////////////////////////////////////////////////
