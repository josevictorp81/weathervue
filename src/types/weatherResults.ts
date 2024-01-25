export type Hourly = {
  dt: number
  currentTime?: number
}

export type WeatherResult = {
  timezone_offset: number
  current: { dt: number }
  hourly: Hourly[]
  currentTime?: number
}
