import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import App from './App.vue'
import { queryClient } from './libs/tanstack-query/query-client'
import './main.css'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(VueQueryPlugin, { queryClient: queryClient })

app.use(ToastPlugin)

app.mount('#app')
