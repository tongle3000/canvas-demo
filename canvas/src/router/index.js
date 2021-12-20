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
    component: () => import(/* webpackChunkName: "about" */ '../views/TreeJS/TiantiYundong')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router