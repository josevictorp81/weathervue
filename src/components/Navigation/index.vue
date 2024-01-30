<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { verifyCityExists } from '../../helpers/cityExist'
import { makeObjectLOcal } from '../../helpers/makeObjectLocal'
import { City, ObjectLocal } from '../../types/cityResult'
import BaseModal from '../BaseModal/index.vue'

type State = {
  modalActive: boolean
  showSaveCity: boolean
}

interface SetupReturn {
  state: State,
  toggleModal: () => void
  addCityToLocalStorage: () => void
}

export default defineComponent({
  components: { BaseModal },
  setup(): SetupReturn {
    const state = reactive<State>({
      modalActive: false,
      showSaveCity: false
    })

    const savedCities = reactive<City>({
      cities: []
    })

    const route = useRoute()
    const router = useRouter()

    function toggleModal() {
      state.modalActive = !state.modalActive
    }

    function addCityToLocalStorage() {
      if (localStorage.getItem('savedCities')) {
        const saved: City = JSON.parse(localStorage.getItem('savedCities') as string)
        savedCities.cities = saved.cities
      }

      const objectLocal: ObjectLocal = makeObjectLOcal(route)
      const exists = verifyCityExists(savedCities.cities, objectLocal.city)
      if (!exists) {
        savedCities.cities.push(objectLocal)
        state.showSaveCity = !state.showSaveCity
      }

      localStorage.setItem('savedCities', JSON.stringify(savedCities))

      let query = Object.assign({}, route.query)
      delete query.preview
      router.replace({ query })
    }

    return {
      state,
      toggleModal,
      addCityToLocalStorage
    }
  }
})
</script>

<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i @click="toggleModal" class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
        <i @click="addCityToLocalStorage" :class="{ 'cursor-default': state.showSaveCity }" class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
      </div>

      <BaseModal @closeModal="toggleModal" :modalActive="state.modalActive">
        <div class="text-black">
          <h1 class="text-2xl mb-1">Sobre:</h1>
          <p class="mb-4">
            Weather permite que você monitore o clima atual e futuro das cidades de sua escolha.
          </p>
          <h2 class="text-2xl">Como funciona:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Procure por sua cidade informando o nome na barra de pesquisa.
            </li>
            <li>
              Selecione uma cidade de seus resultados, isso trará seu clima atual, o clima de hora em hora pelas próximas 24 horas e semanalmente.
            </li>
            <li>
              Acompanhe a cidade clicando no ícone "+" na barra de navegação à direia. Essa ação salvará a cidade alvo, permitindo você ver mais tarde na sua home.
            </li>
          </ol>

          <h2 class="text-2xl">Remover cidade:</h2>
          <p>
            Se você não deseja mais acompanhar uma cidade, basta selecionar
            a cidade na página inicial. Na parte inferior da
            página, haverá uma opção para excluir a cidade.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>