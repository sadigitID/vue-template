/**
 * Composable untuk dark mode dengan localStorage persistence
 */

import { ref, watch, onMounted, onUnmounted } from 'vue'

const STORAGE_KEY = 'theme'

type Theme = 'light' | 'dark' | 'system'

const systemDark = ref(false)
const theme = ref<Theme>('system')

/**
 * Detect system theme preference
 */
const detectSystemTheme = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Get current theme (actual applied theme)
 */
export const useDarkMode = () => {
  const isDark = ref(false)

  /**
   * Initialize theme from localStorage
   */
  const initTheme = (): void => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      theme.value = stored
    }
    updateTheme()
  }

  /**
   * Update applied theme based on current setting
   */
  const updateTheme = (): void => {
    systemDark.value = detectSystemTheme()

    if (theme.value === 'system') {
      isDark.value = systemDark.value
    } else {
      isDark.value = theme.value === 'dark'
    }

    // Apply to document
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  /**
   * Set theme preference
   */
  const setTheme = (newTheme: Theme): void => {
    theme.value = newTheme
    localStorage.setItem(STORAGE_KEY, newTheme)
    updateTheme()
  }

  /**
   * Toggle between light and dark
   */
  const toggle = (): void => {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  // Listen for system theme changes
  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (): void => {
      systemDark.value = mediaQuery.matches
      if (theme.value === 'system') {
        updateTheme()
      }
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      onUnmounted(() => mediaQuery.removeEventListener('change', handleChange))
    }
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      onUnmounted(() => mediaQuery.removeListener(handleChange))
    }
  })

  // Watch theme changes
  watch(theme, updateTheme)

  return {
    isDark,
    theme,
    systemDark: systemDark.value,
    setTheme,
    toggle,
    initTheme,
  }
}
