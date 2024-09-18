<template>
  <div class="container mt-5">
    <h1>Formulario de Registro</h1>
    <form @submit.prevent="registrar">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          v-model="nombre"
          class="form-control"
          required
          @input="convertirAMayusculas"
        />
        <div v-if="!nombre" class="text-danger">El nombre es requerido</div>
      </div>
      <div class="mb-3">
        <label for="correo" class="form-label">Correo Electrónico</label>
        <input
          type="email"
          v-model="correo"
          class="form-control"
          required
          @input="validarCorreo"
        />
        <div v-if="!correoValido" class="text-danger">Por favor, ingrese un correo válido</div>
      </div>
      <div class="mb-3">
        <label for="contraseña" class="form-label">Contraseña</label>
        <input
          type="password"
          v-model="contraseña"
          class="form-control"
          required
        />
        <div v-if="!contraseña" class="text-danger">La contraseña es requerida</div>
      </div>
      <div class="mb-3">
        <label for="confirmarContraseña" class="form-label">Confirmar Contraseña</label>
        <input
          type="password"
          v-model="confirmarContraseña"
          class="form-control"
          required
        />
        <div v-if="contraseña !== confirmarContraseña" class="text-danger">Las contraseñas no coinciden</div>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="!formularioValido">Registrar</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      nombre: '',
      correo: '',
      contraseña: '',
      confirmarContraseña: '',
      correoValido: true
    }
  },
  computed: {
    formularioValido () {
      return (
        this.nombre &&
        this.correoValido &&
        this.contraseña &&
        this.contraseña === this.confirmarContraseña
      )
    }
  },
  methods: {
    ...mapActions(['registrarUsuario']),

    // Convierte el nombre a mayúsculas automáticamente
    convertirAMayusculas () {
      this.nombre = this.nombre.toUpperCase()
    },

    // Valida el correo electrónico
    validarCorreo () {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
      this.correoValido = regex.test(this.correo)
    },

    registrar () {
      if (this.formularioValido) {
        const nuevoUsuario = {
          nombre: this.nombre,
          correo: this.correo,
          contraseña: this.contraseña
        }

        // Registrar el usuario en Vuex
        this.registrarUsuario(nuevoUsuario)

        alert('El registro se ha realizado correctamente')
      } else {
        alert('Por favor, complete todos los campos correctamente')
      }
    }
  }
}
</script>
