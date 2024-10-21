import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Notifications from '@kyvg/vue3-notification'
import './style.css'
import App from './App.vue'
import ProductList from './components/ProductList.vue'
import ProductDetail from './components/ProductDetail.vue'
import AboutPage from './components/AboutPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ProductList },
    { path: '/about', component: AboutPage },
    { path: '/product/:id', component: ProductDetail },
  ]
})

createApp(App)
  .use(router)
  .use(Notifications)
  .mount('#app')