const MapDirections = (waypoints, starting, map, that) => {
  const directionsDisplay = new google.maps.DirectionsRenderer();
  const directions = new google.maps.DirectionsService();

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
        console.log(results);
        directionsDisplay.setMap(map);
      } else {
        directionsDisplay.setMap(null);
      }
      console.log('this is status of directions request: ', status);
    });
  } else {
    directionsDisplay.set('directions', null);
  }
};

export default MapDirections
;

