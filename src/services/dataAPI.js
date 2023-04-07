import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  }
})

const authInterceptor = (config) => {
  config.headers.Authorization = 'Basic ' + btoa(`${process.env.VUE_APP_API_USER}:${process.env.VUE_APP_API_PASS}`)
  return config
}

// Set up an interceptor to include bearer token
apiClient.interceptors.request.use(authInterceptor)

export default {
  getLast(params) {
    return apiClient.get('data-device/last',{ params })
  },

  getHistory(params) {
    return apiClient.get('data-device/history',{ params })
  },

  getDevicesStatus() {
    return apiClient.get('data-device/tcp')
  },

  getDeviceStatus(imei) {
    return apiClient.get(`data-device/tcp/${imei}`) 
  },
}