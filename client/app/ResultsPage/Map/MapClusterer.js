const MapMarkerClusterer = (entities, map) => {
  if (map) {
    const markers = entities.map(({ coordinates: [lat, lng] }, index) =>
      new google.maps.Marker({
        position: { lat, lng },
        label: `${index}`,
        map,
      }),
    );

    return new MarkerClusterer(map, markers, { imagePath: './maps/img/m' });
  }
};


export default MapMarkerClusterer;
