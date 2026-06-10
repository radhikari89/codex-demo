# App Boundary Model Draft

Status: Promoted

Related story: [#39](https://github.com/radhikari89/codex-demo/issues/39)

Stable model: [App Boundary Model](../../architecture/app-boundary-model.md)

This draft has been promoted. Keep it for traceability; use the stable model for future story creation.

Decision update: real apps should start as separate repositories with separate GitHub Projects and separate databases when persistence is needed. The hub can share identity, domain/platform conventions, and launch/navigation, but future apps should remain independently deployable and portable to a different domain or umbrella.

## Purpose

This model defines what counts as an app launched from `webdevisfun.com` and how each app can stay independently understandable, testable, deployable, and portable.

## Draft Definition

An app is a self-contained product or experiment area linked from the main dashboard. Each app should have:

- a clear purpose
- an owner feature doc
- a route or access point from the main hub
- a known data boundary
- a local verification path
- a decision about whether it is UI-only, has its own backend, or is externally linked

## Boundary Types

| Type | Use When | Example |
| --- | --- | --- |
| Independent UI-only app | No backend data or persistence is needed. | Static demo or calculator-style tool |
| Independent UI plus dedicated backend | The app has distinct data, lifecycle, security, scale, or domain rules. | Work Orders as a mature app |
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
| Main site shell | Hub-owned UI plus shared auth/profile backend | Owns public pages, auth entry points, dashboard shell, and navigation. |
| AI | Undecided | Needs first app concept and AI integration discovery. |
| Blockchain | Undecided | Needs security/tooling discovery before implementation. |
| Misc | Undecided | Can host smaller experiments and link to Work Orders. |
| Work Orders | Independent app | Should use a separate repo, separate project board, and separate database. The hub may link to it or integrate through explicit contracts. |

## Open Questions

- App categories may be represented in the hub, but real apps should be separate repos/projects from the beginning.
- The main hub may share the identity/security profile, but individual apps should not rely on the hub as their permanent code, database, or backlog owner.
- How should shared identity and authorization work across future dedicated services?
- Which app should be the first proof of independent verification?
