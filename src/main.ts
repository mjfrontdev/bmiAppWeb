import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import StartPage from './pages/StartPage.vue'
import GenderAge from './pages/GenderAge.vue'
import WeightHeight from './pages/WeightHeight.vue'
import ResultPage from './pages/ResultPage.vue'
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartPage
    },
    {
      path: '/gender-age',
      name: 'gender-age',
      component: GenderAge
    },
    {
      path: '/weight-height',
      name: 'weight-height',
      component: WeightHeight
    },
    {
      path: '/result',
      name: 'result',
      component: ResultPage
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app') 