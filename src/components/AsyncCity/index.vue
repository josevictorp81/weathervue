<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import currentDateAndTime from '../../helpers/currentDateAndTime'
import services from '../../services'
import { WeatherResult } from '../../types/weatherResults'

type State = {
  data: WeatherResult | {}
}

interface SetupReturn {
  state: State
}

export default defineComponent({
  async setup(): Promise<SetupReturn> {
    const state = reactive<State>({
      data: {}
    })

    const route = useRoute()

    try {
      const lat = Number(route.query.lat)
      const lon = Number(route.query.lon)
      const { data, errors } = await services.weather.getWeatherData(lat, lon)

      if (errors) {
        throw new Error(errors.statusText)
      }

      state.data = currentDateAndTime(data)
    } catch (error) {
      console.log('erro')
    }
    console.log(state.data)
    return {
      state
    }
  }
})
</script>

<template></template>

<style scoped></style>