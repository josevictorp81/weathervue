import { AxiosInstance } from 'axios'
import { RequestError } from '../types/errors'
import { WeatherResult } from '../types/weatherResults'

type WeatherReturn = {
  data: WeatherResult
  errors: RequestError | null
}

interface IWeatherService {
  getWeatherData: (lat: number, lng: number) => Promise<WeatherReturn>
}

const token = import.meta.env.VITE_WEATHER_KEY

export default (httpClient: AxiosInstance): IWeatherService => ({
  getWeatherData: async (lat: number, lon: number): Promise<WeatherReturn> => {
    const response = await httpClient.get<WeatherResult>(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${token}&lang=pt_br&units=metric`
    )

    let errors: RequestError | null = null
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText,
      }
    }

    return {
      data: response.data,
      errors,
    }
  },
})
