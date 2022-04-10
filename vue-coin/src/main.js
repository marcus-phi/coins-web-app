import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import List from './components/list/List.vue';
import Detail from './components/detail/Detail.vue';
import NotFound from './components/notfound/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: List },
    { path: '/currency/:id', component: Detail, props: true },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ]
})

createApp(App)
  .use(router)
  .mount('#root');