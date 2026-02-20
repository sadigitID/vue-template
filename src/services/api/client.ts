/**
 * Axios API client with interceptors
 */

import axios, { type AxiosInstance, type AxiosError } from 'axios'
import type { ApiError } from './types'

/**
 * Get API base URL from environment
 */
const getBaseURL = (): string => {
  return import.meta.env.VITE_API_BASE_URL || '/api'
}

/**
 * Get API timeout from environment
 */
const getTimeout = (): number => {
  return Number(import.meta.env.VITE_API_TIMEOUT) || 30000
}

/**
 * Create and configure axios instance
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: getBaseURL(),
    timeout: getTimeout(),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  return client
}

/**
 * Axios instance for API requests
 */
export const apiClient = createApiClient()

/**
 * Auth token storage key
 */
const AUTH_TOKEN_KEY = 'auth_token'

/**
 * Get stored auth token
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

/**
 * Set auth token
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

/**
 * Clear auth token
 */
export const clearAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

/**
 * Transform axios error to API error
 */
const transformError = (error: AxiosError<unknown>): ApiError => {
  const response = error.response

  if (response) {
    const data = response.data as
      | { message?: string; errors?: Record<string, string[]>; code?: string }
      | undefined

    return {
      message: data?.message || 'An error occurred',
      code: data?.code,
      status: response.status,
      errors: data?.errors,
      payload: data,
    }
  }

  if (error.request) {
    return {
      message: 'No response from server. Please check your connection.',
      code: 'NETWORK_ERROR',
    }
  }

  return {
    message: error.message || 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  }
}

/**
 * Request interceptor - Add auth token
 */
apiClient.interceptors.request.use((config) => {
  // Add auth token if not skipped
  const skipAuth = (config as unknown as Record<string, unknown>).skipAuth as boolean | undefined
  if (!skipAuth) {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

/**
 * Response interceptor - Handle errors globally
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<unknown>) => {
    const apiError = transformError(error)

    // Handle 401 unauthorized - clear token and redirect to login
    if (apiError.status === 401) {
      clearAuthToken()
      location.href = '/login'
    }

    return Promise.reject(apiError)
  }
)

export default apiClient
