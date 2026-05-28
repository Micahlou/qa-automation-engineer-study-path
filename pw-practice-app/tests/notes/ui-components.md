# Playwright UI Components

## Goal

This note covers common Playwright interactions with real UI components, including form inputs, radio buttons, dropdowns, tooltips, dialog boxes, web tables, datepickers, sliders, and drag-and-drop inside iframes.

The main goal is to practice interacting with different types of UI behavior while keeping locators readable and scoped to the correct section of the page.

---

## Form Input Fields

The input field test uses a scoped locator to target the `Email` field inside the `Using the Grid` card.

```ts
const usingTheGridEmailInput = page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("textbox", { name: "email" });
```
