# Aturan Development - Vue + Vite Template

Dokumen ini mendefinisikan aturan dan standar development untuk project Vue 3 + Vite. Semua anggota tim wajib mengikuti panduan ini.

> **Glosarium Singkat**
>
> - **Composition API:** Cara menulis logika komponen menggunakan fungsi (`ref`, `computed`, `watch`) — lebih fleksibel dan reusable dibanding Options API.
> - **`<script setup>`:** Sintaks ringkas untuk Composition API di dalam file `.vue`. Semua variable dan fungsi yang dideklarasikan langsung tersedia di template tanpa perlu `return`.
> - **Composable:** Fungsi reusable yang mengenkapsulasi logika reaktif (selalu diawali prefix `use`), misalnya `useCounter()`, `useAuth()`.
> - **Pinia:** State management resmi Vue 3 — pengganti Vuex yang lebih sederhana dan mendukung Composition API.
> - **Reactivity (`ref` vs `reactive`):** `ref()` untuk nilai primitif (akses via `.value`), `reactive()` untuk objek (akses langsung). Keduanya membuat data "reaktif" — UI otomatis update saat data berubah.
> - **`computed`:** Nilai turunan yang di-cache — hanya dihitung ulang saat dependensinya berubah, berbeda dengan method biasa yang dipanggil setiap render.
> - **Barrel Export:** File `index.ts` yang meng-re-export semua module dari satu folder, sehingga import lebih ringkas (misalnya `import { useAppStore } from '@/stores'` alih-alih `from '@/stores/app'`).
> - **SPA (Single Page Application):** Seluruh app dimuat sekali, navigasi dilakukan di client tanpa request halaman baru — berbeda dengan website tradisional yang memuat ulang seluruh halaman.
> - **HMR (Hot Module Replacement):** Fitur Vite yang menampilkan perubahan kode langsung di browser tanpa refresh.
> - **Scoped Styles:** Atribut `<style scoped>` yang membatasi CSS hanya berlaku untuk komponen tersebut, mencegah konflik styling antar komponen.

## Daftar Isi

- [Prinsip Umum](#prinsip-umum)
- [Aturan Penamaan File](#aturan-penamaan-file)
- [Aturan Struktur Folder](#aturan-struktur-folder)
- [Aturan Vue Component](#aturan-vue-component)
- [Aturan TypeScript](#aturan-typescript)
- [Aturan Styling](#aturan-styling)
- [Aturan State Management (Pinia)](#aturan-state-management-pinia)
- [Aturan Routing](#aturan-routing)
- [Aturan Testing](#aturan-testing)
- [Aturan Git Workflow](#aturan-git-workflow)
- [Aturan Code Style](#aturan-code-style)
- [Aturan Keamanan](#aturan-keamanan)
- [Aturan Performa](#aturan-performa)
- [Checklist Sebelum Commit](#checklist-sebelum-commit)

---

## Prinsip Umum

Prinsip-prinsip berikut menjadi dasar semua keputusan teknis di project ini. Jika ragu antara dua pendekatan, pilih yang paling sesuai dengan prinsip ini.

1. **Readability First** - Code dibaca lebih sering daripada ditulis
2. **Explicit over Implicit** - Buat niat sejelas mungkin
3. **Small is Beautiful** - Jaga komponen dan fungsi tetap fokus
4. **Type Safety** - Manfaatkan TypeScript strict mode sepenuhnya
5. **Immutability** - Hindari mutasi, gunakan spread operator atau `structuredClone`
6. **DRY (Don't Repeat Yourself)** - Hindari duplikasi, ekstrak ke composable atau utility
7. **KISS (Keep It Simple, Stupid)** - Jangan over-engineer

---

## Aturan Penamaan File

Penamaan yang konsisten memudahkan developer lain memahami isi file hanya dari namanya. Bagian ini mendefinisikan konvensi penamaan untuk setiap jenis file dalam project.

### Konvensi Penamaan

| Jenis File            | Format                         | Contoh                                         |
| --------------------- | ------------------------------ | ---------------------------------------------- |
| **Vue Components**    | `PascalCase.vue`               | `UserProfile.vue`, `DataTable.vue`             |
| **Views (Pages)**     | `PascalCase` + suffix `View`   | `HomeView.vue`, `UserDetailView.vue`           |
| **Layouts**           | `PascalCase` + suffix `Layout` | `DefaultLayout.vue`, `AuthLayout.vue`          |
| **Composables**       | `camelCase` + prefix `use`     | `useCounter.ts`, `useAuth.ts`                  |
| **Pinia Stores**      | `camelCase` (nama domain)      | `app.ts`, `user.ts`, `cart.ts`                 |
| **Utility Functions** | `camelCase`                    | `helpers.ts`, `formatDate.ts`, `validators.ts` |
| **Type Definitions**  | `camelCase`                    | `common.ts`, `user.ts`, `api.ts`               |
| **Constants**         | `camelCase`                    | `config.ts`, `endpoints.ts`                    |
| **Test Files**        | `[nama].spec.ts`               | `useCounter.spec.ts`, `home.spec.ts`           |

### Aturan Nama Variable & Function

```typescript
// --- Variables ---
// Boolean: gunakan prefix is, has, can, should
const isLoading = ref(false)
const hasPermission = computed(() => ...)
const canEdit = ref(true)

// Array: gunakan bentuk jamak (plural)
const users = ref<User[]>([])
const selectedItems = ref<string[]>([])

// Object/single entity: gunakan bentuk tunggal (singular)
const user = ref<User | null>(null)
const currentItem = ref<Item>()

// --- Functions ---
// Action: gunakan kata kerja di depan
const fetchUsers = async () => { ... }
const handleSubmit = () => { ... }
const formatDate = (date: Date) => { ... }
const validateEmail = (email: string) => { ... }

// Event handler: gunakan prefix handle atau on
const handleClick = () => { ... }
const onInputChange = () => { ... }

// Getter/computed: gunakan kata sifat/noun yang deskriptif
const fullName = computed(() => ...)
const totalPrice = computed(() => ...)
const filteredUsers = computed(() => ...)
```

### Nama yang DILARANG

```typescript
// DILARANG: Singkatan tidak jelas
const usr = ref(null) // Gunakan: user
const btn = ref(null) // Gunakan: button
const msg = ref('') // Gunakan: message
const val = ref(0) // Gunakan: value
const idx = ref(0) // Gunakan: index
const e = (event) => {} // Gunakan: event, error (sesuai konteks)

// DILARANG: Nama generik tanpa konteks
const data = ref({}) // Gunakan: userData, responseData
const list = ref([]) // Gunakan: userList, productList
const temp = ref(null) // Jangan gunakan variable temporary

// DILARANG: any type
const data: any = {} // Selalu gunakan type yang spesifik
```

---

## Aturan Struktur Folder

Struktur folder yang terorganisir membuat kode mudah ditemukan dan dipahami, terutama saat project berkembang. Setiap jenis file memiliki tempat yang sudah ditentukan.

### Folder `src/`

```
src/
├── assets/              # Static assets
│   ├── main.css         # Global CSS
│   ├── images/          # Gambar (opsional)
│   └── fonts/           # Custom fonts (opsional)
│
├── components/          # Vue components
│   ├── common/          # Komponen reusable yang generic
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   ├── Modal.vue
│   │   └── ...
│   ├── features/        # Komponen spesifik fitur
│   │   ├── auth/        # Komponen terkait autentikasi
│   │   │   ├── LoginForm.vue
│   │   │   └── RegisterForm.vue
│   │   └── dashboard/   # Komponen terkait dashboard
│   │       ├── StatCard.vue
│   │       └── Chart.vue
│   └── layouts/         # Layout components
│       ├── DefaultLayout.vue
│       └── AuthLayout.vue
│
├── composables/         # Composition API hooks (reusable logic)
│   ├── useCounter.ts
│   ├── useAuth.ts
│   └── useLocalStorage.ts
│
├── router/              # Vue Router
│   └── index.ts         # Route definitions
│
├── stores/              # Pinia stores
│   ├── app.ts           # App-level store
│   ├── user.ts          # User store
│   └── index.ts         # Re-exports
│
├── types/               # TypeScript definitions
│   ├── common.ts        # Shared types (ApiResponse, dll)
│   ├── user.ts          # Domain-specific types
│   └── index.ts         # Re-exports
│
├── utils/               # Utility functions (pure functions)
│   ├── helpers.ts       # General helper functions
│   ├── validators.ts    # Validation functions
│   └── index.ts         # Re-exports
│
├── views/               # Page components (1 per route)
│   ├── HomeView.vue
│   ├── AboutView.vue
│   └── NotFoundView.vue
│
├── App.vue              # Root component
├── env.d.ts             # Env variable types
└── main.ts              # Entry point
```

### Aturan Penempatan File

| Jenis                  | Folder                         | Aturan                                                               |
| ---------------------- | ------------------------------ | -------------------------------------------------------------------- |
| **Components**         | `components/common/`           | Hanya komponen yang bisa di-reuse di mana saja (tidak terikat fitur) |
| **Feature Components** | `components/features/<fitur>/` | Grup berdasarkan fitur/domain. Hanya dipakai di dalam fitur tersebut |
| **Layouts**            | `components/layouts/`          | Komponen layout yang membungkus halaman                              |
| **Views**              | `views/`                       | Satu file per route, suffix `View` wajib                             |
| **Composables**        | `composables/`                 | Harus diawali `use`, satu file per composable                        |
| **Stores**             | `stores/`                      | Satu file per domain/entity                                          |
| **Types**              | `types/`                       | Satu file per domain, plus `common.ts` untuk shared types            |
| **Utils**              | `utils/`                       | Pure functions saja, tidak boleh punya side effects                  |

### Barrel Exports (index.ts)

Setiap folder yang berisi module wajib punya `index.ts` sebagai barrel export. Barrel export menyederhanakan import — alih-alih mengingat nama file spesifik, cukup import dari folder.

```typescript
// src/stores/index.ts
export { useAppStore } from './app'
export { useUserStore } from './user'

// src/types/index.ts
export type * from './common'
export type * from './user'

// src/utils/index.ts
export { formatDate, formatCurrency } from './helpers'
export { validateEmail } from './validators'
```

Cara import:

```typescript
// Gunakan barrel export
import { useAppStore } from '@/stores'
import type { User } from '@/types'
import { formatDate } from '@/utils'

// Atau import langsung (juga boleh)
import { useAppStore } from '@/stores/app'
```

---

## Aturan Vue Component

Bagian ini mengatur bagaimana komponen Vue harus ditulis. Urutan yang konsisten membuat kode lebih mudah dibaca dan di-review, terutama saat project berkembang dengan banyak kontributor.

### Struktur Component (Urutan Wajib)

```vue
<script setup lang="ts">
// 1. Imports (external -> internal -> types -> assets)
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores'
import type { User } from '@/types'

// 2. Props definition
interface Props {
  title: string
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0,
})

// 3. Emits definition
interface Emits {
  (e: 'update', value: number): void
  (e: 'delete', id: string): void
}
const emit = defineEmits<Emits>()

// 4. Composables
const router = useRouter()
const appStore = useAppStore()

// 5. Reactive state (ref, reactive)
const isLoading = ref(false)

// 6. Computed properties
const doubled = computed(() => props.count * 2)

// 7. Methods / functions
const handleClick = (): void => {
  emit('update', props.count + 1)
}

// 8. Watchers
watch(
  () => props.count,
  (newVal) => {
    // ...
  }
)

// 9. Lifecycle hooks
onMounted(() => {
  // ...
})
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Styles - WAJIB scoped */
</style>
```

### Batasan Ukuran Component

| Metric                    | Maksimal  | Tindakan                           |
| ------------------------- | --------- | ---------------------------------- |
| Total baris file          | 400 baris | Pecah menjadi sub-components       |
| Baris per function        | 50 baris  | Ekstrak ke composable atau utility |
| Jumlah props              | 10 props  | Gunakan object props               |
| Nesting depth di template | 4 level   | Flatten atau extract component     |
| Jumlah watchers           | 3 watcher | Pertimbangkan computed/composable  |

### Props

Props adalah cara mengirim data dari parent ke child component. Selalu gunakan interface TypeScript untuk mendefinisikan tipe props.

```typescript
// WAJIB: Gunakan interface untuk props
interface Props {
  title: string
  items: string[]
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  items: () => [],
})

// DILARANG: Props tanpa interface
defineProps({
  title: String,
  count: Number,
})
```

### Emits

Emits adalah cara child component mengirim event ke parent. Selalu gunakan typed emits agar tipe parameter event diperiksa saat compile time.

```typescript
// WAJIB: Gunakan typed emits
interface Emits {
  (e: 'update', value: number): void
  (e: 'delete', id: string): void
}
const emit = defineEmits<Emits>()

// DILARANG: Untyped emits
const emit = defineEmits(['update', 'delete'])
```

### Component Communication

```
Data mengalir dari parent ke child? -> Props
Child memberi tahu parent?          -> Emits
State berbagi antar banyak komponen? -> Pinia Store
Logic reusable?                      -> Composable
```

---

## Aturan TypeScript

TypeScript strict mode memastikan tipe data diperiksa secara ketat saat development, sehingga bug bisa tertangkap lebih awal sebelum kode berjalan di production.

### Strict Mode

TypeScript strict mode aktif dan tidak boleh dinonaktifkan. Aturan:

- **Tidak boleh** menggunakan `any`. Gunakan `unknown` lalu type-guard
- **Wajib** explicit return type untuk function publik
- **Wajib** mendefinisikan type di file terpisah (`src/types/`)

### Type Definition

```typescript
// WAJIB: Interface untuk object shape
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
}

// WAJIB: Union type untuk enum-like values
export type UserRole = 'admin' | 'user' | 'guest'

// WAJIB: DTO types untuk API request/response
export interface CreateUserDto {
  name: string
  email: string
  password: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
}
```

### Import Types

```typescript
// WAJIB: Gunakan `import type` untuk type-only imports
import type { User, UserRole } from '@/types/user'

// DILARANG: Import type tanpa `type` keyword
import { User, UserRole } from '@/types/user'
```

### Error Handling

Penanganan error yang baik membuat aplikasi lebih robust dan membantu debugging. Selalu gunakan try-catch untuk operasi async dan type guard untuk validasi runtime.

```typescript
// WAJIB: Try-catch untuk async operations
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    // Handle error appropriately
    throw new Error('Unable to fetch user')
  }
}

// WAJIB: Type guard untuk runtime validation
function isUser(data: unknown): data is User {
  return typeof data === 'object' && data !== null && 'id' in data && 'name' in data
}
```

---

## Aturan Styling

Bagian ini mengatur bagaimana styling diterapkan di komponen. Konsistensi styling mencegah konflik CSS antar komponen dan membuat tampilan lebih mudah di-maintain.

### CSS Scoped

```vue
<!-- WAJIB: Selalu gunakan scoped styles -->
<style scoped>
.my-component {
  /* styles */
}
</style>

<!-- DILARANG: Global styles di component -->
<style>
.my-component {
  /* Ini akan affect semua element! */
}
</style>
```

### Class Naming

Gunakan kebab-case untuk CSS class names:

```vue
<template>
  <!-- BENAR -->
  <div class="user-profile">
    <h2 class="user-profile__title">{{ name }}</h2>
    <p class="user-profile__description">{{ bio }}</p>
  </div>

  <!-- SALAH -->
  <div class="userProfile">
    <h2 class="UserProfileTitle">{{ name }}</h2>
  </div>
</template>
```

### Global Styles

Global styles hanya boleh ditempatkan di `src/assets/main.css` dan hanya berisi:

- CSS reset/normalize
- CSS variables (`:root`)
- Typography dasar (body, headings)
- Base element styles (button, input, link)

---

## Aturan State Management (Pinia)

Pinia adalah state management resmi Vue 3. Tidak semua state perlu masuk store — gunakan Pinia hanya jika state benar-benar dibagi oleh banyak komponen yang tidak memiliki hubungan parent-child langsung.

### Kapan Menggunakan Pinia

| Situasi                                   | Solusi                 |
| ----------------------------------------- | ---------------------- |
| State lokal component                     | `ref()` / `reactive()` |
| State shared 2-3 component (parent-child) | Props + Emits          |
| State shared banyak component             | Pinia Store            |
| Logic reusable tanpa shared state         | Composable             |

### Struktur Store

```typescript
// WAJIB: Gunakan Composition API syntax
export const useUserStore = defineStore('user', () => {
  // --- State ---
  const users = ref<User[]>([])
  const isLoading = ref(false)

  // --- Getters (computed) ---
  const activeUsers = computed(() => users.value.filter((u) => u.isActive))

  // --- Actions (functions) ---
  async function fetchUsers(): Promise<void> {
    isLoading.value = true
    try {
      users.value = await api.getUsers()
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    users,
    isLoading,
    // Getters
    activeUsers,
    // Actions
    fetchUsers,
  }
})
```

### Aturan Store

1. **Satu store per domain** - `user.ts`, `cart.ts`, `product.ts`
2. **Gunakan Composition API** - Bukan Options API
3. **Return type explicit** - Selalu return semua state, getters, dan actions
4. **Prefix `use`** - `useUserStore`, `useCartStore`
5. **Store name unique** - Parameter pertama `defineStore` harus unique

---

## Aturan Routing

Vue Router menangani navigasi antar halaman di SPA. Dengan konfigurasi yang konsisten, navigasi menjadi lebih predictable dan mudah di-debug.

### Route Naming

```typescript
// WAJIB: Setiap route harus punya name
{
  path: '/users/:id',
  name: 'user-detail',        // kebab-case
  component: () => import('@/views/UserDetailView.vue'),
}

// WAJIB: Lazy load semua route (kecuali layout)
component: () => import('@/views/UserDetailView.vue')

// BOLEH: Eager load untuk layout
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
```

### Navigasi

```typescript
// WAJIB: Gunakan named routes
router.push({ name: 'user-detail', params: { id: '123' } })

// HINDARI: Path-based navigation
router.push('/users/123') // Hindari ini
```

### Catch-All 404

Route catch-all `/:pathMatch(.*)*` wajib ada sebagai route terakhir.

---

## Aturan Testing

Testing memastikan fitur bekerja sesuai harapan dan tidak rusak saat ada perubahan kode. Template ini menggunakan Vitest untuk unit test dan Playwright untuk end-to-end test.

### Struktur Test

```
test/
├── unit/                # Unit tests (Vitest)
│   ├── composables/     # Test composable
│   ├── stores/          # Test store
│   ├── utils/           # Test utility
│   └── components/      # Test component
└── e2e/                 # E2E tests (Playwright)
    └── flows/           # User flow tests
```

### Unit Test

```typescript
// WAJIB: Struktur describe-it yang jelas
describe('useCounter', () => {
  describe('initial state', () => {
    it('starts with default value 0', () => {
      const { count } = useCounter()
      expect(count.value).toBe(0)
    })

    it('accepts custom initial value', () => {
      const { count } = useCounter(10)
      expect(count.value).toBe(10)
    })
  })

  describe('actions', () => {
    it('increments count by 1', () => {
      const { count, increment } = useCounter()
      increment()
      expect(count.value).toBe(1)
    })
  })
})
```

### Coverage Target

| Jenis          | Minimum Coverage |
| -------------- | ---------------- |
| Overall        | 80%              |
| Utilities      | 90%              |
| Composables    | 85%              |
| Components     | 75%              |
| Critical paths | 100%             |

### Nama Test File

```
# Unit test
test/unit/<category>/<namaFile>.spec.ts

# E2E test
test/e2e/<namaFlow>.spec.ts
```

---

## Aturan Git Workflow

Konsistensi dalam penamaan branch dan format commit message membuat history Git lebih mudah dibaca dan memungkinkan otomasi seperti changelog generation.

### Branch Naming

```
<type>/<deskripsi-singkat>
```

| Prefix      | Fungsi                | Contoh                        |
| ----------- | --------------------- | ----------------------------- |
| `feature/`  | Fitur baru            | `feature/user-authentication` |
| `fix/`      | Bug fix               | `fix/login-redirect-error`    |
| `refactor/` | Refactoring           | `refactor/user-service`       |
| `hotfix/`   | Fix urgent production | `hotfix/security-patch`       |
| `chore/`    | Maintenance           | `chore/update-dependencies`   |
| `docs/`     | Dokumentasi           | `docs/api-documentation`      |

### Commit Message Format

Menggunakan [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <deskripsi singkat>

[optional body - penjelasan lebih detail]

[optional footer - referensi issue, breaking changes]
```

**Types:**

| Type       | Kapan Digunakan                        |
| ---------- | -------------------------------------- |
| `feat`     | Menambah fitur baru                    |
| `fix`      | Memperbaiki bug                        |
| `refactor` | Mengubah code tanpa mengubah behavior  |
| `docs`     | Perubahan dokumentasi saja             |
| `test`     | Menambah atau memperbaiki test         |
| `chore`    | Maintenance (update deps, konfigurasi) |
| `perf`     | Peningkatan performa                   |
| `ci`       | Perubahan CI/CD pipeline               |
| `style`    | Perubahan formatting, bukan logic      |
| `revert`   | Revert commit sebelumnya               |
| `build`    | Perubahan build system                 |

**Contoh:**

```bash
feat: add user registration form with email validation
fix: resolve infinite loop on dashboard data fetch
refactor: extract payment logic into composable
docs: update API endpoint documentation
test: add unit tests for useAuth composable
```

### Pull Request

1. **Title**: Gunakan format conventional commit
2. **Description**: Jelaskan apa yang diubah dan kenapa
3. **Linked Issues**: Referensikan ticket/issue terkait
4. **Semua CI checks harus lulus**
5. **Minimum 1 approval** sebelum merge

---

## Aturan Code Style

Bagian ini mengatur format kode agar konsisten di seluruh project. ESLint dan Prettier sudah dikonfigurasi untuk meng-enforce sebagian besar aturan ini secara otomatis.

### Import Order (Wajib)

```typescript
// 1. External libraries
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

// 2. Internal modules (gunakan @ alias)
import Button from '@/components/common/Button.vue'
import { useAuth } from '@/composables/useAuth'
import { useUserStore } from '@/stores'
import { formatDate } from '@/utils'

// 3. Types (import type)
import type { User } from '@/types'

// 4. Static assets
import logoUrl from '@/assets/images/logo.svg'
```

### Prettier Config

Konfigurasi Prettier yang digunakan (`.prettierrc.json`):

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

Artinya:

- Tidak pakai semicolon (`;`)
- Gunakan single quote (`'`)
- Indent 2 spasi
- Trailing comma di ES5 contexts
- Max 100 karakter per baris
- Selalu pakai parentheses di arrow function

### ESLint Rules

Rules penting yang aktif:

- `@typescript-eslint/no-explicit-any: error` - Tidak boleh pakai `any`
- `@typescript-eslint/no-unused-vars: error` - Tidak boleh ada variable unused (exception: prefix `_`)
- `vue/multi-word-component-names: off` - Nama component satu kata diperbolehkan

---

## Aturan Keamanan

Keamanan adalah aspek yang harus diperhatikan sejak awal development, bukan ditambahkan belakangan. Berikut aturan-aturan dasar untuk menjaga aplikasi tetap aman.

### Input Validation

```typescript
// WAJIB: Validasi input user sebelum digunakan
const sanitizeInput = (input: string): string => {
  return input.trim().slice(0, 500)
}
```

### XSS Prevention

```vue
<!-- DILARANG: v-html dengan user input -->
<div v-html="userContent" />

<!-- WAJIB: Gunakan text interpolation -->
<div>{{ userContent }}</div>
```

### Environment Variables

```typescript
// WAJIB: Validasi env variables saat startup
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
if (!apiBaseUrl) {
  throw new Error('VITE_API_BASE_URL is not configured')
}

// DILARANG: Hardcode secrets di code
const apiKey = 'sk-1234567890' // JANGAN!
```

### URL Encoding

```typescript
// WAJIB: Encode user input di URL
const searchUrl = `/api/search?q=${encodeURIComponent(query)}`

// DILARANG: String interpolation langsung
const searchUrl = `/api/search?q=${query}` // XSS risk!
```

---

## Aturan Performa

Performa yang baik dimulai dari kebiasaan coding yang tepat. Berikut aturan-aturan yang membantu menjaga aplikasi tetap cepat, terutama saat project berkembang.

### Computed vs Method

```typescript
// WAJIB: Gunakan computed untuk derived state (di-cache)
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

// HINDARI: Method yang dipanggil di template (re-run setiap render)
const getFullName = () => `${firstName.value} ${lastName.value}`
```

### Lazy Loading

```typescript
// WAJIB: Lazy load semua route components
component: () => import('@/views/HeavyView.vue')

// WAJIB: Lazy load komponen berat
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'))
```

### v-if vs v-show

```vue
<!-- Jarang toggle -> v-if (destroy/recreate DOM) -->
<HeavyModal v-if="isOpen" />

<!-- Sering toggle -> v-show (CSS display:none) -->
<Tooltip v-show="isHovered" />
```

### Watch

```typescript
// HINDARI: deep watch pada object besar
watch(largeObject, () => { ... }, { deep: true }) // Mahal!

// WAJIB: Watch property spesifik
watch(() => largeObject.value.specificProp, () => { ... })
```

---

## Checklist Sebelum Commit

Jalankan semua command berikut sebelum commit:

```bash
npm run lint          # Cek linting errors
npm run format        # Format code
npm run type-check    # Cek TypeScript types
npm run test:run      # Jalankan unit tests
```

### Review Checklist

- [ ] TypeScript strict mode - tidak ada `any`
- [ ] Tidak ada mutasi langsung - gunakan spread atau `structuredClone`
- [ ] Components menggunakan `<script setup lang="ts">`
- [ ] Props memiliki interface yang proper
- [ ] Emits memiliki typed interface
- [ ] Style menggunakan `scoped`
- [ ] File diberi nama sesuai konvensi
- [ ] File ditempatkan di folder yang benar
- [ ] Import menggunakan `@` alias
- [ ] Import types menggunakan `import type`
- [ ] Error handling dengan try/catch
- [ ] Tidak ada `console.log` (hapus sebelum commit)
- [ ] Test ditambahkan/diupdate
- [ ] ESLint lulus tanpa warning
- [ ] Prettier formatting sudah applied

---

## Referensi

- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [Vite Guide](https://vite.dev/guide/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [VueUse](https://vueuse.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

Untuk panduan AI code review, lihat [CLAUDE.md](./CLAUDE.md).
