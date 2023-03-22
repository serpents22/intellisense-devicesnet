import router from "@/router";
import axios from "axios"


  const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    }
  })

  const authInterceptor = (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem('auth.token')}`;
    return config
  }

  apiClient.interceptors.request.use(authInterceptor)

  export default apiClient

