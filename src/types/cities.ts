export type ObjectLocal = {
  id: string
  state: string
  city: string
  coords: {
    lat: number
    lon: number
  }
}

export type City = {
  cities: ObjectLocal[]
}
