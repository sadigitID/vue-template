# Vue + Vite Template

Template project Vue 3 + Vite siap pakai untuk development aplikasi web modern dengan konfigurasi lengkap untuk TypeScript, linting, formatting, testing, dan deployment.

## Tech Stack

| Teknologi                                             | Versi | Fungsi                                            |
| ----------------------------------------------------- | ----- | ------------------------------------------------- |
| [Vue 3](https://vuejs.org/)                           | 3.5+  | UI Framework (Composition API + `<script setup>`) |
| [Vite](https://vite.dev/)                             | 6     | Build tool & dev server                           |
| [TypeScript](https://www.typescriptlang.org/)         | 5.6   | Type safety (strict mode)                         |
| [Vue Router](https://router.vuejs.org/)               | 4     | Client-side routing                               |
| [Pinia](https://pinia.vuejs.org/)                     | 2.3   | State management                                  |
| [Vitest](https://vitest.dev/)                         | 2     | Unit testing                                      |
| [Playwright](https://playwright.dev/)                 | 1.49  | E2E testing                                       |
| [ESLint](https://eslint.org/)                         | 9     | Code linting                                      |
| [Prettier](https://prettier.io/)                      | 3     | Code formatting                                   |
| [Commitlint](https://commitlint.js.org/)              | 20    | Commit message linting                            |
| [Docker](https://www.docker.com/)                     | -     | Containerization                                  |
| [GitHub Actions](https://github.com/features/actions) | -     | CI/CD                                             |

## Quick Start

### Prasyarat

- [Node.js](https://nodejs.org/) >= 22
- [npm](https://www.npmjs.com/) >= 10

### Instalasi

```bash
# Clone repository
git clone <repository-url>
cd vue-vite-template

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Project

```
vue-vite-template/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI pipeline
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

## Git Hooks

### Pre-commit

Otomatis menjalankan `lint-staged` yang akan:

- ESLint + auto-fix untuk file `*.{js,ts,vue}`
- Prettier formatting untuk semua file yang di-stage

### Commit Message

Menggunakan [Conventional Commits](https://www.conventionalcommits.org/):

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
- **[RULES.md](./RULES.md)** - Aturan development lengkap
- **[CLAUDE.md](./CLAUDE.md)** - AI code review guidelines
