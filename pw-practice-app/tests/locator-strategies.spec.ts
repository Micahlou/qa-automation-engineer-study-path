import { test, expect } from '@playwright/test'

/**
 * Locator Strategies Practice
 *
 * This spec demonstrates common Playwright locator strategies,
 * parent/child locator scoping, reusable locators, value extraction,
 * and assertion styles.
 */

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => {
  // By tag name
  await page.locator('input').first().click()

  // By ID
  page.locator('#inputEmail1')

  // By class value
  page.locator('.shape-rectangle')

  // By attribute
  page.locator('[placeholder="Email"]')

  // By full class value
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  // Combined CSS selector
  page.locator('input[placeholder="Email"][nbinput]')

  // By XPath. Works, but generally less readable and maintainable.
  page.locator('//*[@id="inputEmail1"]')

  // By partial text match
  page.locator(':text("Using")')

  // By exact text match
  page.locator(':text-is("Using the Grid")')
})

test('locating child elements', async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 2")').click()
})

test('locating by parent elements', async ({ page }) => {
  await page
    .locator('nb-card', { hasText: 'Using the Grid' })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page.locator('nb-card').filter({ hasText: 'Basic form' }).click()

  await page
    .locator('nb-card')
    .filter({ has: page.locator('.status-danger') })
    .getByRole('textbox', { name: 'Password' })
    .click()

  await page
    .locator('nb-card')
    .filter({ has: page.locator('nb-checkbox') })
    .filter({ hasText: 'Sign In' })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page
    .locator(':text-is("Using the Grid")')
    .locator('..')
    .getByRole('textbox', { name: 'Email' })
    .click()
})

test('Reusing the locators', async ({ page }) => {
  const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
  const emailField = basicForm.getByRole('textbox', { name: 'Email' })

  await emailField.fill('test@test.com')
  await basicForm.getByRole('textbox', { name: 'Password' }).fill('Welcome123')
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async ({ page }) => {
  const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })

  // Single text value
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  // All text values
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonsLabels).toContain('Option 1')

  // Input value
  const emailField = basicForm.getByRole('textbox', { name: 'Email' })

  await emailField.fill('test@test.com')

  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('test@test.com')

  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})

test('assertions', async ({ page }) => {
  const basicFormButton = page
    .locator('nb-card')
    .filter({ hasText: 'Basic form' })
    .locator('button')

  // General assertions
  const value = 5
  expect(value).toEqual(5)

  const text = await basicFormButton.textContent()
  expect(text).toEqual('Submit')

  // Locator assertion
  await expect(basicFormButton).toHaveText('Submit')

  // Soft assertion
  await expect.soft(basicFormButton).toHaveText('Submit')

  await basicFormButton.click()
})