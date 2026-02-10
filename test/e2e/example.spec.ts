import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Vue Vite App/)
  })

  test('has heading', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('h1')).toContainText('Welcome to Vue + Vite Template')
  })

  test('counter increments on + button click', async ({ page }) => {
    await page.goto('/')

    const countText = page.locator('.count')
    await expect(countText).toContainText('Count: 0')

    await page.locator('button', { hasText: '+' }).click()
    await expect(countText).toContainText('Count: 1')
  })

  test('counter decrements on - button click', async ({ page }) => {
    await page.goto('/')

    await page.locator('button', { hasText: '+' }).click()
    await page.locator('button', { hasText: '-' }).click()

    await expect(page.locator('.count')).toContainText('Count: 0')
  })

  test('counter resets on Reset button click', async ({ page }) => {
    await page.goto('/')

    await page.locator('button', { hasText: '+' }).click()
    await page.locator('button', { hasText: '+' }).click()
    await page.locator('button', { hasText: 'Reset' }).click()

    await expect(page.locator('.count')).toContainText('Count: 0')
  })

  test('navigates to about page', async ({ page }) => {
    await page.goto('/')

    await page.click('a[href="/about"]')
    await expect(page.locator('h1')).toContainText('About')
  })
})

test.describe('404 Page', () => {
  test('shows 404 for unknown routes', async ({ page }) => {
    await page.goto('/unknown-page')

    await expect(page.locator('h1')).toContainText('404')
  })
})
