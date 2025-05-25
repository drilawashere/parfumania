import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap' // This includes Bootstrap's JS features
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap' // JavaScript features like dropdowns, modals, etc.
import './firebase'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const app = createApp(App)
app.config.devtools = false

app.use(router)

app.mount('#app')
