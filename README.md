# Vue + Vite Template

[Vue 3](https://vuejs.org/) adalah framework JavaScript untuk membangun antarmuka pengguna (UI) yang reaktif dan berbasis komponen. [Vite](https://vite.dev/) adalah build tool modern yang menyediakan Hot Module Replacement (HMR) super cepat saat development dan build yang optimal untuk production. Template ini menggabungkan keduanya dengan konfigurasi lengkap — TypeScript, linting, formatting, testing, dan deployment — siap pakai tanpa perlu setup dari nol.

## Tech Stack

| Teknologi                                             | Versi | Fungsi                                            |
| ----------------------------------------------------- | ----- | ------------------------------------------------- |
| [Vue 3](https://vuejs.org/)                           | 3.5+  | UI Framework (Composition API + `<script setup>`) |
| [Vite](https://vite.dev/)                             | 6     | Build tool & dev server                           |
| [TypeScript](https://www.typescriptlang.org/)         | 5.6   | Type safety (strict mode)                         |
| [Vue Router](https://router.vuejs.org/)               | 4     | Client-side routing                               |
| [Pinia](https://pinia.vuejs.org/)                     | 2.3   | State management                                  |
| [Axios](https://axios-http.com/)                      | 1.7   | HTTP client untuk API requests                    |
| [Vitest](https://vitest.dev/)                         | 2     | Unit testing                                      |
| [Playwright](https://playwright.dev/)                 | 1.49  | E2E testing                                       |
| [ESLint](https://eslint.org/)                         | 9     | Code linting                                      |
| [Prettier](https://prettier.io/)                      | 3     | Code formatting                                   |
| [Husky](https://typicode.github.io/husky/)            | 9     | Git hooks manager                                 |
| [Commitlint](https://commitlint.js.org/)              | 20    | Commit message linting                            |
| [Docker](https://www.docker.com/)                     | -     | Containerization                                  |
| [GitHub Actions](https://github.com/features/actions) | -     | CI/CD                                             |

## Quick Start

### Prasyarat

- [Node.js](https://nodejs.org/) >= 22
- [npm](https://www.npmjs.com/) >= 10

### Membuat Project Baru

```bash
# Buat project baru dari template
npx degit sadigitid/vue-template nama-project
cd nama-project

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

> **Apa itu `degit`?** `degit` adalah tool dari [Rich Harris](https://github.com/Rich-Harris/degit) yang men-download repository Git **tanpa** history commit. Hasilnya adalah project bersih yang siap di-inisialisasi dengan `git init`. Perintah `npx degit sadigitid/vue-template` akan mengambil template ini langsung dari GitHub.

> **Kenapa `npm` bukan `pnpm`?** Template ini menggunakan `npm` karena sudah tersedia bawaan bersama Node.js — tidak perlu install package manager tambahan. Jika tim memilih menggunakan `pnpm` atau `yarn`, cukup ganti perintah `npm` di atas dan di `package.json`.

## Coba Dulu

Setelah menjalankan `npm run dev`, ikuti langkah-langkah berikut untuk memastikan semuanya berjalan:

### 1. Buka Browser

Buka [http://localhost:3000](http://localhost:3000) — kamu akan melihat halaman utama template.

### 2. Coba Navigasi

Klik link "About" di navigasi. Halaman akan berganti tanpa reload browser — ini adalah client-side routing dari Vue Router. Setiap file di `src/views/` yang didaftarkan di `src/router/index.ts` menjadi halaman.

### 3. Coba Hot Module Replacement

Buka file `src/views/HomeView.vue`, ubah teks di template (misalnya ganti judul), lalu simpan. Perubahan langsung muncul di browser tanpa perlu refresh — ini adalah HMR dari Vite.

### 4. Coba 404 Page

Buka URL yang tidak ada, misalnya [http://localhost:3000/halaman-tidak-ada](http://localhost:3000/halaman-tidak-ada). Kamu akan melihat halaman 404 dari `src/views/NotFoundView.vue`.

## Struktur Project

```
vue-vite-template/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI pipeline
├── .husky/
│   ├── pre-commit                 # Hook: lint-staged sebelum commit
│   └── commit-msg                 # Hook: validasi format commit message
├── public/
│   ├── robots.txt                 # SEO robots config
│   └── vite.svg                   # Favicon
├── src/
│   ├── assets/                    # Static assets (CSS, gambar, font)
│   │   └── main.css               # Global styles
│   ├── components/                # Vue components
│   │   ├── common/                # Komponen reusable (Button, Input, Modal, dll)
│   │   │   └── Button.vue
│   │   ├── features/              # Komponen spesifik fitur
│   │   └── layouts/               # Layout components
│   │       └── DefaultLayout.vue
│   ├── composables/               # Composition API hooks
│   │   └── useCounter.ts
│   ├── router/                    # Vue Router konfigurasi
│   │   └── index.ts
│   ├── services/                  # API services layer
│   │   ├── api/                   # API client & types
│   │   │   ├── client.ts          # Axios instance dengan interceptors
│   │   │   ├── types.ts           # API type definitions
│   │   │   ├── index.ts           # API service (CRUD methods)
│   │   │   └── endpoints/         # Endpoint-specific services
│   │   └── index.ts               # Service exports
│   ├── stores/                    # Pinia stores
│   │   ├── app.ts                 # Global app store
│   │   └── index.ts               # Store exports
│   ├── types/                     # TypeScript type definitions
│   │   ├── common.ts              # Shared types (ApiResponse, dll)
│   │   └── index.ts               # Type exports
│   ├── utils/                     # Utility/helper functions
│   │   ├── helpers.ts             # Helper functions (formatDate, debounce, dll)
│   │   └── index.ts               # Utility exports
│   ├── views/                     # Page/route components
│   │   ├── AboutView.vue
│   │   ├── HomeView.vue
│   │   └── NotFoundView.vue
│   ├── App.vue                    # Root component
│   ├── env.d.ts                   # Environment variable types
│   └── main.ts                    # App entry point
├── test/
│   ├── e2e/                       # Playwright E2E tests
│   │   └── example.spec.ts
│   └── unit/                      # Vitest unit tests
│       └── example.spec.ts
├── .env.example                   # Environment variable template
├── .prettierrc.json               # Prettier config
├── commitlint.config.cjs          # Commitlint config
├── docker-compose.yml             # Docker compose config
├── Dockerfile                     # Docker build config
├── eslint.config.mjs              # ESLint flat config
├── index.html                     # HTML entry point
├── nginx.conf                     # Nginx config (production)
├── package.json                   # Dependencies & scripts
├── playwright.config.ts           # Playwright config
├── tsconfig.json                  # TypeScript config (root)
├── tsconfig.app.json              # TypeScript config (app)
├── tsconfig.node.json             # TypeScript config (node)
├── vite.config.ts                 # Vite config
└── vitest.config.ts               # Vitest config
```

## NPM Scripts

### Development

| Command           | Deskripsi                                      |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Jalankan dev server di `http://localhost:3000` |
| `npm run build`   | Type-check + build untuk production            |
| `npm run preview` | Preview hasil build production                 |

### Code Quality

| Command                | Deskripsi                          |
| ---------------------- | ---------------------------------- |
| `npm run lint`         | Jalankan ESLint                    |
| `npm run lint:fix`     | Auto-fix ESLint errors             |
| `npm run format`       | Format semua file dengan Prettier  |
| `npm run format:check` | Cek formatting tanpa mengubah file |
| `npm run type-check`   | TypeScript type checking           |

### Testing

| Command                 | Deskripsi                                  |
| ----------------------- | ------------------------------------------ |
| `npm run test`          | Jalankan unit tests (watch mode)           |
| `npm run test:run`      | Jalankan unit tests (single run)           |
| `npm run test:ui`       | Jalankan unit tests dengan UI              |
| `npm run test:coverage` | Jalankan unit tests dengan coverage report |
| `npm run test:e2e`      | Jalankan E2E tests (Playwright)            |
| `npm run test:e2e:ui`   | Jalankan E2E tests dengan UI               |

## Panduan Penggunaan

### Menambahkan Route Baru

1. Buat file view di `src/views/`:

```vue
<!-- src/views/ContactView.vue -->
<script setup lang="ts">
// Component logic
</script>

<template>
  <div class="contact">
    <h1>Contact</h1>
  </div>
</template>
```

2. Daftarkan route di `src/router/index.ts`:

```typescript
{
  path: '/',
  component: DefaultLayout,
  children: [
    // ... existing routes
    {
      path: 'contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
    },
  ],
},
```

### Menambahkan Pinia Store

1. Buat file store di `src/stores/`:

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  function setUser(newUser: User): void {
    user.value = newUser
  }

  function clearUser(): void {
    user.value = null
  }

  return { user, isAuthenticated, setUser, clearUser }
})
```

2. Export dari `src/stores/index.ts`:

```typescript
export { useAppStore } from './app'
export { useUserStore } from './user'
```

### Menambahkan Composable

```typescript
// src/composables/useLocalStorage.ts
import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue) as Ref<T>

  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
  )

  return data
}
```

### Menambahkan Type Definition

```typescript
// src/types/user.ts
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export type UserRole = 'admin' | 'user' | 'guest'
```

### Environment Variables

Semua environment variable yang bisa diakses di client harus diawali dengan `VITE_`.

1. Tambahkan variable di `.env`:

```env
VITE_MY_VARIABLE=value
```

2. Tambahkan type di `src/env.d.ts`:

```typescript
interface ImportMetaEnv {
  readonly VITE_MY_VARIABLE: string
}
```

3. Akses di code:

```typescript
const myVar = import.meta.env.VITE_MY_VARIABLE
```

## API Requests

Template ini menyertakan **API service layer** yang siap pakai dengan Axios, dilengkapi:

- ✅ Axios instance dengan interceptors
- ✅ Auto auth token injection
- ✅ Global error handling (401 auto-redirect)
- ✅ TypeScript types untuk semua requests/responses
- ✅ Composable reaktif dengan loading states
- ✅ Progress tracking untuk upload/download

### Konfigurasi Environment

Tambahkan konfigurasi API di `.env`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=30000
```

### Cara Penggunaan

#### 1. Direct API Calls

Gunakan `api` service langsung di dalam fungsi atau methods:

```typescript
import { api } from '@/services/api'
import type { User } from '@/types/user'

// GET - ambil single resource
const user = await api.get<User>('/users/123')

// POST - create resource
const newUser = await api.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com',
})

// PUT - update full resource
const updated = await api.put<User>('/users/123', {
  name: 'Jane Doe',
  email: 'jane@example.com',
})

// PATCH - update partial
const patched = await api.patch<User>('/users/123', {
  name: 'Jane Doe',
})

// DELETE - hapus resource
await api.delete('/users/123')

// Dengan query parameters
const users = await api.get<User[]>('/users', {
  params: { page: 1, limit: 10, search: 'john' },
})

// Paginated response
const result = await api.getPaginated<User>('/users', {
  page: 1,
  limit: 10,
})
console.log(result.items) // array of users
console.log(result.meta) // pagination metadata
```

#### 2. Dengan Composables (Reaktif)

Gunakan composables untuk loading state dan error handling otomatis:

```vue
<script setup lang="ts">
import { useFetch, usePost, usePaginated } from '@/composables/useApi'
import { onMounted } from 'vue'

// GET dengan reaktif loading/error states
const { data, loading, error, execute } = useFetch<User>('/users/123')

// POST dengan payload
const createMutation = usePost<User>('/users', {
  onSuccess: (data) => {
    console.log('User created:', data)
  },
  onError: (error) => {
    console.error('Create failed:', error.message)
  },
})

// Paginated data dengan navigasi
const { items, loading, currentPage, totalPages, nextPage, prevPage, goToPage } =
  usePaginated<User>('/users', { limit: 20 })

onMounted(() => {
  execute() // fetch data on mount
})
</script>

<template>
  <!-- Loading state -->
  <div v-if="loading">Loading...</div>

  <!-- Error state -->
  <div v-else-if="error" class="error">
    {{ error.message }}
  </div>

  <!-- Success state -->
  <div v-else-if="data">
    {{ data.name }}
  </div>

  <!-- Pagination -->
  <div v-if="items.length > 0">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>
```

#### 3. Membuat Endpoint Service

Untuk API yang sering digunakan, buat service di `services/api/endpoints/`:

```typescript
// src/services/api/endpoints/users.ts
import { api } from '@/services/api'
import type { PaginatedResponse, QueryParams } from '@/services/api/types'

// Type definitions
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
}

export interface CreateUserDto {
  name: string
  email: string
  password: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
}

// Service functions
export const userService = {
  // Get all users (paginated)
  findAll: (params: QueryParams = {}) => api.getPaginated<User>('/users', params),

  // Get single user by ID
  findOne: (id: string) => api.get<User>(`/users/${id}`),

  // Create new user
  create: (data: CreateUserDto) => api.post<User>('/users', data),

  // Update user
  update: (id: string, data: UpdateUserDto) => api.patch<User>(`/users/${id}`, data),

  // Delete user
  remove: (id: string) => api.delete<void>(`/users/${id}`),

  // Custom endpoint
  changePassword: (id: string, newPassword: string) =>
    api.post<void>(`/users/${id}/change-password`, { password: newPassword }),
}
```

Gunakan di component:

```typescript
import { userService } from '@/services/api/endpoints/users'

// Get all users
const result = await userService.findAll({ page: 1, limit: 10 })

// Create user
const newUser = await userService.create({
  name: 'John',
  email: 'john@example.com',
  password: 'secret123',
})
```

#### 4. Authentication

Set auth token setelah login:

```typescript
import { api } from '@/services/api'

// Set token setelah login
api.setAuth('your-jwt-token-here')

// Clear token setelah logout
api.clearAuth()

// Request tanpa auth (skip auth token)
await api.get('/public-data', { skipAuth: true })
```

#### 5. File Upload

Upload dengan progress tracking:

```vue
<script setup lang="ts">
import { useUpload } from '@/composables/useApi'
import { ref } from 'vue'

const fileInput = ref<HTMLInputElement | null>(null)

const { upload, progress, uploading, error } = useUpload('/upload')

const handleFileSelect = async () => {
  const file = fileInput.value?.files?.[0]
  if (file) {
    await upload(file)
    if (!error.value) {
      alert('Upload complete!')
    }
  }
}
</script>

<template>
  <div>
    <input ref="fileInput" type="file" @change="handleFileSelect" />
    <div v-if="uploading">Uploading: {{ progress }}%</div>
    <div v-if="error" class="error">{{ error.message }}</div>
  </div>
</template>
```

#### 6. Error Handling

API error memiliki struktur:

```typescript
interface ApiError {
  message: string // Error message utama
  code?: string // Error code (NETWORK_ERROR, dll)
  status?: number // HTTP status code
  errors?: Record<string, string[]> // Validation errors
}
```

Handle error dengan try-catch atau composable:

```typescript
// Dengan try-catch
try {
  const user = await api.get<User>('/users/123')
} catch (err) {
  const error = err as ApiError
  if (error.status === 404) {
    console.log('User not found')
  } else if (error.code === 'NETWORK_ERROR') {
    console.log('No internet connection')
  } else {
    console.log(error.message)
  }
}

// Dengan composable
const { data, error } = await useFetch<User>('/users/123')
if (error.value) {
  // Handle error
}
```

### Struktur API Service

```
src/services/
├── api/
│   ├── client.ts           # Axios instance + interceptors
│   ├── types.ts            # Type definitions
│   ├── index.ts            # API service class
│   └── endpoints/
│       └── example.ts      # Contoh endpoint service
└── index.ts                # Barrel exports
```

### API Types Reference

```typescript
// Query parameters untuk filtering & pagination
interface QueryParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  [key: string]: unknown // custom params
}

// Paginated response
interface PaginatedResponse<T> {
  items: T[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
    perPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

// API Error
interface ApiError {
  message: string
  code?: string
  status?: number
  errors?: Record<string, string[]>
}
```

## Path Alias

Project ini menggunakan `@` sebagai alias untuk folder `src/`:

```typescript
// Gunakan alias
import { Button } from '@/components/common/Button.vue'
import { useCounter } from '@/composables/useCounter'
import type { User } from '@/types/user'

// Jangan gunakan relative path yang panjang
import { Button } from '../../../components/common/Button.vue' // Hindari!
```

## Docker

### Build dan jalankan dengan Docker:

```bash
# Build image
docker build -t vue-vite-template .

# Jalankan container
docker run -p 80:80 vue-vite-template
```

### Dengan Docker Compose:

```bash
docker compose up -d
```

## CI/CD

Project ini menyertakan GitHub Actions workflow (`.github/workflows/ci.yml`) yang otomatis dijalankan pada setiap push dan pull request ke branch `main` dan `develop`:

1. **Lint & Type Check** - ESLint, Prettier, dan TypeScript check
2. **Unit Tests** - Vitest
3. **E2E Tests** - Playwright (Chromium, Firefox, WebKit)
4. **Build** - Production build (setelah lint dan unit test lulus)

## Git Hooks (Husky)

Project ini menggunakan [Husky](https://typicode.github.io/husky/) untuk menjalankan Git hooks secara otomatis. Husky akan ter-setup otomatis saat `npm install` melalui script `prepare`.

### Pre-commit

Otomatis menjalankan `lint-staged` yang akan:

- ESLint + auto-fix untuk file `*.{js,ts,vue}`
- Prettier formatting untuk semua file yang di-stage

Jika ada error yang tidak bisa di-fix otomatis, commit akan ditolak.

### Commit Message

Menggunakan [Commitlint](https://commitlint.js.org/) untuk memvalidasi format [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <deskripsi>

[optional body]

[optional footer]
```

**Type yang diizinkan:**
| Type | Fungsi |
|------|--------|
| `feat` | Fitur baru |
| `fix` | Bug fix |
| `refactor` | Refactoring code |
| `docs` | Perubahan dokumentasi |
| `test` | Menambah/memperbaiki test |
| `chore` | Maintenance (update dependencies, dll) |
| `perf` | Peningkatan performa |
| `ci` | Perubahan CI/CD |
| `style` | Perubahan formatting (bukan CSS) |
| `revert` | Revert commit sebelumnya |
| `build` | Perubahan build system |

**Contoh:**

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login redirect issue"
git commit -m "refactor: simplify user store logic"
```

## Konsep Dasar Vue + Vite

Jika kamu baru mengenal Vue atau Vite, berikut istilah-istilah penting yang akan sering ditemui:

| Istilah              | Penjelasan                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Component**        | Blok bangunan utama Vue — setiap bagian UI (tombol, form, halaman) adalah komponen yang bisa dipakai ulang          |
| **`<script setup>`** | Sintaks ringkas untuk Composition API di dalam Single File Component (`.vue`) — lebih pendek dan performan          |
| **Composition API**  | Cara menulis logika komponen menggunakan fungsi (`ref`, `computed`, `watch`) — lebih fleksibel daripada Options API |
| **Composable**       | Fungsi reusable yang mengenkapsulasi logika reaktif (prefix `use`), misalnya `useCounter()`, `useAuth()`            |
| **`ref`**            | Membuat nilai reaktif primitif (`string`, `number`, `boolean`). Akses nilainya via `.value`                         |
| **`reactive`**       | Membuat objek reaktif secara mendalam. Cocok untuk state kompleks, tapi tidak bisa di-destructure langsung          |
| **`computed`**       | Nilai turunan yang di-cache — hanya dihitung ulang saat dependensinya berubah                                       |
| **Props**            | Data yang dikirim dari parent ke child component — bersifat read-only                                               |
| **Emits**            | Cara child component mengirim event/data ke parent component                                                        |
| **Store (Pinia)**    | Tempat menyimpan state yang perlu diakses dari banyak komponen — alternatif Vuex yang lebih modern                  |
| **Vue Router**       | Library routing resmi Vue — menangani navigasi antar halaman tanpa reload browser (SPA)                             |
| **SPA**              | Single Page Application — seluruh app dimuat sekali, navigasi dilakukan di client tanpa request halaman baru        |
| **HMR**              | Hot Module Replacement — perubahan kode langsung terlihat di browser tanpa refresh, disediakan oleh Vite            |
| **Vite**             | Build tool yang menggunakan ES modules di browser saat development (sangat cepat) dan Rollup untuk production       |
| **Barrel Export**    | File `index.ts` yang meng-re-export semua module dari satu folder, sehingga import lebih ringkas                    |

## Lisensi

MIT

## Referensi

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Guide](https://vite.dev/guide/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [VueUse](https://vueuse.org/)
- **[RULES.md](./RULES.md)** — Aturan development lengkap
- **[CLAUDE.md](./CLAUDE.md)** — Panduan untuk AI tools (Claude, Copilot, dll) — berisi konteks teknis project agar AI bisa membantu lebih akurat. Tidak perlu dibaca manual oleh developer
