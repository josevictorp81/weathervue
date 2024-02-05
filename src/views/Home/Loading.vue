<script lang='ts'>
import { defineComponent } from 'vue'
import Loader from '../../components/Loader/index.vue'

export default defineComponent({
  components: { Loader }
})
</script>

<template>
  <div class="flex w-full md:w-[290px] lg:w-[360px]  py-6 px-4 bg-blue-600 hover:mt-1 rounded-md shadow-md cursor-pointer">
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