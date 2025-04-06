import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import ResourceView from './views/ResourceView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/resource/:id',
      name: 'resource',
      component: ResourceView,
      props: true
    }
  ]
})

export default router 