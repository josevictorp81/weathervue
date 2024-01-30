import { Weather } from './forecastResults'

type Coord = {
  lon: number
  lat: number
}
type Main = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  humidity: number
}

export type WeatherResult = {
  coord: Coord
  weather: Weather[]
  main: Main
  id: number
  name: string
}
