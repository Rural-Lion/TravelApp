import React, { Component, PropTypes } from 'react';

// interests for interest buttons are hard coded in
const INTERESTS = ['biking', 'boating', 'historic & cultural site', 'camping', 'fishing', 'hiking', 'off highway vehicle', 'picnicking', 'recreational vehicles', 'visitor center', 'water sports', 'wildlife viewing', 'other recreation concession site'];

// function for creating objects from the results of api request to the US website
const generateActivities = res => res.map(({
                  RECAREAADDRESS: [{ PostalCode, RecAreaStreetAddress1, City, AddressStateCode }],
                  RecAreaLatitude,
                  RecAreaLongitude,
                  RecAreaName,
                  RecAreaPhone,
                  RecAreaDescription,
                  ACTIVITY,
                   MEDIA,
               }) => {
  const activities = ACTIVITY.map(({ ActivityName }) => ActivityName);

  return {
    img: MEDIA,
    name: RecAreaName,
    phoneNumber: RecAreaPhone,
    description: RecAreaDescription,
    coordinates: [RecAreaLatitude, RecAreaLongitude],
    address: `${RecAreaStreetAddress1} ${City}, ${AddressStateCode} ${PostalCode}`,
    activities,
  };
});

const getCoordinates = function (location) {
  let latLng;
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: location }, (results, status) => {
    if (status === 'OK') {
      latLng = results[0].geometry.location;
    } else {
      latLng = null;
    }
  });
  return latLng;
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
  children: PropTypes.arrayOf(PropTypes.element),
};


export { INTERESTS, generateActivities, getCoordinates, FancyBorder };
