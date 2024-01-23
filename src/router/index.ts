import { createRouter, createWebHistory } from 'vue-router'

type Route = {
  name: string
  path: string
  component: object
}

const Home = () => import('../views/Home/index.vue')
const City = () => import('../views/City/index.vue')

const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/weather/:state/:city',
    name: 'city',
    component: City,
  },
]

const router = createRouter({ history: createWebHistory('/'), routes })

export default router
