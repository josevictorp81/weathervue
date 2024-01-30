import { ForecastResult } from '../types/forecastResults'

export default function currentDateAndTime(
  data: ForecastResult
): ForecastResult {
  const localOffset: number = new Date().getTimezoneOffset() * 60000

  const utc: number = data.current.dt * 1000 + localOffset

  data.currentTime = utc + 1000 * data.timezone_offset

  data.hourly.forEach((hour) => {
    const utc: number = hour.dt * 1000 + localOffset
    hour.currentTime = utc + 1000 * data.timezone_offset
  })

  return data
}
