import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { queryClient } from './libs/tanstack-query/query-client'
import './main.css'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(router)

app.use(VueQueryPlugin, { queryClient: queryClient })

app.use(pinia)

app.mount('#app')
