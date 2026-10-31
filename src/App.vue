<script setup>
import { config } from './config'
</script>

<template>
  <header class="top">
    <strong>{{ config.appName }}</strong>
    <span class="badge" :class="config.appEnv">{{ config.appEnv }}</span>
    <nav>
      <RouterLink to="/">Variables y secreto</RouterLink>
      <RouterLink to="/config">Configuración</RouterLink>
    </nav>
  </header>
  <main><RouterView /></main>
  <footer>v{{ config.appVersion }} · modo {{ config.mode }}</footer>
</template>
