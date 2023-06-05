<template>
  <div ref="mapContainer" class="map-container"></div>
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
import LineString from 'ol/geom/LineString'
import { useGeoDataStore } from '@/stores/GeoDataStore'

let map
const mapContainer = ref(null)
const geoDataStore = useGeoDataStore()

const props = defineProps({
  imei: {
    type: String,
    required: true
  }
})

const queryParams = ref({
  imei: props.imei
})

onMounted(() => {
  initializeMap()
  getCoordinates()
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
      zoom: 2,
    }),
  })
}

async function getCoordinates() {
  await geoDataStore.getLastDeviceGeo(queryParams.value)
  const dummyData = [
    { lat: 0, long: 0 },
    { lat: 10, long: 10 },
    { lat: 20, long: 20 },
    { lat: 30, long: 30 }
  ]

  addMarkersToMap(dummyData)
}

function addMarkersToMap(data) {
  const vectorSource = new VectorSource()

  const coordinates = data.map(item => fromLonLat([item.long, item.lat]))

  const lineString = new LineString(coordinates)

  const lineFeature = new Feature({
    geometry: lineString,
  })

  vectorSource.addFeature(lineFeature)

  data.forEach(item => {
    const { lat, long } = item
    const marker = new Feature({
      geometry: new Point(fromLonLat([long, lat])),
    })

    marker.setStyle(
      new Style({
        image: new Circle({
          radius: 2,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'white', width: 1 }),
        }),
      })
    )

    vectorSource.addFeature(marker)
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  })

  map.addLayer(vectorLayer)

  map.getView().fit(lineString.getExtent(), {
    padding: [50, 50, 50, 50],
  })
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh
}
</style>
