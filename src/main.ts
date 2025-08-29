import { createApp } from 'vue'
import App from './App.vue'
import setupRouter from './router'
import 'iconify-icon'
import '@/styles/index'
import 'virtual:uno.css'

const app = createApp(App)
setupRouter(app)
app.mount('#app')
