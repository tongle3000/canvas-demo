import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/wave',
    name: 'Wave',
    component: () => import(/* webpackChunkName: "about" */ '../views/Wave')
  },
  {
    path: '/wave2',
    name: 'Wave2',
    component: () => import(/* webpackChunkName: "about" */ '../views/Wave2')
  },
  {
    path: '/dot-line',
    name: 'DotLine',
    component: () => import(/* webpackChunkName: "about" */ '../views/DotLine')
  },
  {
    path: '/tianti-yundong',
    name: 'TiantiYundong',
    component: () => import(/* webpackChunkName: "about" */ '../views/ThreeJS/TiantiYundong/index.vue')
  },
  {
    path: '/Firstxyz',
    name: 'firstxyz',
    component: () => import(/* webpackChunkName: "about" */ '../views/ThreeJS/Firstxyz/index.vue')
  },
  {
    path: '/01',
    name: '01',
    component: () => import(/* webpackChunkName: "about" */ '../views/ThreeJS/01.vue')
  },
  {
    path: '/02',
    name: '02',
    component: () => import(/* webpackChunkName: "about" */ '../views/ThreeJS/02.vue')
  },
  {
    path: '/03',
    name: '03',
    component: () => import(/* webpackChunkName: "about" */ '../views/ThreeJS/03.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
