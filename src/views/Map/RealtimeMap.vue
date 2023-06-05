<template>
  <div ref="mapContainer" class="map-container"></div>
  <div class="absolute left-[80px] top-[82px] z-30 bg-white rounded-lg w-fit h-fit h-max-[1000px] shadow-2xl px-4 py-4 flex flex-col gap-2">
    <h1 class="text-left font-bold text-lg">Select Vehicle</h1>
    <select v-model="selectedVehicle" class="cursor-pointer" @change="changeVehicle(selectedVehicle)">
      <option v-for="item in devicesList" :key="item.id" :value="item.IMEINumber">{{ item.deviceName }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Map, View } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM, Vector as VectorSource } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Style, Circle, Fill, Stroke } from 'ol/style'
import { useGeoDataStore } from '@/stores/GeoDataStore'
import { useDevicesStore } from '@/stores/DevicesStore'

import { storeToRefs } from 'pinia'

let map
let vectorSource
let marker
const whileState = ref(true)
const mapContainer = ref(null)
const geoDataStore = useGeoDataStore()
const devicesStore = useDevicesStore()
const { deviceGeo } = storeToRefs(useGeoDataStore())
const { devicesList } = storeToRefs(useDevicesStore())
const selectedVehicle = ref(null)
const delay = require('delay')


const queryParams = ref({
  imei: selectedVehicle.value
})

onMounted( async () => {
  await devicesStore.loadDevices()
  selectedVehicle.value = devicesList.value[0].IMEINumber
  initializeMap()
  queryParams.value.imei = devicesList.value[0].IMEINumber
  getCoordinates()
  while (whileState) {
    getCoordinates()
    await delay(3000)
  }
})

function initializeMap() {
  map = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 14,
    }),
    controls:[]
  })

  vectorSource = new VectorSource();
  map.addLayer(new VectorLayer({ source: vectorSource }));

  marker = new Feature({
    geometry: new Point(fromLonLat([0, 0])),
  });
  marker.setStyle(
    new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'white', width: 2 }),
      }),
    })
  );
  vectorSource.addFeature(marker)

}

function addMarkersToMap(coordinate) {
  console.log(coordinate)
  marker.getGeometry().setCoordinates(coordinate);
  map.getView().setCenter(coordinate);  
}

async function getCoordinates() {
  await geoDataStore.getLastDeviceGeo(queryParams.value)
  addMarkersToMap(fromLonLat([deviceGeo.value.longitude, deviceGeo.value.latitude]))
}

function changeVehicle(selectedVehicle) {
  queryParams.value.imei = selectedVehicle
}

</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh
}
</style>
