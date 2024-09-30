import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/index.vue')
  },
  {
    path: '/MapContainer',
    name: 'MapContainer',
    component: () => import(/* webpackChunkName: "index" */ '../views/MapContainer/MapContainer.vue')
  },
  {
    path: '/threeIndex',
    name: 'threeIndex',
    component: () => import(/* webpackChunkName: "index" */ '../views/three/threeIndex.vue')
  },
  {
    path: '/threeTeo',
    name: 'threeTeo',
    component: () => import(/* webpackChunkName: "index" */ '../views/three/threeTeo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
