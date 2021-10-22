import { createApp } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import App from './App.vue'
import router from './router'
import BaseButton from './components/BaseButton.vue'
import Footer from './components/Footer.vue'
import BtnUp from './components/BtnUp.vue'
createApp(App).use(router).component('base-button', BaseButton).component('Footer',Footer).component('BtnUp',BtnUp).mount('#app')

