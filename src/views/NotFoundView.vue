<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const suggestions = [
  { title: 'Beranda', description: 'Kembali ke halaman utama', href: '/' },
  { title: 'Tentang', description: 'Pelajari lebih lanjut tentang template ini', href: '/about' },
]

const goHome = (): void => {
  router.push('/')
}

const goBack = (): void => {
  if (window.history.length > 1) {
    router.back()
  } else {
    goHome()
  }
}

// Animation for the floating elements
const floatElements = ref<{ id: number; x: number; y: number; delay: number }[]>([])

onMounted(() => {
  // Generate random floating elements
  floatElements.value = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.2,
  }))
})
</script>

<template>
  <div class="not-found">
    <!-- Floating Elements -->
    <div class="floating-elements">
      <div
        v-for="el in floatElements"
        :key="el.id"
        class="floating-element"
        :style="{
          left: `${el.x}%`,
          top: `${el.y}%`,
          animationDelay: `${el.delay}s`,
        }"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
    </div>

    <div class="not-found-content">
      <!-- 404 with animation -->
      <div class="error-code">
        <span class="error-digit">4</span>
        <span class="error-zero">
          <svg class="zero-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2" />
            <path d="M12 8v4M12 16h.01" stroke-width="2" stroke-linecap="round" />
          </svg>
        </span>
        <span class="error-digit">4</span>
      </div>

      <!-- Error Message -->
      <h1 class="error-title">Halaman Tidak Ditemukan</h1>
      <p class="error-description">
        Sepertinya Anda tersesat. Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau
        mungkin tidak pernah ada.
      </p>

      <!-- Action Buttons -->
      <div class="error-actions">
        <button type="button" class="btn-primary" @click="goHome">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2" />
            <polyline points="9 22 9 12 15 12 15 22" stroke-width="2" />
          </svg>
          Kembali ke Beranda
        </button>
        <button type="button" class="btn-secondary" @click="goBack">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Kembali
        </button>
      </div>

      <!-- Suggestions -->
      <div class="suggestions">
        <p class="suggestions-title">Mungkin Anda mencari:</p>
        <div class="suggestions-grid">
          <router-link
            v-for="suggestion in suggestions"
            :key="suggestion.href"
            :to="suggestion.href"
            class="suggestion-card"
          >
            <div class="suggestion-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M9 18l6-6-6-6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="suggestion-content">
              <h3 class="suggestion-title">{{ suggestion.title }}</h3>
              <p class="suggestion-description">{{ suggestion.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Footer decoration -->
    <div class="footer-decoration">
      <div class="wave"></div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  overflow: hidden;
}

/* Floating Elements Background */
.floating-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-element {
  position: absolute;
  width: 2rem;
  height: 2rem;
  color: hsl(var(--primary) / 0.1);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Content */
.not-found-content {
  position: relative;
  z-index: 1;
  max-width: 640px;
  width: 100%;
  text-align: center;
}

/* Error Code */
.error-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: clamp(4rem, 20vw, 10rem);
  font-weight: 900;
  line-height: 1;
}

.error-digit {
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse 2s ease-in-out infinite;
}

.error-zero {
  position: relative;
  width: 1em;
  height: 1em;
  animation: bounce 2s ease-in-out infinite;
}

.zero-icon {
  width: 100%;
  height: 100%;
  color: hsl(var(--primary));
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Error Title */
.error-title {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 1rem;
  color: hsl(var(--foreground));
}

.error-description {
  font-size: 1.125rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

/* Action Buttons */
.error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-dark)) 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 14px hsl(var(--primary) / 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px hsl(var(--primary) / 0.4);
}

.btn-secondary {
  background-color: hsl(var(--muted) / 0.5);
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}

.btn-secondary:hover {
  background-color: hsl(var(--muted));
  border-color: hsl(var(--primary));
}

.btn-icon {
  width: 1.125rem;
  height: 1.125rem;
}

/* Suggestions */
.suggestions {
  text-align: left;
}

.suggestions-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(var(--muted-foreground));
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.suggestions-grid {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 480px) {
  .suggestions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.suggestion-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted) / 0.3) 100%);
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.suggestion-card:hover {
  border-color: hsl(var(--primary));
  transform: translateX(4px);
}

.suggestion-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  border-radius: 0.625rem;
  flex-shrink: 0;
}

.suggestion-icon svg {
  width: 1.125rem;
  height: 1.125rem;
}

.suggestion-content {
  flex: 1;
  min-width: 0;
}

.suggestion-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: hsl(var(--foreground));
  margin-bottom: 0.125rem;
}

.suggestion-description {
  font-size: 0.8125rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.4;
}

/* Footer Decoration */
.footer-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  overflow: hidden;
  pointer-events: none;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    90deg,
    hsl(var(--primary) / 0.1) 0%,
    hsl(var(--primary) / 0.05) 50%,
    hsl(var(--primary) / 0.1) 100%
  );
  border-radius: 40% 40% 0 0;
  animation: wave 8s ease-in-out infinite;
}

@keyframes wave {
  0%,
  100% {
    transform: translateX(0) translateY(20px);
  }
  50% {
    transform: translateX(-25%) translateY(0);
  }
}

/* Dark mode adjustments */
.dark .floating-element {
  color: hsl(var(--primary) / 0.15);
}
</style>
