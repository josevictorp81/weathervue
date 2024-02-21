<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import CityList from '../../components/CityList/index.vue'
import services from '../../services/index'
import { Feature } from '../../types/searchResults'
import Loading from './Loading.vue'

type State = {
  localName: string
  searchLocalResults: Feature[]
  hasError: boolean,
  queryTime: ReturnType<typeof setTimeout> | number
  noLocalReturned: boolean
}

type SetupReturn = {
  state: State,
  search: () => void
  viewCity: (data: Feature) => void
}

export default defineComponent({
  components: { CityList, Loading },
  setup(): SetupReturn {
    const router = useRouter()
    const state = reactive<State>({
      localName: '',
      searchLocalResults: [],
      hasError: false,
      queryTime: 0,
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
          lon: data.geometry.coordinates[0]
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
  <main class="w-full h-full flex justify-center">
    <div class="w-11/12 sm:w-4/5 flex flex-col justify-center text-white rounded-xl p-4">
      <div class="py-4 mb-4 flex justify-center relative">
        <input @input="search" v-model="state.localName" type="text" placeholder="Pesquise por uma cidade" class="py-2 px-1 w-2/3 bg-transparent text-black border-b border-b-zinc-800 focus:outline-none">

        <ul v-if="state.searchLocalResults.length || state.noLocalReturned" class="absolute w-2/3 shadow-md py-2 px-2 top-[66px] rounded bg-gray-primary text-black">
          <p v-if="state.hasError">
            Algo deu errado, tente novamente.</p>
          <p v-if="!state.hasError && state.noLocalReturned">
            Sem resultados na sua persquisa, tente um nome diferente.
          </p>
          <template v-else>
            <li @click="viewCity(local)" v-for="local in state.searchLocalResults" :key="local.id" class="py-2 cursor-pointer rounded-md hover:bg-blue-primary">
              {{ local.place_name }}
            </li>
          </template>
        </ul>
      </div>

      <div class="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
        <Suspense>
          <CityList :hasResults="!!state.searchLocalResults.length" />
          <template #fallback>
            <Loading />
          </template>
        </Suspense>
      </div>
    </div>
  </main>
</template>

<style scoped></style>