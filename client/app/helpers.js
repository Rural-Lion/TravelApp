import React, { PropTypes } from 'react';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
// function for creating objects from the results of api request to the US website
const generateData = res => res.map(({
  FacilityLatitude,
  FacilityLongitude,
  FacilityName,
  FacilityPhone,
  FacilityDescription,
  FacilityEmail,
  URL,
  EntityID,
  RecAreaLatitude,
  RecAreaLongitude,
  RecAreaName,
  RecAreaPhone,
  RecAreaDescription,
  RecAreaEmail,
}) => ({
  name: FacilityName || RecAreaName,
  image: URL,
  email: FacilityEmail || RecAreaEmail,
  phoneNumber: FacilityPhone || RecAreaPhone,
  description: FacilityDescription || RecAreaDescription,
  coordinates: FacilityLatitude ? [+FacilityLatitude, +FacilityLongitude] : [+RecAreaLatitude, +RecAreaLongitude],
  facility: !!FacilityName,
  recArea: !!RecAreaName,
  entityID: EntityID,
}));

const generateDetailedEntity = (entity, entityAddress, { activities, trails }) => {
  const activitiesList = activities.map(Activity => toTitleCase(Activity));
  entity.trails = trails;
  entity.activities = activitiesList;
  entity.address = entityAddress;
  console.log('Entity: ', entity);
  return entity;
};

const getCoordinates = (location, cb) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: location }, (results, status) => {
    if (status === 'OK') {
      console.log('GEOCODING STATUS OK');
      cb(results[0].geometry.location);
    } else {
      cb(null);
    }
  });
};


// all components are being passed through this function,
// in order to put borders around kthem to make styling easier
  // uncomment the classes on the css page to enable the borders
const FancyBorder = props => (
  <div className={`FancyBorder FancyBorder-${props.color}`}>
    {props.children}
  </div>
);

FancyBorder.propTypes = {
  color: PropTypes.string,
};

export { generateDetailedEntity, generateData, getCoordinates, FancyBorder };

