import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from 'vue-router'

type Route = {
  name: string
  path: string
  component: object
  meta: { title: string }
}

const Home = () => import('../views/Home/index.vue')
const City = () => import('../views/City/index.vue')

const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/weather/:state/:city',
    name: 'city',
    component: City,
    meta: {
      title: 'Weather',
    },
  },
]

const router = createRouter({ history: createWebHistory('/'), routes })

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    document.title = `${
      to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
    } | The Local Weather`
    next()
  }
)

export default router
