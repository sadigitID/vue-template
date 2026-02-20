/**
 * Composable for API operations with loading states and error handling
 */

import { ref, computed, watch, type Ref } from 'vue'
import { api as apiService, type ApiError } from '@/services/api'
import type { LoadingState } from '@/types'

/**
 * Composable return type
 */
export interface UseApiReturn<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<ApiError | null>
  state: Ref<LoadingState>
  execute: () => Promise<T>
  reset: () => void
}

/**
 * Composable options
 */
export interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: unknown) => void
  onError?: (error: ApiError) => void
}

/**
 * Base API composable with loading state and error handling
 */
export function useApi<T>(
  apiFunction: () => Promise<T>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const { immediate = false, onSuccess, onError } = options

  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<ApiError | null>(null)
  const state = ref<LoadingState>('idle')

  const execute = async (): Promise<T> => {
    loading.value = true
    state.value = 'loading'
    error.value = null

    try {
      const result = await apiFunction()
      data.value = result
      state.value = 'success'
      onSuccess?.(result)
      return result
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError
      state.value = 'error'
      onError?.(apiError)
      throw apiError
    } finally {
      loading.value = false
    }
  }

  const reset = (): void => {
    data.value = null
    loading.value = false
    error.value = null
    state.value = 'idle'
  }

  if (immediate) {
    execute()
  }

  return {
    data,
    loading,
    error,
    state,
    execute,
    reset,
  }
}

/**
 * Composable for GET requests
 */
export function useFetch<T>(
  path: string,
  options: UseApiOptions & { immediate?: boolean } = {}
): UseApiReturn<T> {
  return useApi<T>(() => apiService.get<T>(path), options)
}

/**
 * Composable for POST requests
 */
export function usePost<T>(
  path: string,
  body: unknown,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  return useApi<T>(() => apiService.post<T>(path, body), options)
}

/**
 * Composable for PUT requests
 */
export function usePut<T>(
  path: string,
  body: unknown,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  return useApi<T>(() => apiService.put<T>(path, body), options)
}

/**
 * Composable for PATCH requests
 */
export function usePatch<T>(
  path: string,
  body: unknown,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  return useApi<T>(() => apiService.patch<T>(path, body), options)
}

/**
 * Composable for DELETE requests
 */
export function useDelete<T>(path: string, options: UseApiOptions = {}): UseApiReturn<T> {
  return useApi<T>(() => apiService.delete<T>(path), options)
}

/**
 * Composable for paginated requests
 */
export interface UsePaginatedReturn<T> extends UseApiReturn<PaginatedData<T>> {
  items: Ref<T[]>
  meta: Ref<Meta | null>
  currentPage: Ref<number>
  totalPages: Ref<number>
  totalItems: Ref<number>
  hasNextPage: Ref<boolean>
  hasPrevPage: Ref<boolean>
  nextPage: () => Promise<void>
  prevPage: () => Promise<void>
  goToPage: (page: number) => Promise<void>
}

export interface PaginatedData<T> {
  items: T[]
  meta: Meta
}

export interface Meta {
  currentPage: number
  totalPages: number
  totalItems: number
  perPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function usePaginated<T>(
  path: string,
  initialParams: Record<string, unknown> = {},
  options: UseApiOptions = {}
): UsePaginatedReturn<T> {
  const params = ref({ page: 1, limit: 10, ...initialParams })

  const baseResult = useApi<PaginatedData<T>>(
    () => apiService.get<PaginatedData<T>>(path, { params: params.value }),
    { ...options, immediate: options.immediate ?? true }
  )

  const items = ref<T[]>([]) as Ref<T[]>
  const meta = ref<Meta | null>(null)

  // Watch data changes
  watch(
    () => baseResult.data.value,
    (newData) => {
      if (newData) {
        items.value = newData.items
        meta.value = newData.meta
      }
    },
    { immediate: true }
  )

  const currentPage = computed(() => meta.value?.currentPage ?? 1)
  const totalPages = computed(() => meta.value?.totalPages ?? 0)
  const totalItems = computed(() => meta.value?.totalItems ?? 0)
  const hasNextPage = computed(() => meta.value?.hasNextPage ?? false)
  const hasPrevPage = computed(() => meta.value?.hasPrevPage ?? false)

  const nextPage = async (): Promise<void> => {
    if (hasNextPage.value) {
      params.value.page = currentPage.value + 1
      await baseResult.execute()
    }
  }

  const prevPage = async (): Promise<void> => {
    if (hasPrevPage.value) {
      params.value.page = currentPage.value - 1
      await baseResult.execute()
    }
  }

  const goToPage = async (page: number): Promise<void> => {
    if (page >= 1 && page <= totalPages.value) {
      params.value.page = page
      await baseResult.execute()
    }
  }

  return {
    ...baseResult,
    items,
    meta,
    currentPage,
    totalPages,
    totalItems,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage,
  }
}

/**
 * Composable for file upload with progress tracking
 */
export interface UseUploadReturn {
  upload: (file: File | FormData) => Promise<void>
  progress: Ref<number>
  uploading: Ref<boolean>
  error: Ref<ApiError | null>
  reset: () => void
}

export function useUpload(path: string): UseUploadReturn {
  const progress = ref(0)
  const uploading = ref(false)
  const error = ref<ApiError | null>(null)

  const upload = async (file: File | FormData): Promise<void> => {
    uploading.value = true
    progress.value = 0
    error.value = null

    try {
      await apiService.uploadFile(
        path,
        file,
        (prog) => {
          progress.value = prog
        },
        undefined
      )
    } catch (err) {
      error.value = err as ApiError
      throw error.value
    } finally {
      uploading.value = false
    }
  }

  const reset = (): void => {
    progress.value = 0
    uploading.value = false
    error.value = null
  }

  return { upload, progress, uploading, error, reset }
}

// Re-export API service for direct usage
export { apiService as api }
