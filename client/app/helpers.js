import React, { PropTypes } from 'react';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

const uniqueEntities = {};
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

const generateChildLegs = (arr) => {
  const newArray = arr.reduce((acc, { distance: { text: distanceText }, duration: { text: durationText }, instructions }) => {
    acc.push({
      distance: distanceText,
      duration: durationText,
      instructions,
    });
    return acc;
  }, []);
  return newArray;
};

const generateTimeArray = function (str) {
  const timeArray = str.match(/(\d{1,2}(?= hours)|(\d{1,2})(?= min))/gi);
  return [+timeArray[timeArray.length - 2] || 0, +timeArray[timeArray.length - 1]];
};

const generateItinerary = (obj) => {
  const legs = obj.routes[0].legs;

  const entityLegs = legs.reduce((acc, { distance: { text: distanceText }, duration: { text: durationText }, steps, end_address, start_address }, index) => {
    let [hrs, mins] = generateTimeArray(durationText);

    if (acc[index - 1]) {
      hrs = acc[index - 1].totalTime.hrs + hrs + Math.floor((acc[index - 1].totalTime.mins + mins) / 60);
      mins = ((acc[index - 1].totalTime.mins + mins) % 60);
    }

    const childLegs = generateChildLegs(steps);
    acc.push({
      day: Math.ceil(hrs / 12),
      totalTime: { hrs, mins },
      timeDone: { hrs: (hrs % 12) + 9, mins },

      distance: distanceText,
      duration: generateTimeArray(durationText),
      legs: childLegs,
      start_address,
      end_address,

    });
    return acc;
  }, []);

  const dayLegs = entityLegs.reduce((acc, entity) => {
    if (acc[entity.day - 1] !== undefined) {
      acc[entity.day - 1].push(entity);
    } else { acc[entity.day - 1] = [entity]; }
    return acc;
  }, []);

  return dayLegs;
};


export { generateData, getCoordinates, generateItinerary, FancyBorder, generateDetailedEntity };

