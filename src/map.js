(function () {
  "use strict";

  if (typeof MAPBOX_TOKEN === "undefined" || MAPBOX_TOKEN.startsWith("pk.YOUR")) {
    document.getElementById("map").innerHTML =
      '<p style="padding:2rem;font-family:sans-serif;">Copy <code>config.example.js</code> → <code>config.js</code> and add your Mapbox token.</p>';
    return;
  }

  var BRAND = {
    cream: "#FBF6EC",
    bone: "#EFE7D7",
    teal: "#5BA8B8",
    deepTeal: "#3F8A9A",
    stone: "#2A241E",
    moss: "#5C6A4A",
    orange: "#EE6C3B",
    warmGray: "#2C2C2C",
  };

  var BELGRADE = [-111.1772, 45.7752];
  var MONTANA_BBOX = [-116.05, 44.35, -104.04, 49.0];

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v11",
    center: BELGRADE,
    zoom: 9,
    accessToken: MAPBOX_TOKEN,
  });

  map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

  var geocoderMarker = null;

  var geocoder = new MapboxGeocoder({
    accessToken: MAPBOX_TOKEN,
    mapboxgl: mapboxgl,
    marker: false,
    placeholder: "Check your address…",
    bbox: MONTANA_BBOX,
    proximity: { longitude: BELGRADE[0], latitude: BELGRADE[1] },
    countries: "us",
    language: "en",
  });

  geocoder.on("result", function (e) {
    if (geocoderMarker) geocoderMarker.remove();

    var el = document.createElement("div");
    el.className = "bpp-marker";

    geocoderMarker = new mapboxgl.Marker({ element: el })
      .setLngLat(e.result.center)
      .addTo(map);
  });

  geocoder.on("clear", function () {
    if (geocoderMarker) {
      geocoderMarker.remove();
      geocoderMarker = null;
    }
  });

  map.addControl(geocoder, "top-left");

  map.on("load", function () {
    var labelLayers = map.getStyle().layers.filter(function (l) {
      return l.type === "symbol" && /place|label|poi/i.test(l.id);
    });
    labelLayers.forEach(function (l) {
      map.setLayoutProperty(l.id, "visibility", "none");
    });

    map.addSource("service-areas", {
      type: "geojson",
      data: "data/service-areas.geojson",
    });

    map.addLayer(
      {
        id: "service-areas-fill",
        type: "fill",
        source: "service-areas",
        paint: {
          "fill-color": BRAND.teal,
          "fill-opacity": 0.12,
        },
      },
      "road-simple"
    );

    map.addLayer(
      {
        id: "service-areas-outline",
        type: "line",
        source: "service-areas",
        paint: {
          "line-color": BRAND.deepTeal,
          "line-width": 2.5,
          "line-opacity": 0.7,
        },
      },
      "road-simple"
    );

    var towns = {
      type: "FeatureCollection",
      features: [
        { type: "Feature", geometry: { type: "Point", coordinates: [-111.0340, 45.6770] }, properties: { name: "Bozeman" } },
        { type: "Feature", geometry: { type: "Point", coordinates: [-111.1772, 45.7752] }, properties: { name: "Belgrade" } },
        { type: "Feature", geometry: { type: "Point", coordinates: [-111.3335, 45.8614] }, properties: { name: "Manhattan" } },
        { type: "Feature", geometry: { type: "Point", coordinates: [-111.5513, 45.8883] }, properties: { name: "Three Forks" } },
        { type: "Feature", geometry: { type: "Point", coordinates: [-111.1609, 45.6301] }, properties: { name: "Four Corners" } },
        { type: "Feature", geometry: { type: "Point", coordinates: [-111.2224, 45.5612] }, properties: { name: "Gallatin Gateway" } },
        { type: "Feature", geometry: { type: "Point", coordinates: [-111.4013, 45.2833] }, properties: { name: "Big Sky" } },
        { type: "Feature", geometry: { type: "Point", coordinates: [-110.5601, 45.6616] }, properties: { name: "Livingston" } },
      ],
    };

    map.addSource("towns", { type: "geojson", data: towns });

    map.addLayer({
      id: "town-dots",
      type: "circle",
      source: "towns",
      paint: {
        "circle-radius": 5,
        "circle-color": BRAND.orange,
        "circle-stroke-color": BRAND.cream,
        "circle-stroke-width": 2,
      },
    });

    map.addLayer({
      id: "town-labels",
      type: "symbol",
      source: "towns",
      layout: {
        "text-field": ["get", "name"],
        "text-size": 13,
        "text-font": ["DIN Pro Bold", "Arial Unicode MS Bold"],
        "text-offset": [0, 1.4],
        "text-anchor": "top",
        "text-allow-overlap": false,
      },
      paint: {
        "text-color": BRAND.stone,
        "text-halo-color": BRAND.cream,
        "text-halo-width": 2,
      },
    });
  });
})();
