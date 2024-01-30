<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import CityList from '../../components/CityList/index.vue'
import services from '../../services/index'
import { Feature } from '../../types/searchResults'

type State = {
  localName: string
  searchLocalResults: Feature[]
  hasError: boolean,
  queryTime: number | undefined
  noLocalReturned: boolean
}

type SetupReturn = {
  state: State,
  search: () => void
  viewCity: (data: Feature) => void
}

export default defineComponent({
  components: { CityList },
  setup(): SetupReturn {
    const router = useRouter()
    const state = reactive<State>({
      localName: '',
      searchLocalResults: [],
      hasError: false,
      queryTime: undefined,
      noLocalReturned: false
    })

    function search() {
      clearTimeout(state.queryTime)
      state.queryTime = setTimeout(async () => {
        if (state.localName !== '') {
          try {
            const { data, errors } = await services.location.getLocal(state.localName)
            if (errors) {
              state.searchLocalResults = []
              state.noLocalReturned = !state.noLocalReturned
              throw new Error(errors.statusText)
            }
            if (!data.length) {
              state.noLocalReturned = !state.noLocalReturned
            }
            state.searchLocalResults = data
          } catch (errors) {
            state.hasError = !state.hasError
          }
          return
        }
        state.searchLocalResults = []
        state.noLocalReturned = false
      }, 400)
    }

    function viewCity(data: Feature) {
      const [cityName, stateName] = data.place_name.split(',')
      router.push({
        name: 'city', params: { state: stateName.replace(' ', ''), city: cityName }, query: {
          lat: data.geometry.coordinates[1],
          lon: data.geometry.coordinates[0],
          preview: 'true'
        }
      })
    }

    return {
      state,
      search,
      viewCity
    }
  }
})
</script>

<template>
  <main class="container text-white">
    <div class="py-4 mb-8 relative">
      <input @input="search" v-model="state.localName" type="text" placeholder="Pesquise por uma cidade" class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">

      <ul v-if="state.searchLocalResults.length || state.noLocalReturned" class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
        <p v-if="state.hasError">
          Algo deu errado, tente novamente.</p>
        <p v-if="!state.hasError && state.noLocalReturned">
          Sem resultados na sua persquisa, tente um nome diferente.
        </p>
        <template v-else>
          <li @click="viewCity(local)" v-for="local in state.searchLocalResults" :key="local.id" class="py-2 cursor-pointer">
            {{ local.place_name }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<style scoped></style>