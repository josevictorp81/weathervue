<script lang='ts'>
import { defineComponent } from 'vue'
import AsyncCity from '../../components/AsyncCity/index.vue'
import Loading from './Loading.vue'

export default defineComponent({
  components: { AsyncCity, Loading }
})
</script>

<template>
  <div>
    <Suspense>
      <AsyncCity />
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>