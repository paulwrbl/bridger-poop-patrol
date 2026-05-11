# Bridger Poop Patrol — Service Area Map

Interactive Mapbox map showing coverage zones for Bridger Poop Patrol
(Bozeman / Belgrade / Big Sky, Montana).

## Quick start

1. Copy the config template and add your [Mapbox public token](https://account.mapbox.com/access-tokens/):

   ```sh
   cp config.example.js config.js
   # edit config.js → paste your pk.… token
   ```

2. Open `index.html` in a browser. No build step required.

## Project structure

```
index.html              ← entry point
config.js               ← your Mapbox token (gitignored)
config.example.js       ← token placeholder (committed)
src/
  map.js                ← map init + search box
  styles.css            ← layout styles
data/
  service-areas.geojson ← coverage polygons (coming soon)
```

## How to embed

### Direct snippet (preferred)

Drop this into your site wherever you want the map. Adjust the `height`
to taste.

```html
<div id="bpp-map-embed" style="width:100%;height:500px;">
  <link rel="stylesheet"
        href="https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css" />
  <script src="https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.js"></script>
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.3/mapbox-gl-geocoder.css" />
  <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.3/mapbox-gl-geocoder.min.js"></script>
  <link rel="stylesheet" href="/path/to/src/styles.css" />
  <div id="map" style="width:100%;height:100%;"></div>
  <script>const MAPBOX_TOKEN = "pk.YOUR_TOKEN";</script>
  <script src="/path/to/src/map.js"></script>
</div>
```

Update the `/path/to/` references to match where you host the files.

### iframe fallback

Host `index.html` on its own URL, then embed:

```html
<iframe
  src="https://your-domain.com/map/index.html"
  width="100%"
  height="500"
  style="border:none;"
  loading="lazy"
  title="Bridger Poop Patrol service area map"
></iframe>
```

## Dependencies

| Dependency | Version | Loaded via |
|---|---|---|
| Mapbox GL JS | v3.9.4 | CDN |
| Mapbox GL Geocoder | v5.0.3 | CDN |
| Tailwind CSS | play CDN | CDN |

## Roadmap

- [ ] Service area polygons (GeoJSON)
- [ ] Point-in-polygon "you're covered" check
- [ ] Brand color styling
- [ ] Mobile responsiveness audit
- [ ] Pricing tier per zone
