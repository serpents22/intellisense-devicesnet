import { defineStore } from 'pinia'
import devicesApi from '@/services/deviceAPI'
import { ref } from 'vue'
import dataAPI from '@/services/dataAPI'
import { useDataStore } from './DataStore'

export const useDevicesStore = defineStore('device', () => {

  const devicesList = ref([])
  const deviceData = ref([])
  const createDeviceIsLoading = ref()
  const updateDeviceIsLoading = ref()
  const isLoading = ref(false)
  const status = ref({
    message: null,
    code: null,
  })
  // const dataStore = useDataStore()

  const loadDevices = async () => {
    isLoading.value = true
    try {
      const res = await devicesApi.getDevices()
      console.log(res)
      devicesList.value = res.data
      isLoading.value = false
    } catch (err) {
        console.error(err)
        isLoading.value = false
      return err
    } 
  }

  const loadDevice = async (id) => {
    isLoading.value = true
    try {
      const res = await devicesApi.getDevice(id)
      deviceData.value = res.data
      isLoading.value = false
    } catch (err) {
      console.error(err)
      isLoading.value = false
      return err
    } 
  }

  const createDevices = async (deviceData) => {
    createDeviceIsLoading.value = true
    try {
      const res = await devicesApi.postDevices(deviceData)
      console.log(res)
      status.value.message = 'Device Created'
      status.value.code = res.data.status
      createDeviceIsLoading.value = false
    } catch (err) {
      console.error(err)
      createDeviceIsLoading.value = false
      status.value.message = err.response.data.error
      status.value.code = err.response.data.status
      return err
    } 
  }

  const updateDevice = async (id,deviceData) => {
    updateDeviceIsLoading.value = true
    try {
      const res = await devicesApi.updateDevice(id,deviceData)
      console.log(res)
      status.value.message = 'Device Updated'
      status.value.code = res.data.status
      updateDeviceIsLoading.value = false
    } catch (err) {
      console.error(err)
      updateDeviceIsLoading.value = false
      status.value.message = err.response.data.error
      status.value.code = err.response.data.status
      return err
    } 
  }

  const deleteDevice = async (id) => {
    isLoading.value = true
    try {
      const res = await devicesApi.deleteDevice(id)
      status.value.message = 'Device Deleted'
      status.value.code = res.data.status
      isLoading.value = false
      console.log(res)
    } catch (err) {
      console.error(err)
      isLoading.value = false
      return err
    } 
  }

  const loadDeviceGeo = async (id) => {
    loadDeviceGeoIsLoading.value = true
    try {
      const res = await devicesApi.getDeviceGeo(id)
      loadDeviceGeoStatus.value.code = res.data.status
      loadDeviceGeoIsLoading.value = false
      deviceGeo.value = res.data.data.device.deviceGeos
      console.log(res)
    } catch (err) {
      console.error(err)
      loadDeviceGeoStatus.value.code = err.response.data.status
      loadDeviceGeoStatus.value.message = 'device not exist'
      loadDeviceGeoIsLoading.value = false
      return err
    }
  }
  
  const postDeviceGeo = async (data) => {
    postDeviceGeoIsLoading.value = true
    try {
      const res = await devicesApi.postDeviceGeo(data)
      postDeviceGeoStatus.value.code = res.data.status
      postDeviceGeoStatus.value.message = "Coordinate Updated"
      postDeviceGeoStatus.value.isError = postDeviceGeoStatus.value.code === 'fail' ? true : false
      postDeviceGeoIsLoading.value = false
      console.log(res)
    } catch (err) {
      console.error(err)
      postDeviceGeoStatus.value.code = err.response.data === undefined ? 'fail' : err.response.data.status
      postDeviceGeoStatus.value.isError = postDeviceGeoStatus.value.code === 'fail' ? true : false
      postDeviceGeoStatus.value.message = err.response.data === undefined ? err.message : String(err.response.data.error.errors[0].field + ',' + err.response.data.error.errors[0].message)
      postDeviceGeoIsLoading.value = false
      return err
    }
  }

  return {
    devicesList, isLoading, loadDevices, createDevices, deleteDevice, status, loadDevice, deviceData, createDeviceIsLoading,updateDeviceIsLoading, updateDevice
  }
})