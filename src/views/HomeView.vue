<script setup lang="ts">
import { useCounter } from '@/composables/useCounter'

const { count, increment, decrement, reset } = useCounter(0)
</script>

<template>
  <div class="home">
    <h1>Welcome to Vue + Vite Template</h1>
    <p>
      This template is configured with TypeScript, ESLint, Prettier, Vitest, Playwright, and more.
    </p>

    <div class="card">
      <p class="count">Count: {{ count }}</p>
      <div class="button-group">
        <button type="button" @click="decrement">-</button>
        <button type="button" @click="reset">Reset</button>
        <button type="button" @click="increment">+</button>
      </div>
      <p class="hint">Edit <code>src/views/HomeView.vue</code> to test hot module replacement.</p>
    </div>

    <p>Check out the <router-link to="/about">About</router-link> page.</p>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

.card {
  padding: 2em;
}

.count {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.hint {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

a {
  color: #646cff;
}
</style>
