/**
 * API service - Main interface for all API operations
 */

import { type AxiosRequestConfig } from 'axios'
import { apiClient, setAuthToken, clearAuthToken } from './client'
import type {
  ApiError,
  ApiResult,
  HttpMethod,
  PaginatedResponse,
  QueryParams,
  RequestConfig,
  UploadProgressCallback,
  DownloadProgressCallback,
} from './types'

/**
 * Custom axios config with our extra options
 */
interface CustomAxiosConfig extends AxiosRequestConfig {
  skipAuth?: boolean
  skipErrorHandler?: boolean
}

/**
 * API service class
 */
class ApiService {
  /**
   * Perform a generic API request
   */
  private async request<T>(
    method: HttpMethod,
    path: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    try {
      const axiosConfig: CustomAxiosConfig = {
        method,
        url: path,
        data,
        params: config?.params,
        headers: config?.headers,
        skipAuth: config?.skipAuth,
        skipErrorHandler: config?.skipErrorHandler,
      }

      const response = await apiClient.request<T>(axiosConfig)
      return response.data
    } catch (error) {
      throw error as ApiError
    }
  }

  /**
   * Perform a request with file upload/download progress tracking
   */
  private async requestWithProgress<T>(
    method: HttpMethod,
    path: string,
    data: unknown,
    config: RequestConfig & {
      onUploadProgress?: UploadProgressCallback
      onDownloadProgress?: DownloadProgressCallback
    }
  ): Promise<T> {
    try {
      const axiosConfig: CustomAxiosConfig = {
        method,
        url: path,
        data,
        params: config.params,
        headers: config.headers,
        skipAuth: config.skipAuth,
        onUploadProgress: (progressEvent) => {
          if (config.onUploadProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            config.onUploadProgress(progress)
          }
        },
        onDownloadProgress: (progressEvent) => {
          if (config.onDownloadProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            config.onDownloadProgress(progress)
          }
        },
      }

      const response = await apiClient.request<T>(axiosConfig)
      return response.data
    } catch (error) {
      throw error as ApiError
    }
  }

  /**
   * GET request - Fetch a single resource
   */
  async get<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', path, undefined, config)
  }

  /**
   * GET request with typed ApiResponse wrapper
   */
  async getWrapped<T>(path: string, config?: RequestConfig): Promise<ApiResult<T>> {
    return this.get<ApiResult<T>>(path, config)
  }

  /**
   * POST request - Create a new resource
   */
  async post<T>(path: string, data: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', path, data, config)
  }

  /**
   * POST request with typed ApiResponse wrapper
   */
  async postWrapped<T>(path: string, data: unknown, config?: RequestConfig): Promise<ApiResult<T>> {
    return this.post<ApiResult<T>>(path, data, config)
  }

  /**
   * PUT request - Update a resource (full replacement)
   */
  async put<T>(path: string, data: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', path, data, config)
  }

  /**
   * PUT request with typed ApiResponse wrapper
   */
  async putWrapped<T>(path: string, data: unknown, config?: RequestConfig): Promise<ApiResult<T>> {
    return this.put<ApiResult<T>>(path, data, config)
  }

  /**
   * PATCH request - Update a resource (partial update)
   */
  async patch<T>(path: string, data: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PATCH', path, data, config)
  }

  /**
   * PATCH request with typed ApiResponse wrapper
   */
  async patchWrapped<T>(
    path: string,
    data: unknown,
    config?: RequestConfig
  ): Promise<ApiResult<T>> {
    return this.patch<ApiResult<T>>(path, data, config)
  }

  /**
   * DELETE request - Remove a resource
   */
  async delete<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', path, undefined, config)
  }

  /**
   * DELETE request with typed ApiResponse wrapper
   */
  async deleteWrapped<T>(path: string, config?: RequestConfig): Promise<ApiResult<T>> {
    return this.delete<ApiResult<T>>(path, config)
  }

  /**
   * GET request with query parameters
   */
  async getWithQuery<T>(path: string, params: QueryParams, config?: RequestConfig): Promise<T> {
    return this.get<T>(path, { ...config, params })
  }

  /**
   * GET paginated response
   */
  async getPaginated<T>(
    path: string,
    params: QueryParams,
    config?: RequestConfig
  ): Promise<PaginatedResponse<T>> {
    return this.get<PaginatedResponse<T>>(path, { ...config, params })
  }

  /**
   * Upload file with progress tracking
   */
  async uploadFile<T>(
    path: string,
    file: File | FormData,
    onProgress?: (progress: number) => void,
    config?: RequestConfig
  ): Promise<T> {
    const formData = file instanceof FormData ? file : new FormData()
    if (file instanceof File) {
      formData.append('file', file)
    }

    return this.requestWithProgress<T>('POST', path, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress,
    })
  }

  /**
   * Download file with progress tracking
   */
  async downloadFile(
    path: string,
    onProgress?: (progress: number) => void,
    config?: RequestConfig
  ): Promise<Blob> {
    const response = await apiClient.request<Blob>({
      url: path,
      method: 'GET',
      headers: {
        ...config?.headers,
        Accept: '*/*',
      },
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    })

    return response.data
  }

  /**
   * Set authentication token
   */
  setAuth(token: string): void {
    setAuthToken(token)
  }

  /**
   * Clear authentication token
   */
  clearAuth(): void {
    clearAuthToken()
  }
}

/**
 * Export singleton instance
 */
export const api = new ApiService()

/**
 * Export ApiError type for use in components
 */
export type { ApiError }

export default api
