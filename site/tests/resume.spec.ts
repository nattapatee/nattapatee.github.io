import { test, expect } from '@playwright/test'

test('hero renders name and typed role', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Nattapat Ekapobyothin')
  await expect(page.locator('.hero-role')).toContainText('Software Developer')
})

test('all six tiles render', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.bento .tile')).toHaveCount(6)
})

for (const width of [320, 768, 1440]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(overflow).toBe(false)
    await page.screenshot({ path: `test-results/screen-${width}.png`, fullPage: true })
  })
}

test('print media shows print resume, hides bento', async ({ page }) => {
  await page.emulateMedia({ media: 'print' })
  await page.goto('/')
  await expect(page.locator('.print-resume')).toBeVisible()
  await expect(page.locator('.bento')).toBeHidden()
})

test('reduced motion shows full role text immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.hero-role')).toHaveText('Software Developer', { timeout: 250 })
})

test('links are keyboard reachable', async ({ page }) => {
  await page.goto('/')
  const github = page.getByRole('link', { name: /github/i })
  await github.focus()
  await expect(github).toBeFocused()
})
