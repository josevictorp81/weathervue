import { WeatherResult } from './weatherResults'

export type ObjectLocal = {
  id: string
  state: string
  city: string
  coords: {
    lat: number
    lon: number
  }
  weather?: WeatherResult
}

export type City = {
  cities: ObjectLocal[]
}
