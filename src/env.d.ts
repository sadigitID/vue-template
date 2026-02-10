/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Application title */
  readonly VITE_APP_TITLE: string
  /** Application description */
  readonly VITE_APP_DESCRIPTION: string
  /** Application URL */
  readonly VITE_APP_URL: string
  /** API base URL */
  readonly VITE_API_BASE_URL: string
  /** Enable analytics */
  readonly VITE_ENABLE_ANALYTICS: string
  /** Enable debug mode */
  readonly VITE_ENABLE_DEBUG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const component: DefineComponent<{}, {}, unknown>
  export default component
}
