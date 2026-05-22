# App Boundary Model Draft

Status: Draft

Related story: [#29](https://github.com/radhikari89/codex-demo/issues/29)

## Purpose

This model defines what counts as an app inside `webdevisfun.com` and how each app can stay independently understandable, testable, and eventually deployable.

## Draft Definition

An app is a self-contained product or experiment area linked from the main dashboard. Each app should have:

- a clear purpose
- an owner feature doc
- a route or access point from the main hub
- a known data boundary
- a local verification path
- a decision about whether it uses shared backend services or a dedicated service

## Boundary Types

| Type | Use When | Example |
| --- | --- | --- |
| UI-only app | No backend data or persistence is needed. | Static demo or calculator-style tool |
| UI plus shared backend | The app can safely use an existing backend service. | Basic user-specific dashboard widget |
| UI plus dedicated service | The app has distinct data, lifecycle, security, scale, or domain rules. | Work Orders as a mature app |
| External linked app | The app is maintained separately but launched from the hub. | Separately hosted experiment |
| Undecided | Product or architecture is not clear yet. | Early AI or Blockchain concept |

## Independent Verification

Each app should eventually document:

- local run command
- automated test command
- local smoke test
- deployed smoke test
- required environment variables
- backend/service dependencies

## Microservice Guidance

Microservices should be introduced when there is a real boundary:

- distinct business domain
- separate database ownership
- different release cadence
- different scaling needs
- different security profile
- need for independent local or deployed verification

Avoid creating a dedicated service only because the app is new.

## Current App Areas

| App Area | Draft Boundary Type | Notes |
| --- | --- | --- |
| Main site shell | UI plus shared backend | Owns public pages, auth entry points, dashboard shell, and navigation. |
| AI | Undecided | Needs first app concept and AI integration discovery. |
| Blockchain | Undecided | Needs security/tooling discovery before implementation. |
| Misc | Undecided | Can host smaller experiments and link to Work Orders. |
| Work Orders | UI plus dedicated service or external linked app | Existing separate work should be evaluated before integration. |

## Open Questions

- Should app categories be routes inside one Angular app or separate deployed apps?
- Should the main hub own authentication for all apps?
- How should shared identity and authorization work across future dedicated services?
- Which app should be the first proof of independent verification?
