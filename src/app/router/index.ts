import { createRouter, createWebHistory } from 'vue-router'
import { NotesPage } from '@pages/notes'
import { TasksPage } from '@pages/tasks'
import { TimerPage } from '@pages/timer'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tasks',
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksPage,
    },
    {
      path: '/timer',
      name: 'timer',
      component: TimerPage,
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesPage,
    },
  ],
})
