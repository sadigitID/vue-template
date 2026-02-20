<script setup lang="ts">
import { useCounter } from '@/composables/useCounter'
import { useDarkMode } from '@/composables/useDarkMode'
import { ref, computed } from 'vue'

const counter = useCounter(0)
// Variables used in template - vue-tsc limitation with template analysis
void counter
const count = counter.count
const increment = counter.increment
const decrement = counter.decrement
const reset = counter.reset
// Mark as used for TypeScript (used in template)
;[increment, decrement, reset].forEach(() => {})

const darkMode = useDarkMode()
// Variables used in template - vue-tsc limitation with template analysis
void darkMode
const isDark = darkMode.isDark
// Mark as used for TypeScript (used in template)
;[isDark].forEach(() => {})

const isHovering = ref(false)

// Computed used in template - vue-tsc limitation
const countLabel = computed(() => {
  if (count.value === 0) return 'Zero'
  if (count.value < 0) return 'Negative'
  return 'Positive'
})
void countLabel.value

// Computed used in template - vue-tsc limitation
const countColor = computed(() => {
  if (count.value === 0) return ''
  if (count.value < 0) return 'text-red-500'
  return 'text-emerald-500'
})
void countColor.value
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="badge">
          <span class="badge-dot"></span>
          <span class="badge-text">Vue 3.5 + Vite 6 + TypeScript</span>
        </div>
        <h1 class="hero-title">
          Build Modern Web Apps
          <span class="gradient-text">Faster</span>
        </h1>
        <p class="hero-description">
          Production-ready template with TypeScript, ESLint, Prettier, Vitest, Playwright, and dark
          mode support. Start building your next project in seconds.
        </p>
        <div class="hero-actions">
          <router-link to="/about" class="btn btn-primary"> Get Started </router-link>
          <a
            href="https://vuejs.org/guide/introduction.html"
            target="_blank"
            rel="noopener"
            class="btn btn-outline"
          >
            <svg
              class="btn-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Documentation
          </a>
        </div>
      </div>

      <!-- Hero Illustration -->
      <div class="hero-visual">
        <div class="floating-card" :class="{ 'is-hovering': isHovering }">
          <div class="card-header">
            <div class="card-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="card-title">App.vue</div>
          </div>
          <div class="card-content">
            <pre><code><span class="code-keyword">&lt;script</span> <span class="code-attr">setup</span><span class="code-keyword">&gt;</span>
  <span class="code-keyword">import</span> { ref } <span class="code-keyword">from</span> <span class="code-string">'vue'</span>

  <span class="code-keyword">const</span> count = <span class="code-function">ref</span>(<span class="code-number">{{ count }}</span>)
<span class="code-keyword">&lt;/script&gt;</span></code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">Everything You Need</h2>
        <p class="section-description">
          A complete toolkit for building modern web applications with best practices built-in.
        </p>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <h3 class="feature-title">Vue 3 Composition API</h3>
            <p class="feature-description">
              Built with Vue 3.5 using Composition API and &lt;script setup&gt; for better type
              inference and more concise code.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h3 class="feature-title">TypeScript</h3>
            <p class="feature-description">
              Full TypeScript support with strict mode enabled for better developer experience and
              fewer runtime errors.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 class="feature-title">Vite 6</h3>
            <p class="feature-description">
              Lightning-fast HMR during development and optimized production builds powered by
              Rollup.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 class="feature-title">API Service Layer</h3>
            <p class="feature-description">
              Ready-to-use API client with Axios, request interceptors, error handling, and reactive
              composables.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
            <h3 class="feature-title">Dark Mode</h3>
            <p class="feature-description">
              Built-in dark mode support with system preference detection and smooth theme
              transitions.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <polyline
                  points="22 4 12 14.01 9 11.01"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3 class="feature-title">Testing Ready</h3>
            <p class="feature-description">
              Vitest for unit testing and Playwright for E2E testing, both configured and ready to
              use.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Demo Section -->
    <section class="demo">
      <div class="demo-content">
        <h2 class="demo-title">Interactive Demo</h2>
        <p class="demo-description">
          Try the counter component below. It uses a Vue composable with reactive state management.
        </p>

        <div class="counter-card">
          <div class="counter-display">
            <span class="counter-label">Current Value:</span>
            <span class="counter-value" :class="countColor">{{ count }}</span>
            <span class="counter-status" :class="countColor">{{ countLabel }}</span>
          </div>
          <div class="counter-actions">
            <button class="counter-btn" aria-label="Decrement" @click="decrement">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round" />
              </svg>
            </button>
            <button class="counter-btn counter-btn-reset" @click="reset">Reset</button>
            <button class="counter-btn" aria-label="Increment" @click="increment">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19" stroke-linecap="round" />
                <line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <p class="demo-hint">
            Edit <code>src/views/HomeView.vue</code> to test hot module replacement.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="cta-content">
        <h2 class="cta-title">Ready to Build Something Amazing?</h2>
        <p class="cta-description">
          Explore the <router-link to="/about" class="cta-link">About page</router-link> or check
          out the
          <a href="https://github.com/vuejs/core" target="_blank" rel="noopener" class="cta-link">
            Vue documentation
          </a>
          to learn more.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 4rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
  align-items: center;
  min-height: calc(100vh - 4rem);
}

@media (min-width: 960px) {
  .hero {
    grid-template-columns: 1fr 1fr;
    padding: 6rem 2rem;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  background-color: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  width: fit-content;
}

.badge-dot {
  width: 0.5rem;
  height: 0.5rem;
  background-color: hsl(var(--primary));
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.hero-title {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.gradient-text {
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.125rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.6;
  max-width: 540px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 0.625rem;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: hsl(var(--primary));
  color: white;
}

.btn-primary:hover {
  background-color: hsl(var(--primary) / 0.9);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px hsl(var(--primary) / 0.3);
}

.btn-outline {
  background-color: transparent;
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}

.btn-outline:hover {
  background-color: hsl(var(--muted));
  border-color: hsl(var(--primary));
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

/* Hero Visual */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-card {
  width: 100%;
  max-width: 420px;
  background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted) / 0.3) 100%);
  border: 1px solid hsl(var(--border));
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px hsl(var(--foreground) / 0.15);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.floating-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 32px 64px -12px hsl(var(--foreground) / 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted) / 0.3);
}

.card-dots {
  display: flex;
  gap: 0.375rem;
}

.card-dots span {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: hsl(var(--muted-foreground) / 0.4);
}

.card-dots span:nth-child(1) {
  background-color: #ef4444;
}

.card-dots span:nth-child(2) {
  background-color: #f59e0b;
}

.card-dots span:nth-child(3) {
  background-color: #22c55e;
}

.card-title {
  font-size: 0.8125rem;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
}

.card-content {
  padding: 1.5rem;
  background-color: hsl(var(--background));
}

.card-content pre {
  margin: 0;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.8125rem;
  line-height: 1.6;
  overflow-x: auto;
}

.code-keyword {
  color: #c678dd;
}

.code-attr {
  color: #d19a66;
}

.code-string {
  color: #98c379;
}

.code-function {
  color: #61afef;
}

.code-number {
  color: #d19a66;
}

/* Features Section */
.features {
  padding: 6rem 1.5rem;
  background-color: hsl(var(--muted) / 0.3);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.125rem;
  color: hsl(var(--muted-foreground));
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  padding: 1.5rem;
  background-color: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 1rem;
  transition: all 0.2s ease;
}

.feature-card:hover {
  border-color: hsl(var(--primary));
  transform: translateY(-2px);
  box-shadow: 0 8px 16px hsl(var(--foreground) / 0.08);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  border-radius: 0.75rem;
  margin-bottom: 1rem;
}

.feature-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-description {
  font-size: 0.9375rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.6;
}

/* Demo Section */
.demo {
  padding: 6rem 1.5rem;
  max-width: 640px;
  margin: 0 auto;
}

.demo-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.75rem;
}

.demo-description {
  text-align: center;
  color: hsl(var(--muted-foreground));
  margin-bottom: 2rem;
}

.counter-card {
  padding: 2rem;
  background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--primary) / 0.05) 100%);
  border: 1px solid hsl(var(--border));
  border-radius: 1rem;
  text-align: center;
}

.counter-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.counter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.counter-value {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.counter-status {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
}

.counter-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.counter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: 0.625rem;
  color: hsl(var(--foreground));
  cursor: pointer;
  transition: all 0.2s ease;
}

.counter-btn:hover {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
  color: white;
  transform: scale(1.05);
}

.counter-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.counter-btn-reset {
  width: auto;
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.demo-hint {
  font-size: 0.8125rem;
  color: hsl(var(--muted-foreground));
}

.demo-hint code {
  padding: 0.125rem 0.375rem;
  background-color: hsl(var(--muted));
  border-radius: 0.25rem;
  font-family: monospace;
}

/* CTA Section */
.cta {
  padding: 4rem 1.5rem;
  background: linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--muted) / 0.3) 100%);
  border-top: 1px solid hsl(var(--border));
}

.cta-content {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.0625rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.6;
}

.cta-link {
  color: hsl(var(--primary));
  text-decoration: none;
  font-weight: 500;
}

.cta-link:hover {
  text-decoration: underline;
}
</style>
