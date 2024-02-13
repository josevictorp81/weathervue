<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import BaseModal from '../BaseModal/index.vue'

type State = {
  modalActive: boolean
}

interface SetupReturn {
  state: State,
  toggleModal: () => void
}

export default defineComponent({
  components: { BaseModal },
  setup(): SetupReturn {
    const state = reactive<State>({
      modalActive: false
    })

    function toggleModal() {
      state.modalActive = !state.modalActive
    }

    return {
      state,
      toggleModal
    }
  }
})
</script>

<template>
  <header class="flex justify-center shadow-lg rounded-b-xl">
    <nav class="w-11/12 sm:w-4/5 md:w-9/12 flex items-center gap-4 text-white p-3">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-2 flex-col md:flex-row md:gap-4">
          <img src="../../assets/img/logo.png" class="w-[50px] h-[50px] md:w-[70px] md:h-[70px]" alt="Logo" title="Weather">
          <p class="text-sm md:text-3xl font-pacifico text-blue-500">Weather</p>
        </div>
      </RouterLink>

      <div class="flex flex-1 justify-end">
        <i @click="toggleModal" class="fa-solid fa-circle-info text-blue-600 text-3xl duration-150 cursor-pointer animate-pulse"></i>
      </div>

      <BaseModal @closeModal="toggleModal" :modalActive="state.modalActive">
        <div class="text-black">
          <h1 class="text-2xl">Sobre:</h1>
          <p class="mb-1">
            Weather permite que você monitore o clima atual e futuro das cidades de sua escolha.
          </p>
          <h2 class="text-2xl">Como funciona:</h2>
          <ol class="list-decimal list-inside mb-2">
            <li>
              Procure por sua cidade informando o nome na barra de pesquisa.
            </li>
            <li>
              Selecione uma cidade de seus resultados, isso trará seu clima atual, o clima de hora em hora pelas próximas 24 horas e semanalmente.
            </li>
            <li>
              Acompanhe a cidade clicando no no botão <span class="font-semibold text-blue-500">Salvar Cidade</span> na parte inferior do card onde mostra a temperatura e o nome da cidade. Essa ação salvará a cidade alvo, permitindo você ver mais tarde
              na sua página inicial.
            </li>
          </ol>

          <h2 class="text-2xl">Remover cidade:</h2>
          <p>
            Se você não deseja mais acompanhar uma cidade, basta selecionar a cidade na página inicial. Na parte inferior da página, haverá um botão <span class="font-semibold text-red-500">Remover Cidade</span> para excluir a cidade.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>