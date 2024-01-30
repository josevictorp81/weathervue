<script lang='ts'>
import { PropType, defineComponent } from 'vue'
import { ObjectLocal } from '../../types/cityResult'

export default defineComponent({
  props: {
    city: Object as PropType<ObjectLocal>,
  },
})
</script>

<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-xl">{{ city?.city }}</h2>
      <h3>{{ city?.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <P class="text-3xl self-end">
        {{ Math.round(city?.weather?.main.temp as number ?? 0) }}&deg;
      </P>
      <div class="flex gap-2 justify-end">
        <span class="text-xs">
          Max: {{ Math.round(city?.weather?.main.temp_max as number ?? 0) }}&deg;
        </span>

        <span class="text-xs">
          Min: {{ Math.round(city?.weather?.main.temp_min as number ?? 0) }}&deg;
        </span>

      </div>
    </div>
  </div>
</template>

<style scoped></style>