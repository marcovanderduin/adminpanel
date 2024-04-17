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
import store from './store';

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

      const scooterLocations = store.state.scooterLocations;

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