import { createRouter, createWebHistory } from 'vue-router'
import CalculoCalificaciones from '../vistas/CalculoCalificaciones.vue'
import FormularioRegistro from '../vistas/FormularioRegistro.vue'

const rutas = [
  {
    path: '/',
    name: 'CalculoCalificaciones',
    component: CalculoCalificaciones
  },
  {
    path: '/registro',
    name: 'FormularioRegistro',
    component: FormularioRegistro
  }
]

const enrutador = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: rutas
})

export default enrutador
