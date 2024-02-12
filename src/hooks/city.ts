import { City, ObjectLocal } from '../types/cityResult'

interface UseCity {
  getCities: () => City
  saveCity: (city: ObjectLocal) => void
  citySaved: (cityName: string) => boolean
  removeCity: (id: string) => void
}

export default function useCity(): UseCity {
  function getCities(): City {
    if (localStorage.getItem('savedCities')) {
      const res: City = JSON.parse(
        localStorage.getItem('savedCities') as string
      )
      return res
    }
    return {
      cities: [],
    }
  }

  function saveCity(city: ObjectLocal): void {
    const res = getCities()
    res.cities.push(city)
    localStorage.setItem('savedCities', JSON.stringify(res))
  }

  function citySaved(cityName: string): boolean {
    const res = getCities()
    const exists = res.cities.filter((c) => c.city === cityName)
    if (exists.length) {
      return true
    }
    return false
  }

  function removeCity(cityId: string): void {
    const res = getCities()
    res.cities = res.cities.filter((c) => c.id !== cityId)
    localStorage.setItem('savedCities', JSON.stringify(res))
  }

  return {
    getCities,
    saveCity,
    citySaved,
    removeCity,
  }
}
