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

  map.on("load", function () {
    map.addSource("service-areas", {
      type: "geojson",
      data: "data/service-areas.geojson",
    });

    map.addLayer({
      id: "service-areas-fill",
      type: "fill",
      source: "service-areas",
      paint: {
        "fill-color": "#3b82f6",
        "fill-opacity": 0.15,
      },
    });

    map.addLayer({
      id: "service-areas-outline",
      type: "line",
      source: "service-areas",
      paint: {
        "line-color": "#2563eb",
        "line-width": 2,
      },
    });

    map.addLayer({
      id: "service-areas-labels",
      type: "symbol",
      source: "service-areas",
      layout: {
        "text-field": ["get", "ZCTA5CE10"],
        "text-size": 13,
        "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
      },
      paint: {
        "text-color": "#1e40af",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1.5,
      },
    });
  });
})();
