/**
 * Common API response wrapper type
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

/**
 * Pagination metadata
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
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc'

/**
 * Sort options
 */
export interface SortOptions {
  field: string
  direction: SortDirection
}

/**
 * Loading states for async operations
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

/**
 * Key-value pair type
 */
export interface KeyValue<T = string> {
  key: string
  value: T
}

/**
 * Select option type for dropdowns
 */
export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
}
