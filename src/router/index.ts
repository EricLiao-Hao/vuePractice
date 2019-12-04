import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import products from '../views/pages/products.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/',
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
    path: '/',
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
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../views/pages/Coupon.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orderPage',
        name: 'orderPage',
        component: () => import('../views/pages/orderPage.vue'),
        meta: { requiresAuth: true }
      },
    ]
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/dashboard.vue'),
    children: [
      {
        path: 'customPage',
        name: 'customPage',
        component: () => import('../views/customPage.vue'),
      },
      {
        path: 'customCheckout/:orderId',
        name: 'customCheckout',
        component: () => import('../views/pages/customCheckout.vue'),       
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
