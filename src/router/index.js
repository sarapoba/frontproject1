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
    {
      path: '/boardlist',
      name: 'boardlist',
      component: () => import('../views/board/BoardList.vue'),
    },
    {
      path: '/boardread/:idx',
      name: 'boardread',
      component: () => import('../views/board/BoardRead.vue'),
    },
    {
      path: '/boardmodify/:idx',
      name: 'boardmodify',
      component: () => import('../views/board/BoardModify.vue'),
    },
  ],
})

export default router
