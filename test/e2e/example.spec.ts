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

  test('counter increments', async ({ page }) => {
    await page.goto('/')

    await page.click('button')
    await expect(page.locator('button')).toContainText('Count is 1')
  })
})
