<script lang='ts'>
import { defineComponent, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import currentDateAndTime from '../../helpers/currentDateAndTime'
import services from '../../services'
import { City } from '../../types/cityResult'
import { ForecastResult } from '../../types/forecastResults'

type State = {
  data: ForecastResult | any
  previewWeather: boolean
  cityName: string
}

interface SetupReturn {
  state: State
  getIcon: (icon: string) => string
  removeCity: () => void
}

export default defineComponent({
  async setup(): Promise<SetupReturn> {
    const state = reactive<State>({
      data: {},
      previewWeather: false,
      cityName: ''
    })

    const route = useRoute()
    const router = useRouter()

    watch(() => route.query, () => state.previewWeather = false)

    try {
      const lat = Number(route.query.lat)
      const lon = Number(route.query.lon)
      state.previewWeather = Boolean(route.query.preview)
      state.cityName = String(route.params.city)
      const { data, errors } = await services.weather.getForecastData(lat, lon)

      if (errors) {
        throw new Error(errors.statusText)
      }

      await new Promise((res) => setTimeout(res, 1000))

      state.data = currentDateAndTime(data)
    } catch (error) {
      console.log('erro')
    }

    function getIcon(icon: string): string {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`
    }

    function removeCity() {
      const query = String(route.query.id)
      const cities: City = JSON.parse(localStorage.getItem('savedCities') as string)
      cities.cities = cities.cities.filter((city) => city.id !== query)
      localStorage.setItem('savedCities', JSON.stringify(cities))
      router.push({ name: 'home' })
    }

    return {
      state,
      getIcon,
      removeCity
    }
  }
})
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <div v-if="state.previewWeather" class="text-white px-4 py-2 bg-weather-secondary w-full text-center">
      <p>
        Você está visualizando esta cidade no momento, clique no botão "+"
        para começar a rastrear esta cidade.
      </p>
    </div>

    <!--  -->
    <div class="flex flex-col items-center text-white pt-8 pb-4">
      <h1 class="text-4xl mb-2">{{ state.cityName }}</h1>
      <p class="text-sm mb-4">
        {{
          new Date(state.data.currentTime).toLocaleDateString('pt-br', { weekday: 'short', day: '2-digit', month: 'long' })
        }}
        {{
          new Date(state.data.currentTime).toLocaleTimeString('pt-br', { timeStyle: 'short' })
        }}
      </p>

      <p class="text-8xl mb-4">
        {{ Math.round(state.data.current.temp) }}&deg;
      </p>

      <div class="flex flex-col items-center">
        <p>
          Sensação Térmica - {{ Math.round(state.data.current.feels_like) }}&deg;
        </p>
        <p class="capitalize">
          {{ state.data.current.weather[0].description }}
        </p>
        <img :src="getIcon(state.data.current.weather[0].icon)" :title="state.data.current.weather[0].description" alt="Icone do clima">
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full">

    <!-- tempo de hora em hora -->
    <div class="max-w-screen-md w-full py-8">
      <div class="mx-8 text-white">
        <h2 class="mb-2 text-xl">Previsão de hora em hora</h2>
        <div class="flex gap-10 overflow-x-hidden hover:overflow-x-scroll">
          <div v-for="hour in state.data.hourly" :key="hour.dt" class="flex flex-col gap-4 items-center">
            <p class="text-md whitespace-nowrap">
              {{
                new Date(hour.currentTime).toLocaleTimeString('pt-br', { timeStyle: 'short' })
              }}
            </p>
            <img class="h-[60px] w-auto object-cover" :src="getIcon(hour.weather[0].icon)" :title="hour.weather[0].description" alt="Icone do clima">
            <p class="text-xl mb-4">
              {{ Math.round(hour.temp) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full">

    <!-- tempo dia a dia -->
    <div class="max-w-screen-md w-full py-8">
      <div class="mx-8 text-white">
        <h2 class="mb-2 text-xl">Previsão para a semana</h2>
        <div v-for="day in state.data.daily" :key="day.dt" class="flex items-center">
          <p class="flex-1 capitalize">
            {{ new Date(day.dt * 1000).toLocaleDateString('pt-br', {
              weekday: 'long'
            }) }}
          </p>
          <img class="w-[50px] h-[50px] object-cover" :src="getIcon(day.weather[0].icon)" :title="day.weather[0].description" alt="Icone do clima">
          <div class="flex gap-2 flex-1 justify-end">
            <p class="p-1">Min: {{ Math.round(day.temp.min) }}&deg;,</p>
            <p class="p-1">Máx: {{ Math.round(day.temp.max) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <div @click="removeCity" class="flex items-center gap-2 py-8 text-white cursor-pointer duration-150 hover:text-red-500">
      <i class="fa-solid fa-trash"></i>
      <p>Remover Cidade</p>
    </div>
  </div>
</template>

<style scoped></style>