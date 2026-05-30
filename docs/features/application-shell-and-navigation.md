# Feature: Application Shell And Navigation

Status: Draft

Priority: 2

Owner Agent: Product Analyst Agent / UI Agent

Related Staged Source: [Workflow Wireframe Draft](../ai-agents/staging/workflow-wireframe-draft.md)

Related GitHub Issues:

- [#40 Wireframe home, dashboard, and app navigation workflow](https://github.com/radhikari89/codex-demo/issues/40)
- [#55 Add Security category to app navigation model](https://github.com/radhikari89/codex-demo/issues/55)

Related PRs:

- Pending

## Purpose

Create the public home page, authenticated dashboard, and navigation structure for app categories.

## Current State

- Basic pages exist for home, login, signup, and dashboard.
- Dashboard is not yet the app hub described in the product vision.

## Desired State

- Professional public home page.
- Authenticated app shell after login.
- Navigation to Dashboard, AI, Blockchain, Security, Misc, and Settings.
- Mobile-friendly navigation.

## App Boundary

- Type: UI plus shared backend
- Route/access point: `/`, `/login`, `/signup`, `/dashboard`, `/apps/*`, `/settings`
- Data boundary: current user profile and app navigation metadata
- Backend/service dependency: shared auth/user backend
- Independent verification path: UI build, route tests, local navigation smoke test

## Completed Work

- Workflow wireframe story exists.
- Security category is accepted as a first-class prototype area in planning docs.

## Remaining Work

- Review Security navigation update.
- Implement app shell navigation.
- Add app category landing pages.
- Replace dashboard demo content with app-hub content.

## Decisions

- Security should appear as a normal app category alongside AI, Blockchain, and Misc.
- Security category pages should host learning prototypes and provider labs, not replace the main application login flow.

## Open Questions

- Should first dashboard include recent activity, recommendations, or only app entry points?
- When should Figma be introduced?
- Should Security be visible immediately with an empty/coming-soon state, or only after the first lab content exists?

## Architecture / Diagrams

- [AI Agent Story Flow](../architecture/workflows/ai-agent-story-flow.md)

## Verification

- Local run: Pending
- Automated tests: Pending
- Local smoke test: Pending
- Deployed smoke test: Pending
- Required env vars: None expected for UI-only shell work

## Change Log

- Created initial feature tracking doc from staged vision.
