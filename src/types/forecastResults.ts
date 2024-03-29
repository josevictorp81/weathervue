export type Weather = {
  description: string
  icon: string
}

export type Hourly = {
  dt: number
  currentTime?: number
  weather: Weather[]
  temp: number
}

type Current = {
  dt: number
  temp: number
  feels_like: number
  weather: Weather[]
}

type Daily = {
  dt: number
  weather: Weather[]
}

export type ForecastResult = {
  timezone_offset: number
  current: Current
  hourly: Hourly[]
  daily: Daily
  currentTime?: number
}
