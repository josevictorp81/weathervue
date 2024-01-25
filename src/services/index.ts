import axios from 'axios'
import locationService from './location'
import weatherService from './weather'

const httpClient = axios.create()

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const canThrowError =
      error.request.status === 0 || error.request.status === 500

    if (canThrowError) {
      throw new Error(error.message)
    }
    return error
  }
)

export default {
  location: locationService(httpClient),
  weather: weatherService(httpClient),
}
