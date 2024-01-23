<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { Feature } from '../../types/searchResults'
import services from '../../services/index'

type State = {
  searchLocalName: string
  searchLocalResults: Feature[]
  hasError: boolean,
  queryTime: number | undefined
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
      queryTime: undefined
    })

    function search() {
      clearTimeout(state.queryTime)
      state.queryTime = setTimeout(async () => {
        if (state.searchLocalName !== '') {
          const { data, errors } = await services.location.getLocal(state.searchLocalName)
          if (errors) {
            state.hasError = !state.hasError
            return
          }
          state.searchLocalResults = data
          console.log(state.searchLocalResults)
          return
        }
        state.searchLocalResults = []
      }, 400)
    }

    return {
      state,
      search
    }
  }
})
</script>

<template>
  <main class="container text-white">
    <div class="py-4 mb-8 relative">
      <input @input="search" v-model="state.searchLocalName" type="text" placeholder="Pesquise por uma cidade" class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">

      <ul v-if="state.searchLocalResults.length" class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
        <li v-for="local in state.searchLocalResults" :key="local.id" class="py-2 cursor-pointer">
          {{ local.place_name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped></style>