// Creating map object
var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

// Data: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
// {
//     type: "FeatureCollection",
//     metadata: {
//       generated: Long Integer,
//       url: String,
//       title: String,
//       api: String,
//       count: Integer,
//       status: Integer
//     },
//     bbox: [
//       minimum longitude,
//       minimum latitude,
//       minimum depth,
//       maximum longitude,
//       maximum latitude,
//       maximum depth
//     ],
//     features: [
//       {
//         type: "Feature",
//         properties: {
//           mag: Decimal,
//           place: String,
//           time: Long Integer,
//           updated: Long Integer,
//           tz: Integer,
//           url: String,
//           detail: String,
//           felt:Integer,
//           cdi: Decimal,
//           mmi: Decimal,
//           alert: String,
//           status: String,
//           tsunami: Integer,
//           sig:Integer,
//           net: String,
//           code: String,
//           ids: String,
//           sources: String,
//           types: String,
//           nst: Integer,
//           dmin: Decimal,
//           rms: Decimal,
//           gap: Decimal,
//           magType: String,
//           type: String
//         },
//         geometry: {
//           type: "Point",
//           coordinates: [
//             longitude,
//             latitude,
//             depth
//           ]
//         },
//         id: String
//       },
//       …
//     ]
//   }