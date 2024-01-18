<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navigation from './components/Navigation/index.vue'

</script>

<template>
  <div class="flex flex-col min-h-screen font-roboto bg-weather-primary">
    <Navigation />
    <RouterView />
  </div>
</template>

<style scoped></style>
