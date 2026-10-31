<script setup>
import { ref } from 'vue'
import { config } from '../config'

const loading = ref(false)
const result = ref(null)
const error = ref(null)

// Esta función existe SOLO en Netlify (carpeta netlify/functions).
// Corre en el servidor de Netlify, donde sí puede leer el secreto DEMO_API_KEY.
async function consultarSecreto() {
  loading.value = true
  result.value = null
  error.value = null
  try {
    const res = await fetch('/.netlify/functions/secret-check')
    if (!res.ok) throw new Error(`HTTP ${res.status}: la función solo existe en Netlify`)
    result.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <h2>Variable pública</h2>
  <p class="mensaje">{{ config.welcomeMessage }}</p>
  <p>
    Este mensaje viene de <code>VITE_WELCOME_MESSAGE</code>. Quedó escrito dentro del
    JavaScript al compilar, así que cualquiera puede leerlo.
  </p>

  <h2>Secreto</h2>
  <p>
    El valor de <code>DEMO_API_KEY</code> nunca llega al navegador. Solo una función en el
    servidor de Netlify puede leerlo, y aquí únicamente pregunta si existe.
  </p>
  <button @click="consultarSecreto" :disabled="loading">
    {{ loading ? 'Consultando...' : 'Consultar secreto en el servidor' }}
  </button>

  <pre v-if="result" class="ok">{{ JSON.stringify(result, null, 2) }}</pre>
  <pre v-if="error" class="fail">Error: {{ error }}</pre>
</template>
