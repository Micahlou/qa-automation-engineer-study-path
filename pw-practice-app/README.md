# QA Automation Engineer Study Path

This repository documents my full study path toward becoming a QA Automation Engineer.

It is designed to be more than a collection of course exercises. It is a structured learning record that combines hands-on automation practice, study notes, test strategy, tooling, and future portfolio projects as I build toward a professional QA Automation role.

## Purpose

The goal of this repository is to track and demonstrate my growth across the core skills needed for QA Automation Engineering, including:

- UI test automation
- API testing
- Test case design
- Bug reporting
- Regression testing
- Smoke testing
- End-to-end testing
- SQL/database validation
- CI/CD integration
- Git and GitHub workflow
- QA documentation
- Test strategy and quality mindset

This repo will continue evolving as I move through my QA Automation roadmap.

## Current Focus

My current focus is Playwright with TypeScript.

The current test files cover foundational UI automation topics such as:

- Locator strategies
- Parent and child locator scoping
- Reusable locators
- Auto-waiting
- Alternative wait strategies
- Assertions
- Input fields
- Radio buttons
- Dropdowns
- Tooltips
- Dialog boxes
- Web tables
- Datepickers
- Sliders
- Iframes
- Drag-and-drop interactions

## Planned Learning Areas

Future sections of this repo may include:

- Advanced Playwright patterns
- Page Object Models
- Test fixtures
- Authentication handling
- API testing with Playwright and Postman
- SQL validation basics
- Test data management
- GitHub Actions for automated test runs
- CI/CD pipeline examples
- Manual QA fundamentals
- Bug reports and test case documentation
- QA portfolio projects
- Mock real-world testing scenarios

## Repository Structure

text tests/   autoWaiting.spec.ts   locator-strategies.spec.ts   uiComponents.spec.ts  tests/notes/   auto-waiting.md   locator-strategies.md   ui-components.md 

As the repo grows, the structure may expand into sections such as:

text playwright/ api-testing/ sql/ manual-qa/ ci-cd/ portfolio-projects/ bug-reports/ test-cases/ notes/ 

## Why This Repo Exists

I am using this repository to build practical, recruiter-visible proof of my QA Automation learning process.

Each section is intended to show:

- What I studied
- What I practiced
- What I understood
- How I applied the concept in code or documentation

The goal is not just to complete tutorials. The goal is to build real QA engineering skill through repetition, documentation, and applied practice.

## Tech Stack

Current:

- Playwright
- TypeScript
- Node.js
- Git
- GitHub

Planned / future:

- Postman
- SQL
- GitHub Actions
- REST API testing
- CI/CD workflows
- Test management documentation

## Running the Playwright Tests

Install dependencies:

bash npm install 

Install Playwright browsers:

bash npx playwright install 

Run all tests:

bash npx playwright test 

Run tests in UI mode:

bash npx playwright test --ui 

View the HTML report:

bash npx playwright show-report 

## Notes

Some test files are based on learning exercises and intentionally include examples that demonstrate syntax, behavior, and core concepts.

Over time, this repository will continue moving from foundational practice toward more production-style QA automation patterns.