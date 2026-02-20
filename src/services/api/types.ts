/**
 * API service types
 */

import type { ApiResponse } from '@/types'

/**
 * HTTP methods supported by the API client
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * Request configuration options
 */
export interface RequestConfig {
  headers?: Record<string, string>
  params?: QueryParams
  skipAuth?: boolean
  skipErrorHandler?: boolean
}

/**
 * API error response structure
 */
export interface ApiError {
  message: string
  code?: string
  status?: number
  errors?: Record<string, string[]>
  payload?: unknown
}

/**
 * Query parameters for filtering and pagination
 */
export interface QueryParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  [key: string]: unknown
}

/**
 * Pagination response metadata
 */
export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  perPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  items: T[]
  meta: PaginationMeta
}

/**
 * Typed API response wrapper
 */
export type ApiResult<T> = ApiResponse<T>

/**
 * Upload progress callback
 */
export type UploadProgressCallback = (progress: number) => void

/**
 * Download progress callback
 */
export type DownloadProgressCallback = (progress: number) => void

/**
 * Request with progress tracking
 */
export interface RequestWithProgress extends RequestConfig {
  onUploadProgress?: UploadProgressCallback
  onDownloadProgress?: DownloadProgressCallback
}
