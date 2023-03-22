<template>
  <div id="mapRoot"></div>
</template>

<script setup>
import 'ol/ol.css';
import * as ol from 'ol';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { getCenter } from 'ol/extent.js';
import { defaults as defaultInteractions } from 'ol/interaction.js';

import { Icon, Style } from 'ol/style.js';
import { Point } from 'ol/geom.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector } from 'ol/source.js';

import ImageLayer from 'ol/layer/Image.js'
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';

import { ref, onMounted, onUnmounted } from 'vue';



const extent = [-500, 0, 500, 500];
const projection = new Projection({
  code: 'my-custom-projection',
  units: 'pixels',
  extent: extent,
});

onMounted(() => {
  const map = new Map({
    layers: [],
    target: 'mapRoot',
    view: new View({
      projection: projection,
      center: getCenter(extent),
      zoom: 2.6,
      minZoom: 2.6,
      maxZoom: 6,
    }),
    interactions: defaultInteractions({
      dragAndDrop: false,
      dragPan: false,	
      keyboardPan: false,      
    }),
  });

  //create image layer
  const imgLayer = new ImageLayer({
    source: new Static({
      attributions: '© <a href="https://google.com">SCBD HABITAT ZOO</a>',
      url: require('../../assets/img/map-overlay.jpg'),
      projection: projection,
      imageExtent: extent,
    }),
  })
  map.addLayer(imgLayer); // add the layer to the map

  //create marker layer
  const markerLayer = new VectorLayer({
    source: new Vector({
      features: [
        new ol.Feature({
          geometry: new Point([0, 0]), // adjust the coordinates to match your marker
        }),
        new ol.Feature({
          geometry: new Point([0.5, 0]), // adjust the coordinates to match your marker
        }),
        new ol.Feature({
          geometry: new Point([1, 0]), // adjust the coordinates to match your marker
        }),
      ],
    }),
    style: new Style({
      image: new Icon({
        src: require('../../assets/img/green-dot.png'), // adjust the path to match the location of your marker image
        anchor: [0.5, 1],
      }),
    }),
  });
  
  map.addLayer(markerLayer); // add the layer to the map
  
  const markerLayer2 = new VectorLayer({
    source: new Vector({
      features: [],
    }),
    style: new Style({
      image: new Icon({
        src: require('../../assets/img/marker-orange.png'), // adjust the path to match the location of your marker image
        anchor: [0.5, 1],
      }),
    }),
  });
  
  map.addLayer(markerLayer2); // add the layer to the map



  const feature = new ol.Feature({
    geometry: new Point([100, 0]), // adjust the coordinates to match your marker
  })

  markerLayer2.getSource().addFeature(feature)


});



</script>

<style scoped>
#mapRoot {
  @apply w-full h-screen;
}
</style>