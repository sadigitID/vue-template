<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = (): void => {
  count.value++
}
</script>

<template>
  <div class="home">
    <h1>Welcome to Vue + Vite Template</h1>
    <p>
      This template is configured with TypeScript, ESLint, Prettier, Vitest, Playwright, and
      more.
    </p>

    <div class="card">
      <button type="button" @click="increment">Count is {{ count }}</button>
      <p>
        Edit <code>src/views/HomeView.vue</code> to test hot module replacement.
      </p>
    </div>

    <p>
      Check out <a href="/about">About</a> page.
    </p>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

.card {
  padding: 2em;
}

button {
  margin-bottom: 1em;
}

a {
  color: #646cff;
}
</style>
