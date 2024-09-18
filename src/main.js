import { createApp } from 'vue'
import App from './App.vue'
import enrutador from './enrutador' // Importa el enrutador
import tienda from './tienda' // Importa la tienda Vuex
import 'bootstrap/dist/css/bootstrap.css' // Bootstrap
import 'bootstrap-vue/dist/bootstrap-vue.css' // Bootstrap Vue

createApp(App).use(enrutador).use(tienda).mount('#app')
