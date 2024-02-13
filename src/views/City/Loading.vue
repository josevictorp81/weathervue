<script lang='ts'>
import { defineComponent } from 'vue'
import Loader from '../../components/Loader/index.vue'

export default defineComponent({
  components: { Loader },
})
</script>

<template>
  <div class="w-full flex justify-center mt-2">
    <div class="w-11/12 flex flex-col gap-4 items-center lg:flex-row lg:gap-6">
      <div class="w-9/12 lg:w-5/12 mt-14 h-[450px] bg-blue-600 rounded-lg flex flex-col justify-center items-center">
        <Loader class="w-4/5 h-[90px] mb-4" />
        <Loader class="w-4/5 h-[200px] mb-4" />
        <Loader class="w-4/5 h-[80px]" />
      </div>
      <div class="w-9/12 lg:w-7/12 h-[700px] bg-blue-600 flex flex-col items-center rounded-lg mt-4">
        <Loader class="w-11/12 h-[180px] mt-14" />
        <Loader class="w-11/12 h-[350px] mt-20" />
      </div>
    </div>
  </div>
</template>
