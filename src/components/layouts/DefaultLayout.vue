<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode'

const route = useRoute()
const { isDark, toggle, initTheme } = useDarkMode()

const isMobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', href: '/', icon: 'home' },
  { name: 'About', href: '/about', icon: 'info' },
]

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false
}

// Handle escape key to close mobile menu
const handleEscape = (e: KeyboardEvent): void => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  initTheme()
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <div class="layout">
    <!-- Header -->
    <header class="header">
      <nav class="nav container">
        <!-- Logo -->
        <router-link to="/" class="logo" @click="closeMobileMenu">
          <svg
            class="logo-icon"
            viewBox="0 0 256 256"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M128 24C104 24 82.67 28.53 64.67 36.53L82.67 130.13C95.47 118.27 111.47 110.93 128 110.93C147.47 110.93 164.8 120.67 176.13 135.73L192.53 42.4C173.87 31.2 151.73 24 128 24ZM52.27 49.07C34.4 65.33 21.6 86.93 16.27 111.47L102.93 143.2C100.8 123.2 104.8 103.47 114.4 87.2L52.27 49.07ZM203.73 49.07L141.6 87.2C151.2 103.47 155.2 123.2 153.07 143.2L239.73 111.47C234.4 86.93 221.6 65.33 203.73 49.07ZM128 141.33C117.07 141.33 108.13 150.27 108.13 161.2C108.13 172.13 117.07 181.07 128 181.07C138.93 181.07 147.87 172.13 147.87 161.2C147.87 150.27 138.93 141.33 128 141.33ZM52.27 210.93L114.4 172.8C104.8 156.53 100.8 136.8 102.93 116.8L16.27 148.53C21.6 173.07 34.4 194.67 52.27 210.93ZM203.73 210.93C221.6 194.67 234.4 173.07 239.73 148.53L153.07 116.8C155.2 136.8 151.2 156.53 141.6 172.8L203.73 210.93ZM128 210.93C111.47 210.93 95.47 203.6 82.67 191.73L64.67 285.33C82.67 293.33 104 297.87 128 297.87C151.73 297.87 173.87 290.67 192.53 279.47L176.13 186.13C164.8 201.2 147.47 210.93 128 210.93Z"
              transform="translate(0 -24)"
            />
          </svg>
          <span class="logo-text">Vue<span class="logo-accent">Template</span></span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="nav-desktop">
          <router-link
            v-for="item in navigation"
            :key="item.href"
            :to="item.href"
            class="nav-link"
            :class="{ active: route.path === item.href }"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Actions -->
        <div class="actions">
          <!-- Dark Mode Toggle -->
          <button
            class="theme-toggle"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            aria-label="Toggle theme"
            @click="toggle"
          >
            <svg
              v-if="isDark"
              class="icon sun"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="5" stroke-width="2" />
              <line x1="12" y1="1" x2="12" y2="3" stroke-width="2" stroke-linecap="round" />
              <line x1="12" y1="21" x2="12" y2="23" stroke-width="2" stroke-linecap="round" />
              <line
                x1="4.22"
                y1="4.22"
                x2="5.64"
                y2="5.64"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="18.36"
                y1="18.36"
                x2="19.78"
                y2="19.78"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line x1="1" y1="12" x2="3" y2="12" stroke-width="2" stroke-linecap="round" />
              <line x1="21" y1="12" x2="23" y2="12" stroke-width="2" stroke-linecap="round" />
              <line
                x1="4.22"
                y1="19.78"
                x2="5.64"
                y2="18.36"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="18.36"
                y1="5.64"
                x2="19.78"
                y2="4.22"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <svg v-else class="icon moon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <!-- Mobile Menu Button -->
          <button
            class="mobile-menu-btn"
            :class="{ active: isMobileMenuOpen }"
            aria-label="Toggle menu"
            @click="toggleMobileMenu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <!-- Mobile Navigation -->
      <div class="nav-mobile" :class="{ open: isMobileMenuOpen }">
        <div class="nav-mobile-backdrop" @click="closeMobileMenu"></div>
        <div class="nav-mobile-panel">
          <router-link
            v-for="item in navigation"
            :key="item.href"
            :to="item.href"
            class="nav-mobile-link"
            :class="{ active: route.path === item.href }"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content container">
        <p class="footer-text">
          &copy; {{ currentYear }} Vue + Vite Template. Built with
          <a href="https://vuejs.org" target="_blank" rel="noopener">Vue 3</a>,
          <a href="https://vite.dev" target="_blank" rel="noopener">Vite</a>, and
          <a href="https://www.typescriptlang.org" target="_blank" rel="noopener">TypeScript</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: hsl(var(--card) / 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid hsl(var(--border));
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 0 1.5rem;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.logo:hover {
  opacity: 0.8;
}

.logo-icon {
  width: 2rem;
  height: 2rem;
  color: hsl(var(--primary));
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: hsl(var(--foreground));
}

.logo-accent {
  color: hsl(var(--primary));
}

/* Desktop Navigation */
.nav-desktop {
  display: none;
}

@media (min-width: 768px) {
  .nav-desktop {
    display: flex;
    gap: 0.5rem;
  }
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--muted));
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: hsl(var(--foreground));
  background-color: hsl(var(--muted) / 0.5);
}

.nav-link.active {
  color: hsl(var(--primary));
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: 1.25rem;
  height: 2px;
  background-color: hsl(var(--primary));
  border-radius: 1px;
}

/* Actions */
.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: hsl(var(--muted));
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  color: hsl(var(--foreground));
  background-color: hsl(var(--muted) / 0.5);
}

.theme-toggle .icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.375rem;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

.mobile-menu-btn:hover {
  background-color: hsl(var(--muted) / 0.5);
}

.mobile-menu-btn span {
  display: block;
  width: 1.25rem;
  height: 2px;
  background-color: hsl(var(--foreground));
  border-radius: 1px;
  transition: all 0.3s ease;
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(0.25rem, 0.25rem);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(0.25rem, -0.25rem);
}

/* Mobile Navigation */
.nav-mobile {
  display: flex;
}

@media (min-width: 768px) {
  .nav-mobile {
    display: none;
  }
}

.nav-mobile-panel {
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  background-color: hsl(var(--card));
  border-bottom: 1px solid hsl(var(--border));
  padding: 1rem;
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 40;
}

.nav-mobile.open .nav-mobile-panel {
  transform: translateY(0);
  opacity: 1;
}

.nav-mobile-link {
  display: block;
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: hsl(var(--muted));
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.nav-mobile-link:hover,
.nav-mobile-link.active {
  color: hsl(var(--primary));
  background-color: hsl(var(--muted) / 0.5);
}

/* Main Content */
.main {
  flex: 1;
}

/* Footer */
.footer {
  border-top: 1px solid hsl(var(--border));
  padding: 2rem 1.5rem;
}

.footer-content {
  max-width: 1280px;
  margin: 0 auto;
}

.footer-text {
  font-size: 0.875rem;
  color: hsl(var(--muted));
  text-align: center;
}

.footer-text a {
  color: hsl(var(--primary));
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline;
}

/* Container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 2rem;
  }
}
</style>
