/**
 * Example endpoint service
 *
 * This demonstrates how to create typed API endpoint services.
 * Copy this pattern for your actual API endpoints.
 */

import { api } from '../index'
import type { QueryParams } from '../types'

/**
 * Example data types
 */
export interface ExampleItem {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface CreateExampleDto {
  name: string
  description: string
}

export interface UpdateExampleDto {
  name?: string
  description?: string
}

/**
 * Example endpoint service
 */
export const exampleService = {
  /**
   * Get all items (paginated)
   */
  findAll: (params: QueryParams = {}) => api.getPaginated<ExampleItem>('/examples', params),

  /**
   * Get single item by ID
   */
  findOne: (id: string) => api.get<ExampleItem>(`/examples/${id}`),

  /**
   * Create new item
   */
  create: (data: CreateExampleDto) => api.post<ExampleItem>('/examples', data),

  /**
   * Update item
   */
  update: (id: string, data: UpdateExampleDto) => api.patch<ExampleItem>(`/examples/${id}`, data),

  /**
   * Delete item
   */
  remove: (id: string) => api.delete<void>(`/examples/${id}`),
}
