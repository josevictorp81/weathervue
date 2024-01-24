import { AxiosInstance } from 'axios'
import { RequestError } from '../types/errors'
import { Feature, SearchResult } from '../types/searchResults'

type LocalReturn = {
  data: Feature[]
  errors: RequestError | null
}

interface ILocationService {
  getLocal: (local: string) => Promise<LocalReturn>
}

const token = import.meta.env.VITE_MAPBOX_KEY

export default (httpClient: AxiosInstance): ILocationService => ({
  getLocal: async (local: string): Promise<LocalReturn> => {
    const response = await httpClient.get<SearchResult>(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${token}&types=place`
    )

    let errors: RequestError | null = null
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText,
      }
    }

    return {
      data: response.data.features,
      errors,
    }
  },
})
