import { defineStore } from 'pinia'
import dataAPI from '@/services/dataAPI'
import { ref } from 'vue'
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Load the English locale

dayjs.locale('en'); // Set the locale to English

export const useRealtimeDataStore = defineStore('realtimedata', () => {
  
  const devicesStatus = ref([null])
  const deviceStatus = ref()
  const lastData = ref ({})
  const loading = ref(false)
  const status = ref({
    state:null,
    message: null,
    code: null, 
  })

  const getLastData = async (imei, avlId) => {
    try {
      loading.value = true
      const params = ref({
        imei:imei,
        avlId:avlId
      })
      const res = await dataAPI.getLast(params.value)
      loading.value = false
      return res
    } catch (err) { 
      console.error(err)
      loading.value = false
      return '-'
    } 
  }
  
  const getGSMSignal = async (imei) => {
    const res = await getLastData(imei,'21')
    return res === '-' ? '-' : res.data.data.AVLValue
  }
  const getDataMode = async (imei) => {
    const res = await getLastData(imei,'22')
    return res === '-' ? '-' : res.data.data.AVLValue
  }
  const getSpeed = async (imei) => {
    const res = await getLastData(imei,'24')
    return res === '-' ? '-' : res.data.data.AVLValue
  }
  const getExternalVoltage = async (imei) => {
    const res = await getLastData(imei,'66')
    return res === '-' ? '-' : res.data.data.AVLValue
  }
  const getBatteryVoltage = async (imei) => {
    const res = await getLastData(imei,'67')
    return res === '-' ? '-' : res.data.data.AVLValue
  }
  const getBatteryCurrent = async (imei) => {
    const res = await getLastData(imei,'68')
    return res === '-' ? '-' : res.data.data.AVLValue
  }
  const getGNSSStatus = async (imei) => {
    const res = await getLastData(imei,'71')
    return res === '-' ? '-' : res.data.data.AVLValue
  }
  const getGNSSPDOP = async (imei) => {
    const res = await getLastData(imei,'181')
    return res === '-' ? '-' : res.data.data.AVLValue
  }
  const getGNSSHDOP = async (imei) => {
    const res = await getLastData(imei,'182')
    return res === '-' ? '-' : res.data.data.AVLValue
  }
  const getSleepMode = async (imei) => {
    const res = await getLastData(imei,'200')
    return res === '-' ? '-' : Boolean(res.data.data.AVLValue)
  }
  const getIgnition = async (imei) => {
    const res = await getLastData(imei,'239')
    return res === '-' ? '-' : Boolean(res.data.data.AVLValue)
  }
  const getMovement = async (imei) => {
    const res = await getLastData(imei,'240')
    return res === '-' ? '-' : Boolean(res.data.data.AVLValue)
  }
  const getTimestamp = async (imei) => {
    const res = await getLastData(imei,'194')
    return res === '-' ? '-' : new Date(res.data.data.AVLValue*1000)
  }

  const getDevicesStatus = async () => {
    loading.value = true
    try {
      const res = await dataAPI.getDevicesStatus()
      devicesStatus.value = res.data
      console.log(devicesStatus.value) 
    
    devicesStatus.value.map((data) => {
      data.lastHandshake = dayjs(data._time).format('M/D/YY [at] h:mmA')
      switch (data.status) { 
        case 'OFFLINE':
          data.indicator = 0
        break;
        case 'ONLINE':
          data.indicator = 1
        break;
        default:
          data.indicator = 0
          break;
      }
    })
       
      loading.value = false
    } catch (err) { 
      console.error(err)
      loading.value = false
      return err
    } 
  }

  const getDeviceStatus = async (imei) => {
    loading.value = true
    try {
      const res = await dataAPI.getDeviceStatus(imei)
      deviceStatus.value = res.data
      
      deviceStatus.value.lastHandshake = dayjs(deviceStatus.value._time).format('M/D/YY [at] h:mmA')
      switch (deviceStatus.value.status) { 
        case 'OFFLINE':
          deviceStatus.value.indicator = 0
        break;
        case 'ONLINE':
          deviceStatus.value.indicator = 1
        break;
        default:
          deviceStatus.value.indicator = 0
          break;
      }
       
      loading.value = false
    } catch (err) { 
      console.error(err)
      loading.value = false
      return err
    } 
  }

  return {
    lastData,
    loading,
    status,
    devicesStatus,
    deviceStatus,
    getGSMSignal,
    getDataMode,
    getSpeed,
    getExternalVoltage,
    getBatteryVoltage,
    getBatteryCurrent,
    getGNSSStatus,
    getGNSSPDOP,
    getGNSSHDOP,
    getSleepMode,
    getIgnition,
    getMovement,
    getTimestamp,
    getDevicesStatus,
    getDeviceStatus,
  }
})