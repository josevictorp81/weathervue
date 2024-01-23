<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import services from '../../services/index'
import { Feature } from '../../types/searchResults'




type State = {
  searchLocalName: string
  searchLocalResults: Feature[]
  hasError: boolean,
  queryTime: number | undefined
  noLocalReturned: boolean
}

type SetupReturn = {
  state: State,
  search: () => void
}

export default defineComponent({
  setup(): SetupReturn {
    const state = reactive<State>({
      searchLocalName: '',
      searchLocalResults: [],
      hasError: false,
      queryTime: undefined,
      noLocalReturned: false
    })

    function search() {
      clearTimeout(state.queryTime)
      state.queryTime = setTimeout(async () => {
        if (state.searchLocalName !== '') {
          try {
            const { data, errors } = await services.location.getLocal(state.searchLocalName)
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

    return {
      state,
      search,
    }
  }
})
</script>

<template>
  <main class="container text-white">
    <div class="py-4 mb-8 relative">
      <input @input="search" v-model="state.searchLocalName" type="text" placeholder="Pesquise por uma cidade" class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">

      <ul v-if="state.searchLocalResults.length || state.noLocalReturned" class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
        <p v-if="state.hasError">
          Algo deu errado, tente novamente.</p>
        <p v-if="!state.hasError && state.noLocalReturned">
          Sem resultados na sua persquisa, tente um nome diferente.
        </p>
        <template v-else>
          <li v-for="local in state.searchLocalResults" :key="local.id" class="py-2 cursor-pointer">
            {{ local.place_name }}
          </li>
        </template>
      </ul>

    </div>
  </main>
</template>

<style scoped></style>