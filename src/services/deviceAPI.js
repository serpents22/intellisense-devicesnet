import axios from "axios";
import apiClient from "./API";



export default {
  getDevices() {
    return apiClient.get('devices')
  },

  getDevice(id) {
    return apiClient.get(`devices/${id}`)
  },

  postDevices(data) {
    return apiClient.post('device', data)
  },
  updateDevice(id,data) {
    return apiClient.put(`device/${id}`, data)
  },

  deleteDevice(id) {
    return apiClient.delete(`device/${id}`)
  },

}