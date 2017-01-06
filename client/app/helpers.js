import React, { Component, PropTypes } from 'react';

// interests for interest buttons are hard coded in

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
const interests = ['biking', 'boating', 'historic & cultural site', 'camping', 'fishing', 'hiking', 'off highway vehicle', 'picnicking', 'recreational vehicles', 'visitor center', 'water sports', 'wildlife viewing', 'other recreation concession site'];

const INTERESTS = interests.map(interest => toTitleCase(interest));

// function for creating objects from the results of api request to the US website
const generateData = res => res.map(({
  FacilityLatitude,
  FacilityLongitude,
  FacilityName,
  FacilityPhone,
  FacilityDescription, 
  FacilityEmail,
  URL,
  RecAreaLatitude,
  RecAreaLongitude,
  RecAreaName,
  RecAreaPhone,
  RecAreaDescription,
  RecAreaEmail
}) => {

return {
  name: FacilityName || RecAreaName, 
  image: URL, 
  email: FacilityEmail || RecAreaEmail,
  phoneNumber: FacilityPhone || RecAreaPhone,
  description: FacilityDescription || RecAreaDescription,
  coordinates: !!FacilityLatitude ? [FacilityLatitude, FacilityLongitude] : [RecAreaLatitude, RecAreaLongitude],
  facility: !!FacilityName,
  recArea: !!RecAreaName
};
});

const generateActivities = ({
  FacilityLatitude,
  FacilityLongitude,
  FacilityName,
  FacilityPhone,
  FacilityDescription, 
  FacilityEmail,
  URL,
  RecAreaLatitude,
  RecAreaLongitude,
  RecAreaName,
  RecAreaPhone,
  RecAreaDescription,
  RecAreaEmail,
  activities
}) => {
  const activitiesList = activities.map(({ ActivityName }) => toTitleCase(ActivityName));

return {
  name: FacilityName || RecAreaName, 
  image: URL, 
  email: FacilityEmail || RecAreaEmail,
  phoneNumber: FacilityPhone || RecAreaPhone,
  description: FacilityDescription || RecAreaDescription,
  coordinates: !!FacilityLatitude ? [FacilityLatitude, FacilityLongitude] : [RecAreaLatitude, RecAreaLongitude],
  activities: activitiesList, 
  facility: !!FacilityName,
  recArea: !!RecAreaName
};
};


const getCoordinates = function (location, cb) {
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

// for questions on the proptypes after the components, check it out on docs. they are pretty cool

// all components are being passed through this function,
// in order to put borders around kthem to make styling easier
  // uncomment the classes on the css page to enable the borders
const FancyBorder = function (props) {
  return (
    <div className={`FancyBorder FancyBorder-${props.color}`}>
      {props.children}
    </div>
  );
};

FancyBorder.propTypes = {
  color: PropTypes.string,
};


export { INTERESTS, generateActivities, generateData, getCoordinates, FancyBorder };


