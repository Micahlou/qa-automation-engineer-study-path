# Playwright Locator Strategies

## Goal

This note covers how to locate elements in Playwright and how to write selectors that are stable, readable, and maintainable.

Good locator strategy matters because UI tests can become flaky when they rely too heavily on fragile selectors such as long CSS chains, dynamic classes, or XPath.

The goal is to understand:

- Common locator syntax
- Parent and child locator scoping
- Reusable locators
- Value extraction
- General, locator, and soft assertions

---

## Study Context

The matching test file is intentionally written as a learning exercise.

Some locator examples are shown only to demonstrate syntax, while other examples are used in real actions or assertions.

In a production test suite, most locators should eventually be connected to an action or assertion so the test clearly proves expected behavior.

---

## Preferred Locator Priority

In most cases, I should prefer locators in this order:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `locator()` with CSS selectors
6. XPath only when necessary

This order is not absolute, but it is a good default.

The best locator depends on the UI, accessibility structure, and whether there are multiple similar elements on the page.

---

## Why `getByRole()` Is Usually Preferred

`getByRole()` is usually one of the strongest locator options because it targets elements based on their purpose in the UI.

Example:

```ts
await page.getByRole("button", { name: "Submit" }).click();
```
