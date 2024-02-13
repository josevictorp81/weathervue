import { createApp } from 'vue'
import Vue3Toastify, { toast, type ToastContainerOptions } from 'vue3-toastify'
import App from './App.vue'
import router from './router'

import 'vue3-toastify/dist/index.css'
import './assets/css/tailwind.css'

const options = {
  autoClose: 3000,
  position: toast.POSITION.BOTTOM_RIGHT,
} as ToastContainerOptions

createApp(App).use(router).use(Vue3Toastify, options).mount('#app')
