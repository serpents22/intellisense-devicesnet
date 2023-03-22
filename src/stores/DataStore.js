import { defineStore } from 'pinia'
import dataAPI from '@/services/dataAPI'
import { ref } from 'vue'

export const useDataStore = defineStore('data', () => {
  const fertConfig = ref([])
  const fertConfigIsLoading = ref(false)
  const pumpConfig = ref([])
  const pumpConfigIsLoading = ref(false)
  const pumpConfigLength = ref()
  const mvConfig = ref([])
  const mvConfigIsLoading = ref(false)
  const mvConfigLength = ref()
  const satConfig = ref([])
  const satConfigIsLoading = ref(false)
  const satTimes = ref([])
  const satTimesIsLoading = ref(false)
  const satTimesLength = ref()
  const satStarts = ref([])
  const satStartsIsLoading = ref(false)
  const satStartsLength = ref()
  const meteoStat = ref([])
  const evConfig = ref([])
  const evConfigLength = ref([])
  const evStation = ref([])
  const evStationLength = ref([])
  const satStat = ref ([])
  const satStatIsLoading = ref(false)
  const gropointStat = ref ([])
  const gropointStatIsLoading = ref(false)
  const gropointStatLength = ref()
  const icodConfig =ref ([])
  const icodConfigIsLoading =ref ([])
  const icodConfigLength =ref ([])
  const historicalData = ref([])
  const historicalDataIsLoading = ref(false)
  const historicalDataLength = ref()
  const isLoading = ref(false)
  const evConfigIsLoading = ref(false)
  const evStationIsLoading = ref(false)
  const postControlIsLoading = ref(false)
  const status = ref({
    message: null,
    code: null,
  })

  const postControl = async (device_code, data) => {
    postControlIsLoading.value = true
    try {
      await dataAPI.postControl(device_code, data)
      postControlIsLoading.value = false

    } catch (err) {
      console.error(err)
      postControlIsLoading.value = false
    return err
    } 
  }

  const getLastMeteoStat = async (params) => {
    isLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      meteoStat.value = res.data.data
      isLoading.value = false
  } catch (err) {
      console.error(err)
      isLoading.value = false
      return err
    } 
  }

  const getLastSatStat = async (params) => {
    satStatIsLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      satStat.value = res.data.data
      satStatIsLoading.value = false
  } catch (err) {
      console.error(err)
      satStatIsLoading.value = false
      return err
    } 
  }

  const getLastGropointStat = async (params) => {
    gropointStatIsLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      gropointStat.value = res.data.data
      gropointStatLength.value = res.data.data === undefined ? 0 : Object.keys(res.data.data).length - 6
      gropointStatIsLoading.value = false
  } catch (err) {
      console.error(err)
      gropointStatIsLoading.value = false
      return err
    } 
  }

  const getLastEvConfig = async (params) => {
      evConfigIsLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      evConfig.value = res.data.data
      evConfigLength.value = res.data.data === undefined ? 0 : Object.keys(res.data.data).length - 6
      evConfigIsLoading.value = false
  } catch (err) {
      console.error(err)
      evConfigIsLoading.value = false
      return err
    } 
  }

  const getLastEvStation = async (params) => {
      isLoading.value = true
      evStationIsLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      evStation.value = res.data.data
      evStationLength.value = res.data.data === undefined ? 0 : Object.keys(res.data.data).length - 6
      isLoading.value = false
      evStationIsLoading.value = false
  } catch (err) {
      console.error(err)
      isLoading.value = false
      evStationIsLoading.value = false
      return err
    } 
  }
  const getLastIcodConfig = async (params) => {
    icodConfigIsLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      icodConfig.value = res.data.data
      icodConfigLength.value = res.data.data === undefined ? 0 : Object.keys(res.data.data).length - 6
      icodConfigIsLoading.value = false
  } catch (err) {
      console.error(err)
      icodConfigIsLoading.value = false
      return err
    } 
  }
  const getLastFertConfig = async (params) => {
    fertConfigIsLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      fertConfig.value = res.data.data
      fertConfigIsLoading.value = false
  } catch (err) {
      console.error(err)
      fertConfigIsLoading.value = false
      return err
    } 
  }
  const getLastSatConfig = async (params) => {
    satConfigIsLoading.value = true
    isLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      satConfig.value = res.data.data
      isLoading.value = false
      satConfigIsLoading.value = false
  } catch (err) {
      console.error(err)
      isLoading.value = false
      satConfigIsLoading.value = false
      return err
    } 
  }
  const getLastSatTimes = async (params) => {
    satTimesIsLoading.value = true
    isLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      satTimes.value = res.data.data
      isLoading.value = false
      satTimesLength.value = res.data.data === undefined ? 0 : Object.keys(res.data.data).length - 6
      satTimesIsLoading.value = false
  } catch (err) {
      console.error(err)
      isLoading.value = false
      satTimesIsLoading.value = false
      return err
    } 
  }
  const getLastSatStarts = async (params) => {
    satStartsIsLoading.value = true
    isLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      satStarts.value = res.data.data
      isLoading.value = false
      satStartsLength.value = res.data.data === undefined ? 0 : Object.keys(res.data.data).length - 6
      satStartsIsLoading.value = false
  } catch (err) {
      console.error(err)
      isLoading.value = false
      satStartsIsLoading.value = false
      return err
    } 
  }
  const getLastPumpConfig = async (params) => {
      isLoading.value = true
      pumpConfigIsLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      pumpConfig.value = res.data.data
      isLoading.value = false
      pumpConfigLength.value = res.data.data === undefined ? 0 : Object.keys(res.data.data).length - 6
      pumpConfigIsLoading.value = false
  } catch (err) {
      console.error(err)
      isLoading.value = false
      pumpConfigIsLoading.value = false
      return err
    } 
  }
  const getLastMvConfig = async (params) => {
    mvConfigIsLoading.value = true
    try {
      const res = await dataAPI.getLast(params)
      mvConfig.value = res.data.data
      mvConfigLength.value = res.data.data === undefined ? 0 : Object.keys(res.data.data).length - 6
      mvConfigIsLoading.value = false
  } catch (err) {
      console.error(err)
      mvConfigIsLoading.value = false
      return err
    } 
  }

  const getHistoricalData = async (params) => {
    historicalDataIsLoading.value = true
    try {
      const res = await dataAPI.getHistory(params)
      historicalData.value = res.data.data
      historicalDataLength.value = res.data.data === undefined ? 0 : Object.keys(res.data.data).length - 6
      historicalDataIsLoading.value = false
  } catch (err) {
      console.error(err)
      historicalDataIsLoading.value = false
      return err
    } 
  }



  return {
    meteoStat, satStat, isLoading, getLastMeteoStat, getLastSatStat, status, getLastGropointStat, gropointStat,
    satStatIsLoading,
    getLastEvConfig, evConfig, evConfigIsLoading, evConfigLength, 
    getLastEvStation, evStation, evStationIsLoading, evStationLength, 
    postControl, postControlIsLoading,
    getLastIcodConfig, icodConfig, icodConfigIsLoading, icodConfigLength, fertConfig, fertConfigIsLoading, getLastFertConfig,
    satConfig, satConfigIsLoading, getLastSatConfig,
    satTimes, satTimesIsLoading, getLastSatTimes, satTimesLength,
    satStarts, satStartsIsLoading, getLastSatStarts, satStartsLength,
    pumpConfig, pumpConfigIsLoading, getLastPumpConfig, pumpConfigLength,
    mvConfig, mvConfigIsLoading, getLastMvConfig, mvConfigLength,gropointStatIsLoading, gropointStatLength,
    historicalData, historicalDataIsLoading, historicalDataLength, getHistoricalData
  }
})