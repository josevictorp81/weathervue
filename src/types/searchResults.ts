export type Feature = {
  id: string
  place_name: string
  geometry: { type: string; coordinates: number[] }
}

export type SearchResult = {
  features: Feature[]
}
