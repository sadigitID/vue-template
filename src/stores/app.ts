import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * App-level global store for shared application state.
 *
 * Usage:
 * ```ts
 * const appStore = useAppStore()
 * appStore.setLoading(true)
 * ```
 */
export const useAppStore = defineStore('app', () => {
  // --- State ---
  const isLoading = ref(false)
  const isSidebarOpen = ref(false)
  const notification = ref<{
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
  } | null>(null)

  // --- Getters ---
  const hasNotification = computed(() => notification.value !== null)

  // --- Actions ---
  function setLoading(value: boolean): void {
    isLoading.value = value
  }

  function toggleSidebar(): void {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  function showNotification(type: 'success' | 'error' | 'warning' | 'info', message: string): void {
    notification.value = { type, message }
  }

  function clearNotification(): void {
    notification.value = null
  }

  return {
    // State
    isLoading,
    isSidebarOpen,
    notification,
    // Getters
    hasNotification,
    // Actions
    setLoading,
    toggleSidebar,
    showNotification,
    clearNotification,
  }
})
