<template>
  <div class="container mt-5">
    <h1>Cálculo de Calificaciones</h1>
    <form @submit.prevent="calcularPromedio">
      <div class="mb-3">
        <label for="nota1" class="form-label">Nota 1</label>
        <input type="number" v-model="nota1" min="10" max="70" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="nota2" class="form-label">Nota 2</label>
        <input type="number" v-model="nota2" min="10" max="70" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="nota3" class="form-label">Nota 3</label>
        <input type="number" v-model="nota3" min="10" max="70" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="asistencia" class="form-label">Asistencia (%)</label>
        <input type="number" v-model="asistencia" min="0" max="100" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Calcular</button>
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
      nota1: null,
      nota2: null,
      nota3: null,
      asistencia: null,
      promedio: 0,
      aprobado: false,
      resultado: false
    }
  },
  methods: {
    calcularPromedio () {
      const ponderado = (this.nota1 * 0.35) + (this.nota2 * 0.35) + (this.nota3 * 0.30)
      this.promedio = ponderado
      this.aprobado = ponderado >= 40 && this.asistencia >= 80
      this.resultado = true
    }
  }
}
</script>
