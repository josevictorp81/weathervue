import { ObjectLocal } from '../types/cities'

export function verifyCityExists(data: ObjectLocal[], city: string): boolean {
  const quntatity = data.filter((c) => c.city === city)
  return !!quntatity.length
}
