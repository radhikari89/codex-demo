# Feature: Application Shell And Navigation

Status: In Progress

Priority: 2

Owner Agent: Product Analyst Agent / UI Agent

Related Staged Source: [Workflow Wireframe Draft](../ai-agents/staging/workflow-wireframe-draft.md)

Related GitHub Issues:

- [#40 Wireframe home, dashboard, and app navigation workflow](https://github.com/radhikari89/codex-demo/issues/40)
- [#55 Add Security category to app navigation model](https://github.com/radhikari89/codex-demo/issues/55)
- [#80 Build application shell and category pages MVP](https://github.com/radhikari89/codex-demo/issues/80)

Related PRs:

- Pending

## Purpose

Create the public home page, authenticated dashboard, and navigation structure for app categories.

## Current State

- Public home, login, signup, callback, dashboard, and app category routes exist.
- Authenticated routes are protected by the current Auth0-backed route guard.
- Dashboard is being converted into the app hub described in the product vision.
- Identity/account settings are no longer owned by this hub; they belong in the separate `webdevisfun-identity` app.

## Desired State

- Professional public home page.
- Authenticated app shell after login.
- Navigation to Dashboard, AI, Blockchain, Security, and Misc.
- Mobile-friendly navigation.

## App Boundary

- Type: UI plus shared backend
- Route/access point: `/`, `/login`, `/signup`, `/dashboard`, `/apps/*`
- Data boundary: current hub session display and app navigation metadata
- Backend/service dependency: shared auth/user backend
- Independent verification path: UI build, route tests, local navigation smoke test

## Completed Work

- Workflow wireframe story exists.
- Security category is accepted as a first-class prototype area in planning docs.
- Issue #80 created as the build story for the first app shell and category pages MVP.
- Public home page now frames the product as the Web Dev Is Fun prototype hub.
- Dashboard now exposes AI, Blockchain, Security, and Misc prototype categories.
- Category landing pages now exist under `/apps/ai`, `/apps/blockchain`, `/apps/security`, and `/apps/misc`.
- Hub-owned settings/profile page was removed under #83 because identity/account UX now belongs to `radhikari89/webdevisfun-identity`.

## Remaining Work

- Review the implemented shell in browser across desktop and mobile.
- Add deeper prototype cards as category-specific stories are approved.
- Decide whether dashboard should show real recent activity, recommendations, or only app entry points.
- Add a link to the deployed identity app once `webdevisfun-identity` has a stable URL.
- Add automated route/navigation tests if the UI test harness is expanded.

## Decisions

- Security should appear as a normal app category alongside AI, Blockchain, and Misc.
- Security category pages should host learning prototypes and provider labs, not replace the main application login flow.
- Account/profile/settings UX is delivered by the Shared Identity app, not by this hub.

## Open Questions

- Should first dashboard include real recent activity, recommendations, or only app entry points?
- When should Figma be introduced?
- Which category should get the first real prototype card after the MVP shell is accepted?

## Architecture / Diagrams

- [AI Agent Story Flow](../architecture/workflows/ai-agent-story-flow.md)

## Verification

- Local run: Pending
- Automated tests: Pending
- Local smoke test: Pending route checks for `/`, `/login`, `/signup`, `/dashboard`, `/apps/ai`, `/apps/blockchain`, `/apps/security`, and `/apps/misc`
- Deployed smoke test: Pending
- Required env vars: None expected for UI-only shell work

## Change Log

- 2026-06-18: Added issue #80 tracking and first app shell/category page MVP updates.
- 2026-07-06: Removed hub-owned settings/profile route after Shared Identity app became the account UX boundary.
- Created initial feature tracking doc from staged vision.
