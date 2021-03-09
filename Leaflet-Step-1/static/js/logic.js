function createEarthquakes(features) {
  // Loop through locations and create earthquake markers
  for (var i = 0; i < features.length; i++) {
    // Setting the marker radius for the earthquake due to intensity
    marker = [features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]]

    popUpText = "<h4>Location: " + features[i].properties.place + "</h4><hr>Magnitude: " + features[i].properties.mag + 
      "<hr>Depth (km): " + features[i].geometry.coordinates[2];

    L.circle(marker, {
      fillOpacity: 0.60,
      fillColor: markerColor(features[i].geometry.coordinates[2]),
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
  return magnitude ** 2 * 5000;
};

function markerColor(depth) {
  
  var color = "";
  if (depth > 90) {
    color = "#ff0000";
  }
  else if (depth > 70) {
    color = "#ff8000";
  }
  else if (depth > 50) {
    color = "#ffcc00";
  }
  else if (depth > 30) {
    color = "#ffff00";
  }
  else if (depth > 10) {
    color = "#bfff00";
  }
  else {
    color = "#80ff00";
  }
  return color;
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

/*Legend specific*/
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(myMap) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += '<i style="background: #80ff00"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: #bfff00"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: #ffff00"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: #ffcc00"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: #ff8000"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: #ff0000"></i><span>90+</span><br>';
  
  
  return div;
};

legend.addTo(myMap);
