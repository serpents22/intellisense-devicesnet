import axios from "axios";
import apiClient from "./API";



export default {
  getLast(params) {
    return apiClient.get('data/last',{ params })
  },

  getHistory(params) {
    return apiClient.get('data/history',{ params })
  },

  postControl(device_code,data) {
    return apiClient.post(`device/control/${device_code}`,data)
  },

}