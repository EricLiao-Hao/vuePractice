import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import products from '../views/pages/products.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'login',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/pages/Login.vue'),
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: () => import('../views/dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: products,
        meta: { requiresAuth: true }
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
