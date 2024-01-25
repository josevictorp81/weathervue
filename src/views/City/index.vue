<script lang='ts'>
import { defineComponent } from 'vue'
import AsyncCity from '../../components/AsyncCity/index.vue'

export default defineComponent({
  components: { AsyncCity }
})
</script>

<template>
  <div>
    <Suspense>
      <AsyncCity />
      <template #fallback>
        A inserir....
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>