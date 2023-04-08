import { defineStore } from 'pinia'
import dataAPI from '@/services/dataAPI'
import { ref } from 'vue'
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Load the English locale

dayjs.locale('en'); // Set the locale to English

export const useCANDataStore = defineStore('candata', () => {
  
  const CANData = ref({
    dataID: null,
    dataValue: null
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
      CANData.value.dataValue = res.data.data.decodedData
      console.log(CANData.value)
      loading.value = false
      return res
    } catch (err) { 
      console.error(err)
      CANData.value.dataID = '-'
      CANData.value.dataValue = 'No Data'
      console.log(CANData.value)
      loading.value = false
      return err
    } 
  }

    
  // const getCANDatas = async (imei, avlId, dataId) => {
  //   loading.value = true
  //   const params = ref({
  //     imei:imei,
  //     avlId:avlId,
  //     enableDecode:true,
  //     maskingBit:'65535',
  //     dataId: dataId
  //   })
  //   for (let index = 0; index < 12; index++) {
  //     console.log(CANDatas.value)
  //     params.value.dataId = dataId[index]
  //     try {
  //       const res = await dataAPI.getLast(params.value)
  //       CANDatas.value[index].dataID = res.data.dataId
  //       CANDatas.value[index].dataValue =  res.data.data.decodedData
  //       loading.value = false
  //       return res
  //     } catch (err) { 
  //       console.error(err)
  //       CANDatas.value[index].dataID = '-'
  //       CANDatas.value[index].dataValue = 'No Data'
  //       loading.value = false
  //       return err
  //     } 
  //   }
  // }

  
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