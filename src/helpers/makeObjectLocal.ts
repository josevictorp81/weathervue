import { uid } from 'uid'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { ObjectLocal } from '../types/cityResult'

export function makeObjectLocal(
  route: RouteLocationNormalizedLoaded
): ObjectLocal {
  return {
    id: uid(),
    state: route.params.state as string,
    city: route.params.city as string,
    coords: {
      lat: Number(route.query.lat),
      lon: Number(route.query.lon),
    },
  }
}
