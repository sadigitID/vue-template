# Vue + Vite Template - AI Code Review Guidelines

This document provides AI-specific guidelines for reviewing and contributing to this Vue 3 + Vite project.

## Project Overview

- **Framework**: Vue 3.5+ with Composition API
- **Build Tool**: Vite 6
- **Language**: TypeScript (strict mode)
- **State Management**: Pinia (optional, minimal setup)
- **Routing**: Vue Router 4
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Code Quality**: ESLint 9 + Prettier 3 + Husky

## Code Review Priorities

When reviewing code, prioritize these aspects in order:

1. **Type Safety** - TypeScript strict mode compliance
2. **Immutability** - No mutation, prefer spread operators
3. **Component Design** - Small, focused, reusable
4. **Performance** - Proper reactivity, lazy loading
5. **Testing** - Adequate coverage (80%+ target)

## Vue 3 Best Practices

### Component Structure

```vue
<!-- ✅ GOOD: Clear sections, logical order -->
<script setup lang="ts">
// 1. Imports
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 2. Props interface
interface Props {
  title: string
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// 3. Emits interface
interface Emits {
  (e: 'update', value: number): void
}
const emit = defineEmits<Emits>()

// 4. Composables
const router = useRouter()

// 5. Reactive state
const state = ref('')

// 6. Computed properties
const doubled = computed(() => props.count * 2)

// 7. Methods
const handleClick = (): void => {
  emit('update', props.count + 1)
}

// 8. Lifecycle hooks
onMounted(() => {
  console.log('mounted')
})
</script>

<template>
  <div class="component">
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="handleClick">Increment</button>
  </div>
</template>

<style scoped>
.component {
  /* Component styles */
}
</style>
```

### Reactivity Best Practices

```typescript
// ✅ GOOD: Use ref for primitives, reactive for objects
const count = ref(0)
const user = reactive({ name: 'John', age: 30 })

// ✅ GOOD: ToRefs for destructuring reactive objects
const { name, age } = toRefs(user)

// ❌ BAD: Destructuring reactive loses reactivity
const { name, age } = user  // Wrong!

// ✅ GOOD: Computed for derived state
const fullName = computed(() => `${user.name} ${user.age}`)

// ❌ BAD: Don't mutate props directly
props.count++  // Wrong!

// ✅ GOOD: Emit events to parent
emit('update', props.count + 1)
```

### Composables Pattern

```typescript
// ✅ GOOD: Reusable composition function
// src/composables/useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = (): void => {
    count.value++
  }

  const decrement = (): void => {
    count.value--
  }

  const doubled = computed(() => count.value * 2)

  return {
    count,
    doubled,
    increment,
    decrement
  }
}
```

## TypeScript Guidelines

### Strict Mode Compliance

```typescript
// ✅ GOOD: Explicit types for all declarations
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

// ❌ BAD: Any types
const data: any = await fetchUser('123')  // Wrong!

// ✅ GOOD: Type assertions with proper checks
const user = data as User
if ('id' in user && 'name' in user) {
  // Safe to use
}

// ✅ GOOD: Generic types with constraints
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

const response = await fetch<ApiResponse<User>>('/api/users/123')
```

### Type Guards

```typescript
// ✅ GOOD: Type guards for runtime checks
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value
  )
}

if (isUser(data)) {
  // TypeScript knows this is User
  console.log(data.name)
}
```

## Immutability Rules

```typescript
// ❌ BAD: Direct mutation
function updateUser(user: User, name: string): User {
  user.name = name  // Mutation!
  return user
}

// ✅ GOOD: Immutable update
function updateUser(user: User, name: string): User {
  return {
    ...user,
    name
  }
}

// ✅ GOOD: For arrays
const addItem = <T>(items: T[], item: T): T[] => [...items, item]
const removeItem = <T>(items: T[], index: number): T[] => [
  ...items.slice(0, index),
  ...items.slice(index + 1)
]

// ✅ GOOD: For nested objects
import { produce } from 'immer'

const updateNested = (state: State, path: string, value: unknown) =>
  produce(state, draft => {
    draft.nested[path] = value
  })
```

## Component Design Patterns

### Smart vs Dumb Components

```vue
<!-- ✅ Dumb/Presentational Component: No logic, just display -->
<script setup lang="ts">
interface Props {
  label: string
  value: string
  disabled?: boolean
}
defineProps<Props>()
</script>

<template>
  <button :disabled="disabled">{{ label }}</button>
</template>
```

```vue
<!-- ✅ Smart/Container Component: Contains logic -->
<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'

const isLoading = ref(false)
const handleClick = async (): Promise<void> => {
  isLoading.value = true
  // API call logic
  isLoading.value = false
}
</script>

<template>
  <BaseButton label="Submit" :disabled="isLoading" @click="handleClick" />
</template>
```

### Props vs Emits Decision Tree

```
Is the data coming from parent?
├─ Yes → Use Props
└─ No → Is the data changing local state?
    ├─ Yes → Use local ref/reactive
    └─ No → Use Emits to notify parent
```

## Performance Best Practices

### Computed vs Methods

```typescript
// ✅ GOOD: Use computed for caching
const expensiveValue = computed(() => {
  return heavyCalculation(baseValue.value)
})

// ❌ BAD: Methods re-run on every render
const expensiveValue = () => heavyCalculation(baseValue.value)  // Wrong!
```

### v-memo for Expensive Components

```vue
<template>
  <!-- Only re-render when item.id changes -->
  <div v-for="item in items" :key="item.id" v-memo="[item.id]">
    <ExpensiveComponent :item="item" />
  </div>
</template>
```

### Lazy Loading Routes

```typescript
// ✅ GOOD: Lazy load route components
const routes = [
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue')  // Code split
  }
]
```

### Lazy Loading Components

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// ✅ GOOD: Async component with loading state
const HeavyComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  delay: 200,
  timeout: 3000
})
</script>
```

## Testing Guidelines

### Component Testing (Vitest)

```typescript
// ✅ GOOD: Test component behavior
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter', () => {
  it('increments count when button is clicked', async () => {
    const wrapper = mount(Counter)
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(wrapper.find('p').text()).toContain('Count: 1')
  })

  it('emits update event with correct value', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('update')?.[0]).toEqual([1])
  })
})
```

### Composables Testing

```typescript
// ✅ GOOD: Test composable logic
import { describe, it, expect } from 'vitest'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('increments count', () => {
    const { count, increment } = useCounter()

    increment()

    expect(count.value).toBe(1)
  })
})
```

## Router Best Practices

```typescript
// ✅ GOOD: Typed route params
interface RouteParams {
  id: string
}

const route = useRoute()
const router = useRouter()

const userId = computed(() => (route.params as RouteParams).id)

// ✅ GOOD: Navigation with type safety
const navigateToUser = (id: string): void => {
  router.push({ name: 'user', params: { id } })
}
```

## Pinia Store Guidelines

```typescript
// ✅ GOOD: Typed store with composition API
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref<User[]>([])
  const loading = ref(false)

  // Getters
  const activeUsers = computed(() =>
    users.value.filter(user => user.isActive)
  )

  // Actions
  const fetchUsers = async (): Promise<void> => {
    loading.value = true
    users.value = await api.getUsers()
    loading.value = false
  }

  return {
    users,
    loading,
    activeUsers,
    fetchUsers
  }
})
```

## Common Anti-Patterns to Avoid

```vue
<!-- ❌ BAD: Direct DOM manipulation -->
<script setup lang="ts">
onMounted(() => {
  document.querySelector('.my-element')?.classList.add('active')  // Wrong!
})
</script>

<!-- ✅ GOOD: Use reactive state -->
<script setup lang="ts">
const isActive = ref(false)
</script>

<template>
  <div :class="{ active: isActive }" />
</template>
```

```typescript
// ❌ BAD: Watch with deep: true for large objects
watch(largeObject, () => {
  // This is expensive!
}, { deep: true })  // Wrong!

// ✅ GOOD: Watch specific properties
watch(() => largeObject.property, () => {
  // Only re-run when this property changes
})
```

## Security Considerations

```vue
<!-- ❌ BAD: Unescaped HTML (XSS risk) -->
<div v-html="userInput" />  <!-- Wrong! -->

<!-- ✅ GOOD: Use text interpolation -->
<div>{{ userInput }}</div>

<!-- ✅ GOOD: Use DOMPurify if needed -->
<div v-html="DOMPurify.sanitize(userInput)" />
```

```typescript
// ❌ BAD: Unvalidated user input
const search = (query: string): void => {
  fetch(`/api/search?q=${query}`)  // Wrong! No URL encoding
}

// ✅ GOOD: Validate and encode
const search = (query: string): void => {
  if (!query || query.length > 100) return
  fetch(`/api/search?q=${encodeURIComponent(query)}`)
}
```

## Code Review Checklist

Before approving code, verify:

- [ ] TypeScript strict mode - no `any` types
- [ ] No mutation - use spread operators or immer
- [ ] Components use `<script setup>` with `lang="ts"`
- [ ] Props have proper interfaces
- [ ] Emits have proper typed interfaces
- [ ] Composables are reusable and tested
- [ ] No direct DOM manipulation
- [ ] Proper error handling with try/catch
- [ ] No `console.log` statements
- [ ] Tests added/updated (80%+ coverage)
- [ ] No hardcoded values or secrets
- [ ] ESLint passes without warnings
- [ ] Prettier formatting applied

## Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Guide](https://vite.dev/guide/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [VueUse Composables](https://vueuse.org/)
