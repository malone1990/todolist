import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TodoDetail from '../views/TodoDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/todo/:id', name: 'TodoDetail', component: TodoDetail }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;