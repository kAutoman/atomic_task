/**
 * services
 */
import axios from "axios"
import { ROOT } from "../../constants"

class ApiService {
  constructor() {
    axios.interceptors.request.use(
      config => {
        config.baseURL = ROOT.PAYMENT_URL
        return config
      },
      error => Promise.reject(error)
    )
    axios.interceptors.response.use(
      response => response,
      error => {
        return Promise.reject(error)
      }
    )
    axios.interceptors.response.use(
      response => response,
      error => {
        return Promise.reject(error)
      }
    )
  }

  GetClientSecret(...args) {
    return axios.post(ROOT.GetClientSecret, ...args)
  }

}

export const useApi = () => {
  return new ApiService()
}

export * from './navigator'