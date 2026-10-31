<script setup>
import { config } from '../config'
</script>

<template>
  <h2>Configuración incrustada en este build</h2>
  <p>
    Estos valores se fijaron <strong>al compilar</strong>. Cualquiera puede verlos
    en las herramientas del navegador: aquí nunca van secretos.
  </p>
  <table>
    <tr v-for="(valor, clave) in config" :key="clave">
      <th>{{ clave }}</th>
      <td><code>{{ valor }}</code></td>
    </tr>
  </table>
</template>
