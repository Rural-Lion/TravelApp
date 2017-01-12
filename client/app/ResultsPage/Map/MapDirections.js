

const MapDirections = (activities, starting, map, cb) => {
  const directionsDisplay = new google.maps.DirectionsRenderer();
  const directions = new google.maps.DirectionsService();

  const waypoints = activities.map(({ waypoint }) => waypoint);


  if (waypoints[0]) {
    directions.route({
      origin: starting,
      destination: starting,
      waypoints,
      optimizeWaypoints: true,
      provideRouteAlternatives: true,
      travelMode: 'DRIVING',
    }, (results, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(results);
        directionsDisplay.setMap(map);
      } else {
        directionsDisplay.setMap(null);
      }
      console.log('this is status of directions request: ', status);
      cb(results);
    });
  } else {
    directionsDisplay.set('directions', null);
  }
};

export default MapDirections
;

