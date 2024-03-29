<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import currentDateAndTime from '../../helpers/currentDateAndTime'
import { makeObjectLocal } from '../../helpers/makeObjectLocal'
import useCity from '../../hooks/city'
import services from '../../services'
import { ObjectLocal } from '../../types/cityResult'
import { ForecastResult } from '../../types/forecastResults'

type State = {
  data: ForecastResult | any
  cityName: string
  cityInLocalStorage: boolean
  objectLocalId: string
}

interface SetupReturn {
  state: State
  getIcon: (icon: string) => string
  removeCity: () => void
  saveCity: () => void
}

export default defineComponent({
  async setup(): Promise<SetupReturn> {
    const state = reactive<State>({
      data: {},
      cityName: '',
      cityInLocalStorage: false,
      objectLocalId: ''
    })

    const route = useRoute()
    const router = useRouter()
    const city = useCity()

    try {
      const lat = Number(route.query.lat)
      const lon = Number(route.query.lon)
      state.cityName = String(route.params.city)
      state.cityInLocalStorage = city.citySaved(state.cityName)
      const { data, errors } = await services.weather.getForecastData(lat, lon)

      if (errors) {
        throw new Error(errors.statusText)
      }

      await new Promise((res) => setTimeout(res, 1000))

      state.data = currentDateAndTime(data)
    } catch (error) {
      console.log(error)
    }

    function getIcon(icon: string): string {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`
    }

    function saveCity() {
      toast.clearAll()
      const objectLocal: ObjectLocal = makeObjectLocal(route)
      state.objectLocalId = objectLocal.id
      if (!state.cityInLocalStorage) {
        try {
          city.saveCity(objectLocal)
          setTimeout(() => {
            state.cityInLocalStorage = true
            toast('Cidade salva!', { type: 'success' })
          }, 500)
        } catch (error) {
          console.log('')
          toast('Ocorreu algum erro ao salva!', { type: 'error' })
        }
      }
    }

    function removeCity() {
      if (!route.query.id) {
        city.removeCity(state.objectLocalId)
      }
      else {
        city.removeCity(String(route.query.id))
      }
      setTimeout(() => {
        router.push({ name: 'home' })
      }, 400)
    }

    return {
      state,
      getIcon,
      removeCity,
      saveCity
    }
  }
})
</script>

<template>
  <div class="w-full flex justify-center mt-1">
    <div class="w-11/12 p-2 flex flex-col gap-3 items-center lg:gap-4">
      <div class="w-11/12 bg-blue-primary text-white rounded-lg p-2 flex items-center flex-col gap-2 shadow-lg sm:w-10/12 md:w-4/5 lg:w-7/12">
        <div class="w-full p-1 mb-1 flex md:justify-center md:gap-2">
          <div class="flex flex-col items-center h-full w-1/2 md:w-2/5">
            <p class="text-2xl mb-1 text-center">{{ state.cityName }}</p>
            <p class="mb-1 text-center">
              {{
                new Date(state.data.currentTime).toLocaleDateString('pt-br', { weekday: 'long' })

              }}
            </p>
            <p class="mb-1 text-center">
              {{
                new Date(state.data.currentTime).toLocaleDateString('pt-br', { day: '2-digit', month: 'long' })

              }} -
              {{
                new Date(state.data.currentTime).toLocaleTimeString('pt-br', { timeStyle: 'short' })

              }}
            </p>
            <p class="text-7xl mb-1">{{ Math.round(state.data.current.temp) }}&deg;</p>
          </div>

          <div class="w-1/2 h-full flex flex-col items-center mb-2 md:w-2/5">
            <p class="text-lg text-center lg:w-4/5">Sensação Térmica - {{ Math.round(state.data.current.feels_like) }}&deg;</p>
            <p class="text-lg capitalize">{{ state.data.current.weather[0].description }}</p>
            <img class="mt-auto" :src="getIcon(state.data.current.weather[0].icon)" :title="state.data.current.weather[0].description" alt="Ícone">
          </div>
        </div>

        <button v-if="!state.cityInLocalStorage" @click="saveCity" class="w-56 h-10 rounded-lg text-black bg-white flex justify-center items-center gap-2">
          <i class="fa-solid fa-plus"></i>
          <p>Salvar Cidade</p>
        </button>
        <button v-else @click="removeCity" class="w-56 h-10 rounded-lg bg-red-500 text-white flex justify-center items-center gap-2">
          <i class="fa-solid fa-trash"></i>
          <p>Remover Cidade</p>
        </button>
      </div>

      <div class="w-11/12 flex flex-col items-center gap-4 p-3 bg-blue-primary text-white rounded-lg shadow-lg sm:w-10/12 md:w-4/5 lg:w-7/12">
        <div class="w-full flex flex-col gap-2">
          <h2 class="text-lg text-center">Previsão de hora em hora</h2>

          <div class="flex gap-4 p-2 overflow-x-auto">
            <div v-for="hour in state.data.hourly" :id="hour.dt" class="flex flex-col gap-2 bg-blue-500 rounded-lg items-center px-4 py-2">
              <p>{{ new Date(hour.currentTime).toLocaleTimeString('pt-br', { timeStyle: 'short' }) }}</p>
              <img :src="getIcon(hour.weather[0].icon)" alt="Ícone" :title="hour.weather[0].description">
              <p>{{ Math.round(hour.temp) }}&deg;</p>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col gap-2">
          <h2 class="text-lg text-center">Previsão para os próximos 7 dias</h2>

          <div class="flex gap-4 p-2 pc overflow-x-scroll xl:justify-self-auto">
            <div v-for="(day, index) in state.data.daily" :key="day.dt" class="flex flex-col items-center rounded-lg bg-blue-500 py-2 px-4 shadow-lg" :class="{ 'border border-red-500': index === 0 }">
              <p class="capitalize px-3">{{ new Date(day.dt * 1000).toLocaleDateString('pt-br', { weekday: 'short', day: '2-digit', month: '2-digit' }) }}</p>
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