import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
})

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
  })

  test('input fields', async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator('nb-card', { hasText: 'Using the Grid' })
      .getByRole('textbox', { name: 'email' })

    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 50 })

    const inputValue = await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual('test2@test.com')

    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
  })

  test('radio buttons', async ({ page }) => {
    const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' })

    await usingTheGridForm.getByLabel('Option 1').check({ force: true })
    await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })

    const radioStatus = await usingTheGridForm
      .getByRole('radio', { name: 'Option 1' })
      .isChecked()

    expect(radioStatus).toBeTruthy()
    await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked()
  })
})

test('lists and dropdowns', async ({ page }) => {
  const dropdownMenu = page.locator('ngx-header nb-select')
  const header = page.locator('nb-layout-header')

  await dropdownMenu.click()

  // Role-based list locators are useful when the app uses semantic HTML.
  page.getByRole('list')
  page.getByRole('listitem')

  const optionList = page.locator('nb-option-list nb-option')

  await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])

  await optionList.filter({ hasText: 'Cosmic' }).click()
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

  const colors = {
    Light: 'rgb(255, 255, 255)',
    Dark: 'rgb(34, 43, 69)',
    Cosmic: 'rgb(50, 50, 89)',
    Corporate: 'rgb(255, 255, 255)',
  }

  await dropdownMenu.click()

  for (const [color, expectedBackgroundColor] of Object.entries(colors)) {
    await optionList.filter({ hasText: color }).click()
    await expect(header).toHaveCSS('background-color', expectedBackgroundColor)

    if (color !== 'Corporate') {
      await dropdownMenu.click()
    }
  }
})

test('tooltips', async ({ page }) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Tooltip').click()

  const tooltipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' })

  await tooltipCard.getByRole('button', { name: 'Top' }).hover()

  page.getByRole('tooltip')

  const tooltip = await page.locator('nb-tooltip').textContent()

  expect(tooltip).toEqual('This is a tooltip')
})

test('dialog box', async ({ page }) => {
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  page.on('dialog', dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?')
    dialog.accept()
  })

  await page
    .getByRole('table')
    .locator('tr', { hasText: 'mdo@gmail.com' })
    .locator('.nb-trash')
    .click()

  await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test('web tables', async ({ page }) => {
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  // 1. Get a row by text inside the row.
  const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' })

  await targetRow.locator('.nb-edit').click()
  await page.locator('input-editor').getByPlaceholder('Age').clear()
  await page.locator('input-editor').getByPlaceholder('Age').fill('35')
  await page.locator('.nb-checkmark').click()

  // 2. Get a row based on a value in a specific column.
  await page.locator('.ng2-smart-pagination-nav').getByText('2').click()

  const targetRowById = page
    .getByRole('row', { name: '11' })
    .filter({ has: page.locator('td').nth(1).getByText('11') })

  await targetRowById.locator('.nb-edit').click()
  await page.locator('input-editor').getByPlaceholder('E-mail').clear()
  await page.locator('input-editor').getByPlaceholder('E-mail').fill('testing123@gmail.com')
  await page.locator('.nb-checkmark').click()

  await expect(targetRowById.locator('td').nth(5)).toHaveText('testing123@gmail.com')

  // 3. Test table filtering.
  const ages = ['20', '30', '40', '200']

  for (const age of ages) {
    await page.locator('input-filter').getByPlaceholder('Age').clear()
    await page.locator('input-filter').getByPlaceholder('Age').fill(age)

    await page.waitForTimeout(500)

    const ageRows = page.locator('tbody tr')

    for (const row of await ageRows.all()) {
      const cellValue = await row.locator('td').last().textContent()

      if (age === '200') {
        expect(await page.getByRole('table').textContent()).toContain('No data found')
      } else {
        expect(cellValue).toEqual(age)
      }
    }
  }
})

test('datepicker', async ({ page }) => {
  await page.getByText('Forms').click()
  await page.getByText('Datepicker').click()

  const calendarInputField = page.getByPlaceholder('Form Picker')

  await calendarInputField.click()

  const date = new Date()
  date.setDate(date.getDate() + 3)

  const expectedDate = date.getDate().toString()
  const expectedMonthShort = date.toLocaleString('en-US', { month: 'short' })
  const expectedMonthLong = date.toLocaleString('en-US', { month: 'long' })
  const expectedYear = date.getFullYear()
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
  const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()

  while (!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
    await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
    calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  }

  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true })
    .click()

  await expect(calendarInputField).toHaveValue(dateToAssert)
})

test('sliders', async ({ page }) => {
  // Alternative approach: directly update SVG attributes.
  // This can work, but it bypasses the actual user interaction path.
  //
  // const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
  // await tempGauge.evaluate(node => {
  //   node.setAttribute('cx', '232.630')
  //   node.setAttribute('cy', '232.630')
  // })
  // await tempGauge.click()

  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')

  await tempBox.scrollIntoViewIfNeeded()

  const box = await tempBox.boundingBox()

  if (!box) {
    throw new Error('Unable to get bounding box for temperature slider')
  }

  const x = box.x + box.width / 2
  const y = box.y + box.height / 2

  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x + 100, y)
  await page.mouse.move(x + 100, y + 100)
  await page.mouse.up()

  await expect(tempBox).toContainText('30')
})

test('drag and drop with iframe', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')

  await frame.locator('li', { hasText: 'High Tatras 2' }).dragTo(frame.locator('#trash'))

  // More precise manual drag-and-drop control.
  await frame.locator('li', { hasText: 'High Tatras 4' }).hover()
  await page.mouse.down()
  await frame.locator('#trash').hover()
  await page.mouse.up()

  await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
})