import { createRouter, createWebHistory } from 'vue-router'

type Route = {
  name: string
  path: string
  component: object
}

const Home = () => import('../views/Home/index.vue')
console.log(typeof Home)

const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
]

const router = createRouter({ history: createWebHistory('/'), routes })

export default router
