import { defineStore } from 'pinia'
import dataAPI from '@/services/dataAPI'
import { ref } from 'vue'
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Load the English locale

dayjs.locale('en'); // Set the locale to English

export const useCANDataStore = defineStore('data', () => {
  
  const CANData = ref({
    dataID: null,
    dataValue: 'test'
  })
  const loading = ref(false)
  const status = ref({
    state:null,
    message: null,
    code: null, 
  })
  
  const getCANData = async (imei, avlId, dataId) => {
    loading.value = true
    const params = ref({
      imei:imei,
      avlId:avlId,
      enableDecode:true,
      maskingBit:'65535',
      dataId: dataId
    })
    try {
      const res = await dataAPI.getLast(params.value)
      CANData.value.dataID = res.data.dataId
      CANData.value.dataValue = res.data.data[0] === undefined ? 'No Data' : res.data.data[0].decodedData
      console.log(CANData.value)
      loading.value = false
      return res
    } catch (err) { 
      console.error(err)
      loading.value = false
      return err
    } 
  }
  
  const getGSMSignal = async (imei) => {
    const res = await getLastData(imei,'21')
    lastData.value.GSMSignal = res.data.data.length === 0 ? 'no data' : res.data.data[0].AVLValue
  } 
  

  return {
    CANData,
    loading,
    status,
    getCANData,
  }
})