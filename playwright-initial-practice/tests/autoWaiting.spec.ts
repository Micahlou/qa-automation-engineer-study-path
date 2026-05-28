import { test, expect } from '@playwright/test'

/**
 * Auto-Waiting Practice
 *
 * This spec demonstrates how Playwright handles asynchronous UI updates,
 * especially when an element appears after an AJAX request.
 *
 * Key concepts covered:
 * - Playwright auto-waiting
 * - Locator assertions
 * - Alternative wait strategies
 * - Timeout behavior
 */

test.beforeEach(async ({ page }) => {
  await page.goto('http://uitestingplayground.com/ajax')
  await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async ({ page }) => {
  const successMessage = page.locator('.bg-success')

  await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {
    timeout: 20000,
  })
})

test('alternative waits', async ({ page }) => {
  const successMessage = page.locator('.bg-success')

  // Alternative wait examples:
  // await page.waitForSelector('.bg-success')
  // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

  // Waiting for networkidle is generally not recommended as a default strategy,
  // but it is included here as part of the original waiting-strategy lesson.
  await page.waitForLoadState('networkidle')

  const text = await successMessage.allTextContents()

  expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async ({ page }) => {
  const successMessage = page.locator('.bg-success')

  await successMessage.click()
})