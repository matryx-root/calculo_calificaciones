<template>
  <div class="container mt-5">
    <h1>Cálculo de Calificaciones</h1>
    <form @submit.prevent="calcularPromedio">
      <!-- Nota 1 -->
      <div class="mb-3 position-relative">
        <label for="nota1" class="form-label">Nota 1</label>
        <input
          type="text"
          v-model="nota1"
          class="form-control"
          @input="validarDosDigitos('nota1', $event)"
          maxlength="2"
          required
        />
        <!-- Mensaje de validación para Nota 1 -->
        <div id="nota1-error" class="text-danger"></div>
      </div>

      <!-- Nota 2 -->
      <div class="mb-3 position-relative">
        <label for="nota2" class="form-label">Nota 2</label>
        <input
          type="text"
          v-model="nota2"
          class="form-control"
          @input="validarDosDigitos('nota2', $event)"
          maxlength="2"
          required
        />
        <!-- Mensaje de validación para Nota 2 -->
        <div id="nota2-error" class="text-danger"></div>
      </div>

      <!-- Nota 3 -->
      <div class="mb-3 position-relative">
        <label for="nota3" class="form-label">Nota 3</label>
        <input
          type="text"
          v-model="nota3"
          class="form-control"
          @input="validarDosDigitos('nota3', $event)"
          maxlength="2"
          required
        />
        <!-- Mensaje de validación para Nota 3 -->
        <div id="nota3-error" class="text-danger"></div>
      </div>

      <!-- Asistencia -->
      <div class="mb-3 position-relative">
        <label for="asistencia" class="form-label">Asistencia (%)</label>
        <input
          type="text"
          v-model="asistencia"
          class="form-control"
          @input="validarAsistencia"
          maxlength="3"
          required
        />
        <!-- Mensaje de validación para Asistencia -->
        <div id="asistencia-error" class="text-danger"></div>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!formularioValido">Calcular</button>
    </form>

    <div v-if="resultado">
      <p>Promedio Ponderado: {{ promedio }}</p>
      <p v-if="aprobado">¡Aprobado!</p>
      <p v-else>Reprobado</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nota1: '',
      nota2: '',
      nota3: '',
      asistencia: '',
      promedio: 0,
      aprobado: false,
      resultado: false,
      nota1Valida: false,
      nota2Valida: false,
      nota3Valida: false,
      asistenciaValida: false
    }
  },
  computed: {
    formularioValido () {
      return this.nota1Valida && this.nota2Valida && this.nota3Valida && this.asistenciaValida
    }
  },
  methods: {
    // Función para validar que solo se puedan ingresar dos dígitos exactos
    validarDosDigitos (campo, event) {
      const valor = event.target.value
      const regex = /^\d{2}$/ // Solo permite exactamente dos dígitos

      if (!regex.test(valor)) {
        document.getElementById(`${campo}-error`).innerHTML = 'Debe tener exactamente dos dígitos, sin puntos ni comas.'
        this[`${campo}Valida`] = false
        // Elimina los caracteres no válidos
        this[campo] = valor.replace(/\D/g, '').slice(0, 2) // Solo números, corta a 2 dígitos
      } else {
        document.getElementById(`${campo}-error`).innerHTML = ''
        this[`${campo}Valida`] = true
      }
    },

    // Validar Asistencia (número entre 1 y 100)
    validarAsistencia () {
      const asistencia = parseInt(this.asistencia, 10)
      if (isNaN(asistencia) || asistencia < 1 || asistencia > 100) {
        document.getElementById('asistencia-error').innerHTML = 'Debe ser un número de 1 a 100.'
        this.asistenciaValida = false
      } else {
        document.getElementById('asistencia-error').innerHTML = ''
        this.asistenciaValida = true
      }
    },

    // Calcular promedio
    calcularPromedio () {
      if (this.formularioValido) {
        const ponderado =
          this.nota1 * 0.35 + this.nota2 * 0.35 + this.nota3 * 0.3
        this.promedio = ponderado
        this.aprobado = ponderado >= 40 && this.asistencia >= 80
        this.resultado = true
      } else {
        alert('Por favor, complete todos los campos correctamente.')
      }
    }
  }
}
</script>

<!-- Estilos adicionales -->
<style>
  .text-danger {
    color: #dc3545 !important;
  }
  .text-success {
    color: #28a745 !important;
  }
</style>
