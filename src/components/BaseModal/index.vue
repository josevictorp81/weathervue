<script lang='ts'>
import { SetupContext, defineComponent } from 'vue'

interface SetupReturn {
  modalClose: () => void
}

export default defineComponent({
  emits: ['closeModal'],
  props: {
    modalActive: {
      type: Boolean,
      required: true
    }
  },
  setup(_, { emit }: SetupContext): SetupReturn {
    function modalClose() {
      emit('closeModal')
    }

    return {
      modalClose
    }
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div v-show="modalActive" class="fixed w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
        <Transition name="modal-inner">
          <div v-if="modalActive" class="p-4 bg-white self-start mt-28 max-w-screen-md rounded-lg">
            <slot></slot>
            <button @click="modalClose" class="text-white mt-4 bg-blue-500 py-2 px-6 rounded-lg hover:bg-blue-600">
              <i class="fa-solid fa-x text-md"></i>
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>