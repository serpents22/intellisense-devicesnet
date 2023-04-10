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
    loading.value = true
    const params = ref({
      imei:imei,
      avlId:avlId
    })
    try {
      const res = await dataAPI.getLast(params.value)
      loading.value = false
      return res.data.data.AVLValue
    } catch (err) { 
      console.error(err)
      loading.value = false
      return err
    } 
  }
  
  const getGSMSignal = async (imei) => {
    const res = await getLastData(imei,'21')
    lastData.value.GSMSignal = res.data.data.length === 0 ? 'no data' : res.data.data.AVLValue
  }
  const getDataMode = async (imei) => {
    const res = await getLastData(imei,'22')
    lastData.value.dataMode = res.data.data.length === 0 ? 'no data' : res.data.data.AVLValue
  }
  const getSpeed = async (imei) => {
    const res = await getLastData(imei,'24')
    lastData.value.speed = res.data.data.length === 0 ? 'no data' : res.data.data.AVLValue
  }
  const getExternalVoltage = async (imei) => {
    const res = await getLastData(imei,'66')
    lastData.value.externalVoltage = res.data.data.length === 0 ? 'no data' : res.data.data.AVLValue
  }
  const getBatteryVoltage = async (imei) => {
    const res = await getLastData(imei,'67')
    lastData.value.batteryVoltage = res.data.data.length === 0 ? 'no data' : res.data.data.AVLValue
  }
  const getBatteryCurrent = async (imei) => {
    const res = await getLastData(imei,'68')
    lastData.value.batteryCurrent = res.data.data.length === 0 ? 'no data' : res.data.data.AVLValue
  }
  const getGNSSStatus = async (imei) => {
    const res = await getLastData(imei,'71')
    lastData.value.GNSSStatus = res.data.data.length === 0 ? 'no data' : res.data.data.AVLValue
  }
  const getGNSSPDOP = async (imei) => {
    const res = await getLastData(imei,'181')
    lastData.value.GNSSPDOP = res.data.data.length === 0 ? 'no data' : res.data.data.AVLValue
  }
  const getGNSSHDOP = async (imei) => {
    const res = await getLastData(imei,'182')
    lastData.value.GNSSHDOP = res.data.data.length === 0 ? 'no data' : res.data.data.AVLValue
  }
  const getSleepMode = async (imei) => {
    const res = await getLastData(imei,'200')
    lastData.value.sleepMode = res.data.data.length === 0 ? 'no data' : Boolean(res.data.data.AVLValue)
  }
  const getIgnition = async (imei) => {
    const res = await getLastData(imei,'239')
    lastData.value.GSMSignal = res.data.data.length === 0 ? 'no data' : Boolean(res.data.data.AVLValue)
  }
  const getMovement = async (imei) => {
    const res = await getLastData(imei,'240')
    lastData.value.movement = res.data.data.length === 0 ? 'no data' : Boolean(res.data.data.AVLValue)
  }
  const getTimestamp = async (imei) => {
    const res = await getLastData(imei,'194')
    lastData.value.timestamp = res.data.data.length === 0 ? 'no data' : new Date(res.data.data.AVLValue*1000)
  }

  const getDevicesStatus = async () => {
    loading.value = true
    try {
      const res = await dataAPI.getDevicesStatus()
      
      res.data.map(async(data) => {
        const res = await getLastData(data.imei,'67')
        
        data.batteryVoltage = res

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
      devicesStatus.value = res.data
      console.log(devicesStatus.value )

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
    getDeviceStatus
  }
})