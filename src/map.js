(function () {
  "use strict";

  if (typeof MAPBOX_TOKEN === "undefined" || MAPBOX_TOKEN.startsWith("pk.YOUR")) {
    document.getElementById("map").innerHTML =
      '<p style="padding:2rem;font-family:sans-serif;">⚠️ Copy <code>config.example.js</code> → <code>config.js</code> and add your Mapbox token.</p>';
    return;
  }

  const BELGRADE = [-111.1772, 45.7752];
  const MONTANA_BBOX = [-116.05, 44.35, -104.04, 49.0];

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: BELGRADE,
    zoom: 9,
    accessToken: MAPBOX_TOKEN,
  });

  map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

  map.addControl(
    new MapboxGeocoder({
      accessToken: MAPBOX_TOKEN,
      mapboxgl: mapboxgl,
      marker: true,
      placeholder: "Check your address…",
      bbox: MONTANA_BBOX,
      proximity: { longitude: BELGRADE[0], latitude: BELGRADE[1] },
      countries: "us",
      language: "en",
    }),
    "top-left"
  );
})();
