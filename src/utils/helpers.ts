/**
 * Format a date string or Date object to a localized string.
 *
 * @param date - Date string or Date object
 * @param locale - Locale string (default: 'id-ID')
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  locale = 'id-ID',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(d)
}

/**
 * Format a number as currency.
 *
 * @param amount - Number to format
 * @param currency - Currency code (default: 'IDR')
 * @param locale - Locale string (default: 'id-ID')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = 'IDR', locale = 'id-ID'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Truncate a string to a maximum length with ellipsis.
 *
 * @param str - String to truncate
 * @param maxLength - Maximum length (default: 100)
 * @returns Truncated string
 */
export function truncate(str: string, maxLength = 100): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength).trimEnd()}...`
}

/**
 * Capitalize the first letter of a string.
 *
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Generate a simple unique ID (not for cryptographic use).
 *
 * @returns A unique string ID
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Debounce a function call.
 *
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds (default: 300)
 * @returns Debounced function
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Deep clone an object using structured clone.
 *
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export function deepClone<T>(obj: T): T {
  return structuredClone(obj)
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object).
 *
 * @param value - Value to check
 * @returns True if the value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Sleep for a specified duration (useful for testing/debugging).
 *
 * @param ms - Duration in milliseconds
 * @returns Promise that resolves after the duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Safely parse JSON without throwing.
 *
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed value or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}
