const MapDirections = (waypoints, starting, map) => {
  const directionsDisplay = new google.maps.DirectionsRenderer();
  const directions = new google.maps.DirectionsService();

  directions.route({
    origin: starting,
    destination: waypoints[(waypoints.length - 1)].location,
    waypoints: waypoints.slice(0, waypoints.length - 1),
    optimizeWaypoints: true,
    provideRouteAlternatives: true,
    travelMode: 'DRIVING',
  }, (results, status) => {
    if (status === 'OK') {
      directionsDisplay.setDirections(results);
      directionsDisplay.setMap(map);
    }
  });
};

export default MapDirections
;
