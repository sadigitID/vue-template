# Vue + Vite Template - Team Coding Standards

This document defines the coding standards and best practices for our Vue 3 + Vite projects. All team members must follow these guidelines.

## Table of Contents

- [General Principles](#general-principles)
- [Code Style](#code-style)
- [Vue 3 Standards](#vue-3-standards)
- [TypeScript Standards](#typescript-standards)
- [Testing Standards](#testing-standards)
- [Git Workflow](#git-workflow)
- [References](#references)

---

## General Principles

### Core Values

1. **Readability First** - Code is read more than written
2. **Explicit over Implicit** - Make intentions clear
3. **Small is Beautiful** - Keep components and functions focused
4. **Type Safety** - Leverage TypeScript's strict mode
5. **Immutability** - Avoid mutation, prefer functional patterns

### Before Committing

Always run:
```bash
pnpm run lint        # Check for linting errors
pnpm run format      # Format code with Prettier
pnpm run type-check  # Verify TypeScript types
pnpm run test        # Run all tests
```

---

## Code Style

### File Naming

```
Components:   PascalCase  (UserProfile.vue)
Composables:  camelCase   (useUserData.ts)
Utils:        camelCase   (formatDate.ts)
Types:        camelCase   (userTypes.ts)
Constants:    SCREAMING_SNAKE_CASE  (API_BASE_URL.ts)
```

### Imports Order

```typescript
// 1. External libraries
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// 2. Internal modules (use @ alias)
import { Button } from '@/components/common'
import { useAuth } from '@/composables/useAuth'

// 3. Types
import type { User } from '@/types/user'

// 4. Static assets
import logoUrl from '@/assets/logo.svg'
```

### Naming Conventions

```typescript
// ✅ GOOD: Descriptive names
const getUserById = (id: string): Promise<User> => { }
const isLoading = ref(false)

// ❌ BAD: Abbreviations, unclear names
const getUsr = (i: string) => { }  // Wrong!
const ld = ref(false)  // Wrong!
```

---

## Vue 3 Standards

### Component Structure

```vue
<script setup lang="ts">
// 1. Imports
// 2. Props interface
// 3. Emits interface
// 4. Composables
// 5. Reactive state
// 6. Computed properties
// 7. Methods
// 8. Lifecycle hooks
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Styles */
</style>
```

### Props Definition

```typescript
// ✅ GOOD: Define props with interface
interface Props {
  title: string
  count?: number
  items: string[]
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  items: () => []
})

// ❌ BAD: Without interface
defineProps({
  title: String,
  count: Number  // Wrong!
})
```

### Emits Definition

```typescript
// ✅ GOOD: Typed emits
interface Emits {
  (e: 'update', value: number): void
  (e: 'delete', id: string): void
}

const emit = defineEmits<Emits>()

// Usage
emit('update', 123)
```

### Component Size Limits

- **Max file size**: 400 lines (split if larger)
- **Max function size**: 50 lines (extract if larger)
- **Max component props**: 10 props (use object if more)
- **Max nesting depth**: 4 levels (flatten if deeper)

### Single File Component Guidelines

```vue
<!-- ✅ GOOD: Clear sections -->
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  firstName: string
  lastName: string
}
const props = defineProps<Props>()

const fullName = computed(() =>
  `${props.firstName} ${props.lastName}`
)
</script>

<template>
  <span class="user-name">{{ fullName }}</span>
</template>

<style scoped>
.user-name {
  font-weight: 600;
}
</style>
```

---

## TypeScript Standards

### Strict Mode Rules

We use TypeScript strict mode. No exceptions.

```typescript
// ✅ GOOD: Explicit types
function calculateTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0)
}

// ❌ BAD: Any type
function calculateTotal(prices: any): any {  // Wrong!
  return prices.reduce((sum: any, price: any) => sum + price, 0)
}
```

### Type Definitions

```typescript
// ✅ GOOD: Define types in separate files
// src/types/user.ts

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export type UserRole = 'admin' | 'user' | 'guest'

export interface CreateUserDto {
  name: string
  email: string
  password: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
}

// Import in components
import type { User, UserRole } from '@/types/user'
```

### Error Handling

```typescript
// ✅ GOOD: Comprehensive error handling
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: unknown = await response.json()

    // Validate response
    if (!isValidUser(data)) {
      throw new Error('Invalid user data received')
    }

    return data
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Unable to fetch user. Please try again.')
  }
}

function isValidUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data
  )
}
```

---

## Testing Standards

### Test File Structure

```typescript
// ✅ GOOD: Clear test structure
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter', () => {
  describe('initial state', () => {
    it('displays initial count', () => {
      const wrapper = mount(Counter, {
        props: { initialCount: 0 }
      })

      expect(wrapper.find('.count').text()).toBe('0')
    })
  })

  describe('user interactions', () => {
    it('increments count when button clicked', async () => {
      const wrapper = mount(Counter)
      await wrapper.find('button').trigger('click')

      expect(wrapper.find('.count').text()).toBe('1')
    })
  })

  describe('props', () => {
    it('accepts initial count prop', () => {
      const wrapper = mount(Counter, {
        props: { initialCount: 5 }
      })

      expect(wrapper.find('.count').text()).toBe('5')
    })
  })

  describe('emits', () => {
    it('emits update event', async () => {
      const wrapper = mount(Counter)
      await wrapper.find('button').trigger('click')

      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')?.[0]).toEqual([1])
    })
  })
})
```

### Test Coverage Requirements

- **Overall coverage**: 80% minimum
- **Critical paths**: 100% required
- **Utilities**: 90% minimum
- **Components**: 75% minimum

### E2E Testing

```typescript
// ✅ GOOD: Test critical user flows
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('user can log in', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[name="email"]', 'user@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText('Welcome')
  })

  test('shows error with invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[name="email"]', 'invalid@example.com')
    await page.fill('input[name="password"]', 'wrong')
    await page.click('button[type="submit"]')

    await expect(page.locator('.error')).toContainText('Invalid credentials')
  })
})
```

---

## Git Workflow

### Branch Naming

```
feature/  New features
  feature/user-authentication
  feature/payment-integration

fix/      Bug fixes
  fix/login-error
  fix/navigation-bug

refactor/ Code refactoring
  refactor/user-service
  refactor-component-structure

hotfix/   Urgent production fixes
  hotfix/security-patch
  hotfix/critical-bug
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]

[optional footer]
```

**Types**: feat, fix, refactor, docs, test, chore, perf, ci

```
feat: add user authentication flow

- Implement login/logout
- Add protected routes
- Create auth composable

Closes #123
```

### Pull Request Guidelines

1. **Title**: Use conventional commit format
2. **Description**: Explain what and why
3. **Linked Issues**: Reference related tickets
4. **Checks**: All CI checks must pass
5. **Review**: Minimum 1 approval required

---

## Code Quality Tools

### ESLint

We use ESLint with strict rules. Never disable rules without team discussion.

```javascript
// ❌ BAD: Disabling eslint
// eslint-disable-next-line
const x = any  // Wrong!
```

### Prettier

Prettier formats code automatically. Don't fight the formatter.

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### Husky Pre-Commit Hooks

Pre-commit hooks automatically:
1. Run linting
2. Format code with Prettier
3. Run tests

Commit will be blocked if hooks fail.

---

## Performance Guidelines

### Computed Properties

```typescript
// ✅ GOOD: Use computed for derived state
const fullName = computed(() => `${user.value.firstName} ${user.value.lastName}`)

// ❌ BAD: Using method (re-runs every render)
const fullName = () => `${user.value.firstName} ${user.value.lastName}`
```

### Lazy Loading

```typescript
// ✅ GOOD: Lazy load routes
const routes = [
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue')
  }
]
```

### v-if vs v-show

```vue
<!-- ✅ GOOD: Use v-if for rarely toggled content -->
<HeavyComponent v-if="showDetails" />

<!-- ✅ GOOD: Use v-show for frequently toggled content -->
<div v-show="isVisible">Content</div>
```

---

## Security Best Practices

### Input Validation

```typescript
// ✅ GOOD: Validate user input
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

const validated = schema.parse(input)
```

### XSS Prevention

```vue
<!-- ❌ BAD: Unescaped HTML (XSS risk) -->
<div v-html="userContent" />

<!-- ✅ GOOD: Use text interpolation -->
<div>{{ userContent }}</div>

<!-- ✅ GOOD: Sanitize if HTML is necessary -->
<div v-html="DOMPurify.sanitize(userContent)" />
```

### Environment Variables

```typescript
// ✅ GOOD: Use environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!apiBaseUrl) {
  throw new Error('VITE_API_BASE_URL is not configured')
}
```

---

## Quick Reference

### Essential Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Fix ESLint errors
pnpm run format       # Format with Prettier
pnpm run type-check   # TypeScript type check

# Testing
pnpm run test         # Run unit tests
pnpm run test:e2e     # Run E2E tests

# Git
pnpm run prepare      # Setup Husky hooks
```

### File Structure Quick Reference

```
src/
├── assets/         # Static assets (CSS, images)
├── components/     # Vue components
│   ├── common/     # Generic reusable (Button, Input)
│   └── features/   # Feature-specific components
├── composables/    # Composition API logic
├── router/         # Vue Router configuration
├── stores/         # Pinia stores (optional)
├── views/          # Route components (pages)
├── types/          # TypeScript types
└── utils/          # Utility functions
```

---

## References & External Resources

Official Documentation:
- [Vue 3 Guide](https://vuejs.org/guide/introduction.html) - Core Vue concepts
- [Vite Guide](https://vite.dev/guide/) - Build tool documentation
- [Vue Router](https://router.vuejs.org/) - Routing documentation
- [Pinia](https://pinia.vuejs.org/) - State management
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript fundamentals
- [Vitest](https://vitest.dev/) - Unit testing framework
- [Playwright](https://playwright.dev/) - E2E testing framework
- [VueUse](https://vueuse.org/) - Vue composition utilities

For detailed AI-specific guidelines, see [CLAUDE.md](./CLAUDE.md).
