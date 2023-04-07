import { defineStore } from 'pinia'
import dataAPI from '@/services/dataAPI'
import { ref } from 'vue'

export const useDataStore = defineStore('data', () => {

  const historicalData = ref(null)
  const historicalDataIsLoading = ref(false)
  const status = ref({
    state:null,
    message: null,
    code: null,
  })


  const getHistoricalData = async (params) => {
    historicalDataIsLoading.value = true
    try {
      const res = await dataAPI.getHistory(params)
      console.log(res)
      historicalDataIsLoading.value = false
  } catch (err) {
      console.error(err)
      historicalDataIsLoading.value = false
      return err
    } 
  }



  return {
    getHistoricalData, historicalData, historicalDataIsLoading, status
  }
})