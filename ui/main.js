console.log (loaded);
function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.2),
        zoom: 10
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}
/**
 * Shows how to add venue objects to the map, change
 * default styling and change a floor level for all
 * venues.
 *
 * https://developer.here.com/api-explorer/maps-js/maps/venues-layer
 *
 * @param {H.Map} map A HERE Map instance within the application
 * @param {H.service.Platform} platform Platform instance within the application
 * @param {Function} renderControls Custom helper function for adding buttons
 */
function addVenueLayer(map, platform, renderControls) {
  // Create a tile layer, which will display venues
  var customVenueLayer = platform.getVenueService().createTileLayer({
    // Provide a callback that will be called for each newly created space
    onSpaceCreated: onSpaceCreated
  });

  // Get TileProvider from Venue Layer
  var venueProvider = customVenueLayer.getProvider();
  // Add venues layer to the map
  map.addLayer(customVenueLayer);

  // Use the custom function (i.e. not a part of the API)
  // to render buttons with corresponding click callbacks
  renderControls('Change floor', {
    '+1 Level': function () {
      // Increase global floor level on the venue provider
      venueProvider.setCurrentLevel(venueProvider.getCurrentLevel() + 1);
    },
    '-1 Level': function () {
      // Decrease global floor level on the venue provider
      venueProvider.setCurrentLevel(venueProvider.getCurrentLevel() - 1);
    }
  });
}

/**
 * Changes the default style for H&M shops
 *
 * @param {H.service.venues.Space}
 */
function onSpaceCreated(space) {
  // getData for spaces contains data from the Venue Interaction Tile API,
  // see https://developer.here.com/rest-apis/documentation/venue-maps/topics/resource-type-venue-interaction-tile.html
  if (space.getData().preview === 'H&M') {
    space.setStyle({
      fillColor: 'rgba(0,255,0,0.3)'
    });
  }
}