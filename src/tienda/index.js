import { createStore } from 'vuex'

export default createStore({
  state: {
    tareas: [], // Almacén para las tareas
    usuarios: [] // Almacén para los usuarios registrados
  },
  mutations: {
    AGREGAR_TAREA (state, tarea) {
      state.tareas.push(tarea)
    },
    REGISTRAR_USUARIO (state, usuario) {
      state.usuarios.push(usuario)
    }
  },
  actions: {
    agregarTarea ({ commit }, tarea) {
      commit('AGREGAR_TAREA', tarea)
    },
    registrarUsuario ({ commit }, usuario) {
      commit('REGISTRAR_USUARIO', usuario)
    }
  },
  getters: {
    listaTareas: (state) => state.tareas,
    listaUsuarios: (state) => state.usuarios // Devuelve la lista de usuarios registrados
  }
})
