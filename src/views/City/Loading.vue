<script lang='ts'>
import { defineComponent } from 'vue'
import Loader from '../../components/Loader/index.vue'

export default defineComponent({
  components: { Loader }
})
</script>

<template>
  <div class="flex flex-col flex-1">
    <div class="flex flex-col items-center pt-8 pb-4">
      <Loader class="max-w-[300px] w-full mb-2" />
      <Loader class="max-w-[300px] w-full mb-4" />
      <Loader class="max-w-[300px] h-[100px] w-full mb-4" />
      <Loader class="max-w-[300px] h-[60px] w-full mb-2" />
      <Loader class="max-w-[300px] h-[75px] w-full mb-4" />
    </div>

    <hr class="border-white border-opacity-10 border w-full">

    <div class="flex flex-col items-center px-8 pt-8 pb-4">
      <Loader class="max-w-screen-md h-[200px] w-full mb-8" />
    </div>

    <hr class="border-white border-opacity-10 border w-full">

    <div class="flex flex-col items-center px-8 pt-8 pb-4">
      <Loader class="max-w-screen-md h-[300px] w-full mb-8" />
    </div>
  </div>
</template>
