import { Weather } from './forecastResults'

type Main = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  humidity: number
}

export type WeatherResult = {
  weather: Weather[]
  main: Main
  id: number
}
