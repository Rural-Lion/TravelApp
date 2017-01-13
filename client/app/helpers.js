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
  color: PropTypes.string || PropTypes.array,
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

const deconstructDirections = ({ distance: { value: meters }, duration: { value: seconds }, steps, end_address, start_address }, cb) => {
  const direction = {
    distance: meters,
    duration: seconds,
    legs: cb(steps),
    start_address,
    end_address,
    cost: {},
    type: 'drive',
  };
  return direction;
};

const generateBaseIten = (dirArray, actArray, order, cb) => {
  const itenArray = dirArray.reduce((acc, obj, index) => {
    acc.push(deconstructDirections(obj, cb));
    if (actArray[order[index]]) {
      acc[acc.length - 1].name = actArray[order[index]].name;
      actArray[order[index]].type = 'activity';
      acc.push(actArray[order[index]]);
    }
    return acc;
  }, []);
  return itenArray;
};

const appendTime = (arr, startingTimeInSeconds, endingTimeInSeconds, days) => {
  const dayTime = (endingTimeInSeconds - startingTimeInSeconds);
  const totalTime = days * dayTime;

  let usedTime = 0;
  let remainingTime = totalTime;
  let currentTime = startingTimeInSeconds;
  let currentDay = 1;

  const convertCurrentTime = (time) => {
    var time = [Math.floor(time / 3600), Math.floor((time % 3600) / 60)];
    return time;
  };

  arr.forEach((obj) => {
    const time = {
      startTime: 0,
      endTime: 0,
      day: 0,
      remainingTime: 0,
      usedTime: 0,
    };

    const { duration } = obj;
    usedTime += duration;
    remainingTime -= duration;

    if ((currentTime + duration) > endingTimeInSeconds) {
      const unusedTime = endingTimeInSeconds - currentTime;
      currentDay++;
      usedTime += unusedTime;
      remainingTime -= unusedTime;
      currentTime = startingTimeInSeconds;
    }
    time.startTime = convertCurrentTime(currentTime);
    currentTime += duration;
    time.endTime = convertCurrentTime(currentTime);
    time.day = currentDay;
    time.remainingTime = remainingTime;
    time.usedTime = usedTime;

    // if ((currentTime + duration) > endingTimeInSeconds) {
    //   const unusedTime = endingTimeInSeconds - currentTime;
    //   obj.duration += unusedTime;
    // }
    obj.time = time;
  });
};

const appendCost = (arr) => {
  arr.forEach((obj) => {
    const { cost, distance } = obj;

    if (distance) {
      cost.drivingCost = (distance / 1000) * 0.09;
    }
  });
};

const generateDayLegs = (arr) => {
  const legs = arr.reduce((acc, entity) => {
    if (acc[entity.time.day - 1] !== undefined) {
      acc[entity.time.day - 1].legs.push(entity);
    } else { acc[entity.time.day - 1] = { day: entity.time.day, legs: [entity] }; }
    return acc;
  }, []);

  return legs;
};

const generateItinerary = (obj, startingTime, endingTime, days, costPerDay, waypoints) => {
  const legs = obj.routes[0].legs;
  const order = obj.routes[0].waypoint_order;

  const startingTimeInSeconds = startingTime * 3600;
  const endingTimeInSeconds = endingTime * 3600;
  const dayTime = (endingTimeInSeconds - startingTimeInSeconds);
  const totalTime = days * dayTime;

  const baseIten = generateBaseIten(legs, waypoints, order, generateChildLegs);

  appendTime(baseIten, startingTimeInSeconds, endingTimeInSeconds, days);
  appendCost(baseIten, costPerDay);

  const calcTotalCost = (baseIten) => {
    let totalCost = 0;
    baseIten.forEach((obj) => {
      const { cost } = obj;
      for (const key in cost) {
        totalCost += cost[key];
      }
    });
    return totalCost;
  };

  const calcTotalDistance = (baseIten) => {
    let totalDistance = 0;
    baseIten.forEach(({ distance }) => {
      if (distance) {
        totalDistance += distance;
      }
    });
    return totalDistance;
  };

  const calcTotalTime = (baseIten) => {
    let totalTime = 0;
    baseIten.forEach(({ duration }) => {
      totalTime += duration;
    });
    return totalTime;
  };

  const dayLegs = generateDayLegs(baseIten);

  const itinerary = {
    totalTime: calcTotalTime(baseIten),
    remainingTime: totalTime - calcTotalTime(baseIten),
    totalDistance: calcTotalDistance(baseIten),
    totalCost: calcTotalCost(baseIten) + (dayLegs.length * costPerDay),
    days: dayLegs,
  };

  return itinerary;
};


export { toTitleCase, generateDetailedEntity, generateData, getCoordinates, FancyBorder, generateItinerary };
