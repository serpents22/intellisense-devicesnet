import { defineStore } from 'pinia'
import dataAPI from '@/services/dataAPI'
import { ref } from 'vue'

export const useGeoDataStore = defineStore('geo', {
  state: () => ({
    deviceGeo: ref(),
    isLoading: ref(false),
    status: ref({
      state:null,
      message: null,
      code: null,
    })
  }),

  actions: {
    async getLastDeviceGeo(params) {
      this.isLoading = true
      try {
        const res = await dataAPI.getLastDeviceGeo(params)
        this.deviceGeo = res.data
        this.isLoading = false
      } catch (err) {
        console.error(err)
        this.isLoading = false
        return err
      }
    },
    async getHistoryDeviceGeo(params) {
      this.isLoading = true
      try {
        const res = await dataAPI.getHistoryDeviceGeo(params)
        this.deviceGeo = res.data
        this.isLoading = false
      } catch (err) {
        console.error(err)
        this.isLoading = false
        return err
      }
    }
  }
})
