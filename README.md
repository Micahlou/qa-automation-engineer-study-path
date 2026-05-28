# QA Automation Engineer Study Path

A structured study repository that documents the learning path and hands‑on practice toward becoming a QA Automation Engineer. It combines learning notes, automation exercises, sample test suites, and a growing portfolio of QA techniques.

## Table of Contents

- **About**: Purpose and scope
- **Getting Started**: Prerequisites and setup
- **Running Tests**: Commands for Playwright tests and reports
- **Project Structure**: High-level layout of the repo
- **Notes**: Learning guidance and caveats
- **Contributing**: How to help or extend this repo
- **License**n+

## About

This repository is a learning record: not only course exercises, but a living project that shows what was studied, how it was applied, and the resulting test code and documentation.

Core learning focus includes UI automation, API testing, test design, CI/CD integration, and practical QA engineering skills.

## Getting Started

Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- npx (bundled with modern Node.js)

Quick setup

```bash
git clone https://github.com/Micahlou/qa-automation-engineer-study-path.git
cd qa-automation-engineer-study-path/playwright-initial-practice
npm install
# (optional) install Playwright browsers used by tests
npx playwright install
```

Notes: the Playwright practice module contains TypeScript tests and relies on the `@playwright/test` runner. The project purposely contains learning-oriented examples; expect some files to be instructional rather than production-ready.

## Running Tests

From the `playwright-initial-practice` folder you can run the common Playwright commands:

```bash
# Run all tests (headless by default)
npx playwright test

# Run tests with the interactive UI
npx playwright test --ui

# Show the last HTML report
npx playwright show-report
```

Tip: If you want to run a single spec file or a specific test, use Playwright's `--project`, `--grep`, or file path options (see Playwright docs).

## Project Structure

High-level layout (abridged):

```
qa-automation-engineer-study-path/
  README.md
  playwright-initial-practice/
    package.json
    playwright.config.ts
    src/                # sample app (Angular) used for practice
    tests/              # Playwright test specs and notes
      autoWaiting.spec.ts
      locator-strategies.spec.ts
      uiComponents.spec.ts
      notes/
        auto-waiting.md
        locator-strategies.md
        ui-components.md
```

As the repository expands it will include dedicated folders for API testing, SQL validation, CI/CD examples, and portfolio projects.

## Notes & Learning Guidance

- Tests in `playwright-initial-practice` are exercises designed to teach locator strategies, auto-waiting, page object patterns, and test design.
- Expect explicit examples that highlight behavior rather than production best practices.
- When converting exercises into portfolio items, consider adding stronger error handling, test data management, and CI integration.

## Contributing

Contributions are welcome. Suggested ways to contribute:

- Add a new learning module (e.g., `api-testing/`, `ci-cd/`).
- Convert an exercise into a polished portfolio test with README and notes.
- Improve documentation and add reproducible CI examples.

When opening PRs, include a short description of what the change teaches or demonstrates.

## Useful Commands Summary

```bash
# From repo root to run Playwright exercises
cd playwright-initial-practice
npm install
npx playwright install
npx playwright test
```

## License

This repository is published under the MIT License (see LICENSE file in the repository root).
