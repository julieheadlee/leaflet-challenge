function createEarthquakes(features) {
  // Loop through locations and create earthquake markers
  for (var i = 0; i < features.length; i++) {
    // Setting the marker radius for the earthquake due to intensity
    marker = [features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]]
    popUpText = "<h4>Location: " + features[i].properties.place + "</h4><hr>Time: " +
      convertTime(features[i].properties.time) + "<hr>Magnitude: " + features[i].properties.mag + 
      "<hr>Depth (km): " + features[i].geometry.coordinates[2];

    L.circle(marker, {
      fillOpacity: .75,
      color: markerColor(features[i].geometry.coordinates[2]),
      radius: markerSize(features[i].properties.mag)
    }).bindPopup(popUpText).addTo(myMap);
  }
};

function convertTime(time) {
  // convert from timestamp to date/time
  return time;
};

// Define a markerSize function that will give each city a different radius based on its population
// Since the magnitude increases by 10 times for every integer increase, increases in magnitude should be
// more dramatic visually. Increasing as exponent of 10 is too much, but squaring the magnitude should 
// visually make strong earthquakes more obvious. 
function markerSize(magnitude) {
  console.log(magnitude);
  return magnitude ** 2 * 5000;
};

function markerColor(depth) {

  var color = "white";
  if (depth > 90) {
    color = "red";
  }
  else if (depth > 70) {
    color = "orange";
  }
  else if (depth > 50) {
    color = "yellow";
  }
  else if (depth > 30) {
    color = "green";
  }
  else if (depth > 10) {
    color = "blue";
  }
  else {
    color = "purple";
  }

};
// Create our map, start with the center of the US.  Show US zoom level.
var myMap = L.map("mapid", {
  center: [42.877742, -97.380979],
  zoom: 5
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Store our earthquake URL 
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createEarthquakes(data.features);
});

