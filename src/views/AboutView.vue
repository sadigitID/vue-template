<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('overview')

const tabs = [
  { id: 'overview', label: 'Overview', icon: 'info' },
  { id: 'tech', label: 'Tech Stack', icon: 'code' },
  { id: 'features', label: 'Features', icon: 'star' },
]

const techStack = [
  {
    name: 'Vue 3',
    version: '3.5+',
    description: 'Progressive JavaScript framework',
    url: 'https://vuejs.org',
  },
  {
    name: 'Vite',
    version: '6',
    description: 'Next generation frontend tooling',
    url: 'https://vite.dev',
  },
  {
    name: 'TypeScript',
    version: '5.6',
    description: 'Typed JavaScript at Any Scale',
    url: 'https://www.typescriptlang.org',
  },
  {
    name: 'Vue Router',
    version: '5',
    description: 'Official router for Vue.js',
    url: 'https://router.vuejs.org',
  },
  {
    name: 'Pinia',
    version: '3',
    description: 'Intuitive, type safe, store for Vue',
    url: 'https://pinia.vuejs.org',
  },
  {
    name: 'Vitest',
    version: '2',
    description: 'Blazing fast unit test framework',
    url: 'https://vitest.dev',
  },
  {
    name: 'Playwright',
    version: '1.58',
    description: 'End-to-end testing framework',
    url: 'https://playwright.dev',
  },
  {
    name: 'Axios',
    version: '1.7',
    description: 'Promise based HTTP client',
    url: 'https://axios-http.com',
  },
  {
    name: 'ESLint',
    version: '10',
    description: 'Find and fix problems in JavaScript',
    url: 'https://eslint.org',
  },
  {
    name: 'Prettier',
    version: '3',
    description: 'Opinionated code formatter',
    url: 'https://prettier.io',
  },
]

const features = [
  {
    title: 'Hot Module Replacement',
    description: 'See your changes instantly without full page refresh during development.',
    icon: 'zap',
  },
  {
    title: 'TypeScript Strict Mode',
    description: 'Catch errors at compile time with full TypeScript strict mode enabled.',
    icon: 'shield',
  },
  {
    title: 'API Service Layer',
    description: 'Ready-to-use API client with Axios, interceptors, and error handling.',
    icon: 'server',
  },
  {
    title: 'Dark Mode Support',
    description: 'Built-in dark mode with system preference detection and smooth transitions.',
    icon: 'moon',
  },
  {
    title: 'Testing Setup',
    description: 'Vitest for unit tests and Playwright for E2E tests, pre-configured.',
    icon: 'check-circle',
  },
  {
    title: 'Code Quality',
    description: 'ESLint and Prettier with Git hooks for consistent code style.',
    icon: 'sparkles',
  },
]
</script>

<template>
  <div class="about">
    <!-- Header -->
    <section class="about-header">
      <div class="header-content">
        <h1 class="about-title">About This Template</h1>
        <p class="about-description">
          A production-ready Vue 3 + Vite template with TypeScript, testing setup, and best
          practices built-in. Start building your next project with confidence.
        </p>
      </div>
    </section>

    <!-- Tabs -->
    <section class="tabs-section">
      <div class="tabs-container">
        <div class="tabs-header">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-button"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <span class="tab-icon">{{ getTabIcon(tab.icon) }}</span>
            {{ tab.label }}
          </button>
        </div>

        <div class="tabs-content">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="tab-pane">
            <div class="overview-content">
              <h2 class="section-heading">Why This Template?</h2>
              <p class="overview-text">
                This template is designed to help you start building modern web applications quickly
                without sacrificing code quality or developer experience. It includes all the
                essential tools and configurations you need, so you can focus on building your
                product instead of setting up your tooling.
              </p>

              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-value">100+</div>
                  <div class="stat-label">Hours Saved</div>
                  <div class="stat-description">On initial setup</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">10+</div>
                  <div class="stat-label">Tools Included</div>
                  <div class="stat-description">Pre-configured</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">TS</div>
                  <div class="stat-label">Full TypeScript</div>
                  <div class="stat-description">Strict mode enabled</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">⚡</div>
                  <div class="stat-label">Lightning Fast</div>
                  <div class="stat-description">With Vite HMR</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tech Stack Tab -->
          <div v-if="activeTab === 'tech'" class="tab-pane">
            <h2 class="section-heading">Technology Stack</h2>
            <div class="tech-grid">
              <a
                v-for="tech in techStack"
                :key="tech.name"
                :href="tech.url"
                target="_blank"
                rel="noopener"
                class="tech-card"
              >
                <div class="tech-info">
                  <div class="tech-header">
                    <span class="tech-name">{{ tech.name }}</span>
                    <span class="tech-version">{{ tech.version }}</span>
                  </div>
                  <p class="tech-description">{{ tech.description }}</p>
                </div>
                <svg
                  class="tech-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Features Tab -->
          <div v-if="activeTab === 'features'" class="tab-pane">
            <h2 class="section-heading">Features</h2>
            <div class="features-list">
              <div v-for="feature in features" :key="feature.title" class="feature-item">
                <div class="feature-icon">{{ getFeatureIcon(feature.icon) }}</div>
                <div class="feature-content">
                  <h3 class="feature-title">{{ feature.title }}</h3>
                  <p class="feature-description">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Ready to Get Started?</h2>
        <p class="cta-description">
          Head back to the
          <router-link to="/" class="cta-link">home page</router-link>
          and start building your amazing application.
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
function getTabIcon(icon: string): string {
  const icons: Record<string, string> = {
    info: 'ℹ️',
    code: '💻',
    star: '⭐',
  }
  return icons[icon] || '•'
}

function getFeatureIcon(icon: string): string {
  const icons: Record<string, string> = {
    zap: '⚡',
    shield: '🛡️',
    server: '🔌',
    moon: '🌙',
    'check-circle': '✅',
    sparkles: '✨',
  }
  return icons[icon] || '•'
}
</script>

<style scoped>
.about {
  width: 100%;
}

/* Header */
.about-header {
  padding: 4rem 1.5rem 3rem;
  text-align: center;
}

@media (min-width: 768px) {
  .about-header {
    padding: 6rem 1.5rem 4rem;
  }
}

.header-content {
  max-width: 768px;
  margin: 0 auto;
}

.about-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 1rem;
}

.about-description {
  font-size: 1.125rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.6;
}

/* Tabs Section */
.tabs-section {
  padding: 2rem 0 4rem;
}

.tabs-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.tabs-header {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: hsl(var(--muted) / 0.5);
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  overflow-x: auto;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  color: hsl(var(--muted-foreground));
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-button:hover {
  color: hsl(var(--foreground));
  background-color: hsl(var(--background));
}

.tab-button.active {
  background-color: hsl(var(--background));
  color: hsl(var(--primary));
  box-shadow: 0 1px 3px hsl(var(--foreground) / 0.1);
}

.tab-icon {
  font-size: 1rem;
}

.tabs-content {
  min-height: 300px;
}

.tab-pane {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Overview */
.section-heading {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.overview-text {
  font-size: 1rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.7;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  padding: 1.5rem;
  background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted) / 0.3) 100%);
  border: 1px solid hsl(var(--border));
  border-radius: 1rem;
  text-align: center;
  transition: all 0.2s ease;
}

.stat-card:hover {
  border-color: hsl(var(--primary));
  transform: translateY(-2px);
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.stat-description {
  font-size: 0.8125rem;
  color: hsl(var(--muted-foreground));
}

/* Tech Grid */
.tech-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tech-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted) / 0.3) 100%);
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.tech-card:hover {
  border-color: hsl(var(--primary));
  transform: translateX(4px);
}

.tech-info {
  flex: 1;
}

.tech-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.tech-name {
  font-size: 1rem;
  font-weight: 600;
  color: hsl(var(--foreground));
}

.tech-version {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background-color: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  border-radius: 9999px;
}

.tech-description {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.tech-arrow {
  width: 1rem;
  height: 1rem;
  color: hsl(var(--muted-foreground));
  flex-shrink: 0;
}

/* Features List */
.features-list {
  display: grid;
  gap: 1rem;
}

.feature-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted) / 0.3) 100%);
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  align-items: flex-start;
}

.feature-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.feature-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.feature-description {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.5;
}

/* CTA Section */
.cta-section {
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--muted) / 0.3) 100%);
  border-top: 1px solid hsl(var(--border));
}

.cta-content {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.cta-description {
  font-size: 1rem;
  color: hsl(var(--muted-foreground));
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
