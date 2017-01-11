let schemas = require('../database/schemas.js');


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