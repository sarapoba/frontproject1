import { createRouter, createWebHistory } from 'vue-router'
import board from '../views/board/Board.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/board',
      name: 'board',
      component: () => import('../views/board/Board.vue'),
    },
  ],
})

export default router
