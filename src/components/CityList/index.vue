<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import services from '../../services'
import { City, ObjectLocal } from '../../types/cityResult'
import CityCard from '../CityCard/index.vue'

interface SetupReturn {
  state: City
  showCityView: (city: ObjectLocal) => void
}

export default defineComponent({
  components: { CityCard },
  async setup(): Promise<SetupReturn> {
    const state = reactive<City>({
      cities: []
    })

    const router = useRouter()

    async function getCities() {
      if (localStorage.getItem('savedCities')) {
        const saved: City = JSON.parse(localStorage.getItem('savedCities') as string)
        state.cities = saved.cities
      }
      await new Promise((res) => setTimeout(res, 1000))

      state.cities.forEach(async (city, index) => {
        const { data } = await services.weather.getWeatherData(city.coords.lat, city.coords.lon)
        state.cities[index].weather = data
      })
    }

    await getCities()

    function showCityView(city: ObjectLocal) {
      router.push({ name: 'city', params: { state: city.state, city: city.city }, query: { id: city.id, lat: city.coords.lat, lon: city.coords.lon } })
    }

    return {
      state,
      showCityView,
    }
  }
})
</script>

<template>
  <div v-for="city in state.cities" :key="city.id">
    <CityCard :city="city" @click="showCityView(city)" />
  </div>

  <p v-if="!state.cities.length">
    Sem cidades salvas. Começe a observar um local buscando no campo acima.
  </p>
</template>

<style scoped></style>