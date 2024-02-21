<script lang='ts'>
import { defineComponent } from 'vue'
import Loader from '../../components/Loader/index.vue'

export default defineComponent({
  components: { Loader },
})
</script>

<template>
  <div class="w-full flex justify-center mt-1">
    <div class="w-11/12 p-2 flex flex-col gap-3 items-center lg:gap-4">
      <div class="w-11/12 bg-blue-primary text-white rounded-lg p-2 flex items-center flex-col gap-2 shadow-lg sm:w-10/12 md:w-4/5 lg:w-7/12">
        <div class="w-full p-1 mb-1 flex md:justify-center md:gap-2">
          <div class="flex flex-col items-center h-full w-1/2 md:w-2/5">
            <Loader class="w-full h-[170px] rounded-lg" />
          </div>

          <div class="w-1/2 h-full flex flex-col items-center mb-2 md:w-2/5">
            <Loader class="w-full h-[170px] rounded-lg" />
          </div>
        </div>

        <Loader class="w-56 h-10 rounded-lg" />
      </div>

      <div class="w-11/12 flex flex-col items-center gap-4 p-3 bg-blue-primary rounded-lg shadow-lg sm:w-10/12 md:w-4/5 lg:w-7/12">
        <Loader class="w-full h-[180px] mb-8 rounded-lg" />
        <Loader class="w-full h-[210px] rounded-lg" />
      </div>
    </div>
  </div>
</template>
