import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import ResourceView from './views/ResourceView.vue'

const router = createRouter({
  history: createWebHistory('/OER_site_generate/'),
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
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router 