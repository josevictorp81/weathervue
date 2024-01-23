import axios from 'axios'
import locationService from './location'

const httpClient = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
})

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
}
