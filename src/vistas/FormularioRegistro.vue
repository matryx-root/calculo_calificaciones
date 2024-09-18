<template>
  <div class="container mt-5">
    <h1>Formulario de Registro</h1>
    <form @submit.prevent="registrar">
      <!-- Nombre -->
      <div class="mb-3 position-relative">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          v-model="nombre"
          class="form-control"
          required
          @input="validarNombre"
        />
        <!-- Mensaje debajo del campo nombre -->
        <div id="nombre-error" class="text-danger"></div>
      </div>

      <!-- Correo electrónico -->
      <div class="mb-3 position-relative">
        <label for="correo" class="form-label">Correo Electrónico</label>
        <input
          type="email"
          v-model="correo"
          class="form-control"
          required
          @input="validarCorreo"
        />
        <!-- Mensaje debajo del campo correo -->
        <div id="correo-error" class="text-danger"></div>
      </div>

      <!-- Contraseña -->
      <div class="mb-3 position-relative">
        <label for="contraseña" class="form-label">Contraseña</label>
        <input
          :type="mostrarContraseña ? 'text' : 'password'"
          v-model="contraseña"
          class="form-control"
          required
          @input="validarContraseña"
        />
        <!-- Botón para mostrar/ocultar la contraseña -->
        <span @click="mostrarContraseña = !mostrarContraseña" class="position-absolute top-50 end-0 translate-middle-y me-3">
          <i :class="mostrarContraseña ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
        <!-- Mensaje debajo del campo contraseña -->
        <div id="contraseña-error" class="text-danger"></div>
      </div>

      <!-- Confirmar contraseña -->
      <div class="mb-3 position-relative">
        <label for="confirmarContraseña" class="form-label">Confirmar Contraseña</label>
        <input
          :type="mostrarContraseña ? 'text' : 'password'"
          v-model="confirmarContraseña"
          class="form-control"
          required
        />
        <!-- Botón para mostrar/ocultar la contraseña -->
        <span @click="mostrarContraseña = !mostrarContraseña" class="position-absolute top-50 end-0 translate-middle-y me-3">
          <i :class="mostrarContraseña ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
        <!-- Mensaje debajo del campo confirmar contraseña -->
        <div v-if="submitIntentado && contraseña !== confirmarContraseña" class="text-danger">Las contraseñas no coinciden</div>
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
      nombreValido: false,
      correoValido: false,
      contraseñaValida: false,
      mostrarContraseña: false, // Variable para controlar mostrar/ocultar contraseña
      submitIntentado: false
    }
  },
  computed: {
    formularioValido () {
      return (
        this.nombreValido &&
        this.correoValido &&
        this.contraseñaValida &&
        this.contraseña === this.confirmarContraseña
      )
    }
  },
  methods: {
    ...mapActions(['registrarUsuario']),

    // Validar que el nombre sea texto y convertir a mayúsculas
    validarNombre () {
      const regex = /^[A-Za-z\s]+$/ // Solo letras y espacios
      this.nombre = this.nombre.replace(/[^A-Za-z\s]/g, '') // Eliminar números y caracteres no permitidos
      if (!regex.test(this.nombre)) {
        document.getElementById('nombre-error').innerHTML =
          'El nombre debe contener solo letras'
        this.nombreValido = false
      } else {
        this.nombre = this.nombre.toUpperCase() // Convertir a mayúsculas
        document.getElementById('nombre-error').innerHTML = ''
        this.nombreValido = true
      }
    },

    // Validar correo electrónico completo con ejemplo
    validarCorreo () {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
      if (!regex.test(this.correo)) {
        document.getElementById('correo-error').innerHTML =
          'Por favor, ingrese un correo válido. Ejemplo: estebanperez@gmail.com'
        this.correoValido = false
      } else {
        document.getElementById('correo-error').innerHTML = ''
        this.correoValido = true
      }
    },

    // Validar contraseña alfanumérica (letras y números) y longitud
    validarContraseña () {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/ // Alfanumérica, entre 8 y 20 caracteres
      if (!regex.test(this.contraseña)) {
        document.getElementById('contraseña-error').innerHTML =
          'La contraseña debe tener letras y números, y entre 8 y 20 caracteres'
        this.contraseñaValida = false
      } else {
        document.getElementById('contraseña-error').innerHTML = ''
        this.contraseñaValida = true
      }
    },

    // Registrar al usuario y limpiar el formulario
    registrar () {
      this.submitIntentado = true

      if (this.formularioValido) {
        const nuevoUsuario = {
          nombre: this.nombre,
          correo: this.correo,
          contraseña: this.contraseña
        }

        // Registrar el usuario en Vuex
        this.registrarUsuario(nuevoUsuario)

        // Mostrar el mensaje de éxito
        alert('El registro se ha realizado correctamente')

        // Limpiar el formulario
        this.limpiarFormulario()
      } else {
        alert('Por favor, complete todos los campos correctamente')
      }
    },

    limpiarFormulario () {
      this.nombre = ''
      this.correo = ''
      this.contraseña = ''
      this.confirmarContraseña = ''
      this.nombreValido = false
      this.correoValido = false
      this.contraseñaValida = false
      this.submitIntentado = false
    }
  }
}
</script>

<style>
  .position-relative {
    position: relative;
  }
  .position-absolute {
    position: absolute;
  }
  .translate-middle-y {
    transform: translateY(-50%);
  }
  .text-danger {
    color: #dc3545 !important;
  }
  .text-success {
    color: #28a745 !important;
  }
</style>
