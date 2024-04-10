<template>
  <div>
    <div id="map" style="height: 100vh;"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol/Overlay';

export default {
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      const map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([6.5618, 53.2194]),
          zoom: 13
        })
      });

      const scooterLocations = [
  { id: 1, lonLat: [6.5615, 53.2305], battery: 80 },
  { id: 2, lonLat: [6.5785, 53.2135], battery: 60 },
  { id: 3, lonLat: [6.5725, 53.2325], battery: 75 },
  { id: 4, lonLat: [6.5805, 53.2150], battery: 90 },
  { id: 5, lonLat: [6.5905, 53.2205], battery: 65 },
  { id: 6, lonLat: [6.5705, 53.2185], battery: 85 },
  { id: 7, lonLat: [6.5905, 53.2355], battery: 70 },
  { id: 8, lonLat: [6.6005, 53.2405], battery: 55 },
  { id: 9, lonLat: [6.5705, 53.2325], battery: 80 },
  { id: 10, lonLat: [6.5855, 53.2265], battery: 75 },
  { id: 11, lonLat: [6.5755, 53.2365], battery: 90 },
  { id: 12, lonLat: [6.5905, 53.2265], battery: 65 },
  { id: 13, lonLat: [6.5855, 53.2405], battery: 85 },
  { id: 14, lonLat: [6.5955, 53.2405], battery: 70 },
  { id: 15, lonLat: [6.5655, 53.2215], battery: 60 },
  { id: 16, lonLat: [6.5855, 53.2265], battery: 75 },
  { id: 17, lonLat: [6.5805, 53.2175], battery: 80 },
  { id: 18, lonLat: [6.5705, 53.2265], battery: 65 },
  { id: 19, lonLat: [6.5755, 53.2205], battery: 85 },
  { id: 20, lonLat: [6.5605, 53.2225], battery: 70 },
  { id: 21, lonLat: [6.5655, 53.2185], battery: 90 },
  { id: 22, lonLat: [6.5755, 53.2325], battery: 75 },
  { id: 23, lonLat: [6.5855, 53.2335], battery: 80 },
  { id: 24, lonLat: [6.5905, 53.2325], battery: 65 },
  { id: 25, lonLat: [6.5725, 53.2385], battery: 85 },
  { id: 26, lonLat: [6.5805, 53.2235], battery: 70 },
  { id: 27, lonLat: [6.5805, 53.2185], battery: 90 },
  { id: 28, lonLat: [6.5755, 53.2405], battery: 75 },
  { id: 29, lonLat: [6.5705, 53.2215], battery: 80 },
  { id: 30, lonLat: [6.5655, 53.2165], battery: 65 },
  { id: 31, lonLat: [6.5615, 53.2305], battery: 80 },
  { id: 32, lonLat: [6.5785, 53.2135], battery: 60 },
  { id: 33, lonLat: [6.5505, 53.2285], battery: 75 },
  { id: 34, lonLat: [6.5585, 53.2205], battery: 90 },
  { id: 35, lonLat: [6.5555, 53.2345], battery: 65 },
  { id: 36, lonLat: [6.5405, 53.2185], battery: 85 },
  { id: 37, lonLat: [6.5435, 53.2335], battery: 70 },
  { id: 38, lonLat: [6.5525, 53.2405], battery: 55 },
  { id: 39, lonLat: [6.5555, 53.2265], battery: 80 },
  { id: 40, lonLat: [6.5605, 53.2285], battery: 75 }
];

      const vectorSource = new VectorSource();

      scooterLocations.forEach(location => {
        const marker = new Feature({
          geometry: new Point(fromLonLat(location.lonLat)),
          name: 'Scooter ' + location.id,
          battery: location.battery
        });
        marker.setStyle(this.createMarkerStyle());
        marker.setId(location.id);
        vectorSource.addFeature(marker);
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      map.addLayer(vectorLayer);

      const popup = new Overlay({
        element: document.getElementById('popup'),
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });
      map.addOverlay(popup);

      map.on('click', function (e) {
        const feature = map.forEachFeatureAtPixel(e.pixel, function (feature) {
          return feature;
        });
        if (feature) {
          const coordinates = feature.getGeometry().getCoordinates();
          popup.setPosition(coordinates);
          const content = document.getElementById('popup-content');
          content.innerHTML = `<b>${feature.get('name')}</b><br>Batterij: ${feature.get('battery')}%`;
        } else {
          popup.setPosition(undefined);
        }
      });

      const closer = document.getElementById('popup-closer');
      closer.onclick = function () {
        popup.setPosition(undefined);
        closer.blur();
        return false;
      };
    },
  createMarkerStyle() { 
  return new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'https://cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png',
      color: 'red'
    })
  });
}
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 100vh;
}
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  bottom: 12px;
  left: -50px;
  min-width: 180px;
}
.ol-popup:after, .ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>
