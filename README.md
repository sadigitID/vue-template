# Vue + Vite Template

A production-ready Vue 3 + Vite template with TypeScript, ESLint, Prettier, Vitest, Playwright, and more.

## Features

- **Vue 3.5+** with Composition API and `<script setup>`
- **Vite 6** for fast development and optimized builds
- **TypeScript** strict mode enabled
- **Vue Router 4** for routing
- **Pinia** for state management (optional)
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **ESLint 9** for code linting
- **Prettier 3** for code formatting
- **Husky** for Git hooks
- **Docker** for containerization
- **GitHub Actions** CI/CD workflows

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run linting
pnpm run lint
```

## Project Structure

```
src/
├── assets/         # Static assets (CSS, images)
├── components/     # Vue components
│   ├── common/     # Generic reusable components
│   └── features/   # Feature-specific components
├── composables/    # Composition API logic
├── router/         # Vue Router configuration
├── stores/         # Pinia stores (optional)
├── views/          # Route components (pages)
├── types/          # TypeScript types
└── utils/          # Utility functions

test/
├── unit/           # Vitest unit tests
└── e2e/            # Playwright E2E tests
```

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - AI code review guidelines
- **[RULES.md](./RULES.md)** - Team coding standards

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format with Prettier |
| `pnpm type-check` | TypeScript type check |
