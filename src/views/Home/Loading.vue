<script lang='ts'>
import { defineComponent } from 'vue'
import Loader from '../../components/Loader/index.vue'

export default defineComponent({
  components: { Loader }
})
</script>

<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md">
    <div class="flex flex-col flex-1 gap-2">
      <Loader class="max-w-[50%]" />
      <Loader class="max-w-[50%]" />
    </div>

    <div class="flex flex-col flex-1 gap-2 items-end">
      <Loader class="max-w-[50px] w-full" />
      <Loader class="max-w-[100px] w-full" />
    </div>
  </div>
</template>

<style scoped></style>