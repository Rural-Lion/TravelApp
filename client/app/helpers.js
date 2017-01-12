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
  const newArray = arr.reduce((acc, { distance: { value: meters }, duration: { text: durationText }, instructions }) => {
    acc.push({
      distance: `${meters / 1000} Km`,
      duration: durationText,
      instructions,
    });
    return acc;
  }, []);
  return newArray;
};

const generateItinerary = (obj, startingTime, endingTime, days, costPerDay) => {
  const legs = obj.routes[0].legs;

  startingTime *= 3600;
  endingTime *= 3600;

  const itinerary = {
    totalTime: 0,
    remainingTime: days * (endingTime - startingTime),
    totalDistance: 0,
    totalCost: 0,
    Days: [],
  };

  const entityLegs = legs.reduce((
                                acc,
                                {
                                  distance: { value: meters },
                                  duration: { value: seconds },
                                  steps,
                                  end_address,
                                  start_address,
                                }) => {
    seconds += seconds * 1.2;
    itinerary.totalTime += seconds;
    itinerary.totalDistance += (meters / 1000);
    itinerary.remainingTime -= seconds;


    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const day = Math.ceil(itinerary.totalTime / (endingTime - startingTime));
    const currentTime = new Date(0);
    currentTime.setSeconds(28800);
    currentTime.setSeconds(((day * startingTime) + ((day - 1) * (86400 - endingTime)) + itinerary.totalTime));

    acc.push({
      currentTime,
      remainingTime: itinerary.remainingTime,
      currentDistance: itinerary.totalDistance,
      cost: (meters / 1000) * 0.09,
      day,
      distance: `${meters / 1000} Km`,
      duration: [hrs, mins],
      legs: generateChildLegs(steps),
      start_address,
      end_address,
    });
    return acc;
  }, []);

  const dayLegs = entityLegs.reduce((acc, entity) => {
    if (acc[entity.day - 1] !== undefined) {
      itinerary.totalCost += costPerDay;
      acc[entity.day - 1].push(entity);
    } else { acc[entity.day - 1] = [entity]; }
    return acc;
  }, []);

  itinerary.totalCost += itinerary.totalDistance * 0.09;
  itinerary.days = dayLegs;
  return itinerary;
};


export { toTitleCase, generateDetailedEntity, generateData, getCoordinates, FancyBorder, generateItinerary };
