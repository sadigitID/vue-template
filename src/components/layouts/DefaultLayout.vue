<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="default-layout">
    <header class="layout-header">
      <nav class="layout-nav">
        <router-link to="/" class="nav-brand">Vue Template</router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </div>
      </nav>
    </header>

    <main class="layout-main">
      <RouterView />
    </main>

    <footer class="layout-footer">
      <p>&copy; {{ new Date().getFullYear() }} Vue + Vite Template</p>
    </footer>
  </div>
</template>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.layout-nav {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: #646cff;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #646cff;
}

.layout-main {
  flex: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.layout-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 1rem 2rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.875rem;
}
</style>
