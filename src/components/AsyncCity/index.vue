<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import currentDateAndTime from '../../helpers/currentDateAndTime'
import services from '../../services'
import { City } from '../../types/cityResult'
import { ForecastResult } from '../../types/forecastResults'

type State = {
  data: ForecastResult | any
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
      cityName: '',
    })

    // const savedCities = reactive<City>({
    //   cities: []
    // })

    const route = useRoute()
    const router = useRouter()

    try {
      const lat = Number(route.query.lat)
      const lon = Number(route.query.lon)
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

    // function addCityToLocalStorage() {
    //   if (localStorage.getItem('savedCities')) {
    //     const saved: City = JSON.parse(localStorage.getItem('savedCities') as string)
    //     savedCities.cities = saved.cities
    //   }

    //   const objectLocal: ObjectLocal = makeObjectLOcal(route)
    //   const exists = verifyCityExists(savedCities.cities, objectLocal.city)
    //   if (!exists) {
    //     savedCities.cities.push(objectLocal)
    //     state.showSaveCity = !state.showSaveCity
    //   }

    //   localStorage.setItem('savedCities', JSON.stringify(savedCities))

    //   let query = Object.assign({}, route.query)
    //   delete query.preview
    //   router.replace({ query })
    // }

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
      removeCity,
    }
  }
})
</script>

<template>
  <div class="w-full flex justify-center mt-2">
    <div class="w-11/12 p-2 flex flex-col gap-4 items-center lg:flex-row lg:gap-6">
      <div class="w-11/12 bg-zinc-300 rounded-md p-3 flex items-center flex-col shadow-lg sm:w-10/12 md:w-4/5 lg:w-5/12">
        <p class="text-3xl mb-2">{{ state.cityName }}</p>
        <p class="mb-2">
          {{
            new Date(state.data.currentTime).toLocaleDateString('pt-br', { weekday: 'short', day: '2-digit', month: 'long' })

          }}
          {{
            new Date(state.data.currentTime).toLocaleTimeString('pt-br', { timeStyle: 'short' })

          }}
        </p>
        <p class="text-7xl mb-2">{{ Math.round(state.data.current.temp) }}&deg;</p>

        <div class="w-9/12 flex flex-col items-center pt-2 mb-2">
          <p class="text-lg text-center lg:w-4/5">Sensação Térmica - {{ Math.round(state.data.current.feels_like) }}&deg;</p>
          <p class="text-lg capitalize">{{ state.data.current.weather[0].description }}</p>
          <img :src="getIcon(state.data.current.weather[0].icon)" :title="state.data.current.weather[0].description" alt="Ícone">
        </div>

        <button class="w-2/5 sm:w-56 h-10 rounded-lg bg-blue-500 mb-1 text-white text-lg flex justify-center items-center gap-2">
          <i class="fa-solid fa-plus"></i>
          <p class="">Salva Cidade</p>
        </button>
        <button class="w-2/5 sm:w-56 h-10 rounded-lg bg-red-500 mb-1 text-white text-lg flex justify-center items-center gap-2">
          <i class="fa-solid fa-trash"></i>
          <p class="">Remover Cidade</p>
        </button>
      </div>

      <div class="w-11/12 flex flex-col items-center gap-4 p-3 bg-zinc-300 rounded-lg shadow-lg sm:w-10/12 md:w-4/5 lg:w-7/12">
        <div class="w-full flex flex-col gap-2">
          <h2 class="text-lg text-center">Previsão de hora em hora</h2>

          <div class="flex gap-4 py-2 px-2 overflow-x-auto">
            <div v-for="hour in state.data.hourly" :id="hour.dt" class="flex flex-col gap-4 bg-zinc-400 rounded-md items-center px-5 py-3">
              <p class="">{{ new Date(hour.currentTime).toLocaleTimeString('pt-br', { timeStyle: 'short' }) }}</p>
              <img :src="getIcon(hour.weather[0].icon)" alt="Ícone" :title="hour.weather[0].description">
              <p>{{ Math.round(hour.temp) }}&deg;</p>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col gap-2">
          <h2 class="text-lg text-center">Previsão para os próximos 7 dias</h2>

          <div class="flex gap-3 py-2 flex-wrap justify-center xl:justify-self-auto">
            <div v-for="(day, index) in state.data.daily" :key="day.dt" class="flex flex-col items-center rounded-lg bg-zinc-400 py-3 px-2 shadow-lg" :class="{ 'border border-red-500': index === 0 }">
              <p class="capitalize">{{ new Date(day.dt * 1000).toLocaleDateString('pt-br', { weekday: 'short', day: '2-digit', month: '2-digit' }) }}</p>
              <img :src="getIcon(day.weather[0].icon)" alt="Ícone" :title="day.weather[0].description">
              <div class="flex flex-col items-center">
                <p>Max: {{ Math.round(day.temp.max) }}&deg;</p>
                <p>Min: {{ Math.round(day.temp.min) }}&deg;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>