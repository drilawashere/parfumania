import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminPaneli from '@/views/AdminPaneli.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin-paneli-i-parfumania-web-veq-personale',
      name: 'AdminPanel',
      component: () => import('@/views/AdminPaneli.vue'),
    },
    // ...existing code...
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: () => import('@/views/ProductDetails.vue'),
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('@/views/CategoriesView.vue'),
    },
    // ...existing code...

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
