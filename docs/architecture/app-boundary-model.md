# App Boundary Model

Status: Approved

Related story: [#39](https://github.com/radhikari89/codex-demo/issues/39)

## Purpose

This model defines what counts as an app launched from the hub and how each app area stays independently owned, testable, deployable, and portable from the beginning.

Use this model before creating implementation stories for AI, Blockchain, Security, Misc, Work Orders, or future generated apps.

## What Counts As An App

An app is a self-contained product or experiment area launched from the main hub. It should have a clear purpose, an owner feature doc, a route or access point, a known data boundary, a verification path, its own repository, its own GitHub Project, its own database when persistence is needed, and a decision about whether it exposes its own backend service.

A page is not automatically an app. A page is usually part of an existing app when it only supports navigation, settings, documentation, or a narrow workflow inside an existing boundary.

A feature is not automatically an app. A feature becomes app-like when it has its own user goal, data ownership, verification path, or operational lifecycle.

## Boundary Types

| Type | Use When | Example |
| --- | --- | --- |
| Independent UI-only app | No backend data or persistence is needed. | Static demo, calculator-style tool, documentation-first prototype |
| Independent UI plus dedicated backend | The app needs API behavior, persistence, integrations, jobs, or server-side security checks. | Work Orders app, AI app with provider calls |
| External linked app | The app is maintained separately and launched from the hub. | Separately hosted experiment |
| Undecided | Product or architecture is not clear yet. | Early AI or Blockchain concept |

## Required App Boundary Fields

Every app or app category feature doc should keep these fields current:

| Field | Required Meaning |
| --- | --- |
| Type | One of the approved boundary types. |
| Route/access point | The UI route, external link, API entry point, or operational entry point. |
| Repository | The dedicated repo that owns the app code. |
| GitHub Project | The dedicated project board that tracks that app's stories. |
| Data boundary | What data the app owns, reads, writes, or must not touch. |
| Backend/service dependency | Dedicated backend, external provider, or none. |
| Independent verification path | How the app can be verified without guessing from another feature. |
| Portability notes | What must change if the app moves under a different domain, brand, or umbrella. |

## Independent Verification Requirements

Each app should eventually document:

- local run command
- automated test command
- local smoke test
- deployed smoke test
- required environment variables
- backend/service dependencies
- repo and project board location
- known skipped checks or manual-only checks

For documentation-first or discovery-only apps, it is acceptable to mark runtime checks as not applicable, but the reason should be explicit.

## Default App Ownership

- Each new app should start in its own repository.
- Each new app should start with its own GitHub Project for epics, stories, status, and review tracking.
- Each app that persists data should own its own database.
- Apps may share the same Auth0/OIDC tenant or security profile when that keeps identity consistent.
- Apps may share the same root domain while launched from `webdevisfun.com`, but they must remain portable enough to move under a different domain or umbrella later.
- Apps may share a common Kubernetes-like deployment orchestrator or platform conventions, but not a shared release lifecycle by default.
- The hub should act as a launcher/catalog and shared entry point, not as the permanent home for every app's code, database, and backlog.

## Dedicated Backend Guidance

Introduce a dedicated backend when there is a real boundary:

- distinct business domain
- separate database ownership
- different release cadence
- different scaling needs
- different security profile
- need for independent local or deployed verification
- operational ownership that would make shared deployment risky or confusing

Avoid sharing the hub backend for a real app unless the work is clearly hub-owned, such as login/profile, navigation, or category metadata.

## Current App Areas

| App Area | Approved Boundary Type | Notes |
| --- | --- | --- |
| Main site shell | Hub-owned UI plus shared auth/profile backend | Owns public pages, auth entry points, dashboard shell, navigation, and app catalog. |
| Authentication foundation | Shared identity foundation | Cross-cutting login/profile capability backed by Auth0 and `services/userservice`. |
| Security/Auth Provider Lab | Independent app or lab repo when runnable | Auth experiments must remain isolated from the main app login path. |
| AI | Undecided independent app | Needs first app concept and AI provider/cost/security discovery before repo/project creation. |
| Blockchain | Undecided independent app | Needs first safe testnet/tooling concept and security review before repo/project creation. |
| Misc | Undecided independent app category | Smaller apps should get separate repos/projects when they become real apps. |
| Work Orders | Independent app | Should use a separate repo, separate project board, and separate database. The hub may link to it or integrate through explicit contracts. |

## Story Creation Rules

- New non-epic app stories must name their parent epic in a `Parent Epic` section.
- The parent epic must list each child story in a `Child Issues` checklist.
- New app stories should reference the owning feature doc and this boundary model.
- New app stories should be created in that app's own repository and GitHub Project unless the story is explicitly about the hub, shared auth, or platform coordination.
- If a new app repository or project board does not exist yet, create a setup/discovery story before implementation.
- If the boundary type is undecided, create a discovery or architecture story before implementation.
- If a story introduces or changes a backend service, database, deployment path, or repo/project ownership, it should explain the app boundary impact.
- If a story changes routes, data ownership, service dependencies, or verification expectations, update the feature doc in the same PR.

## Open Decisions

- Which app category becomes the first proof of the full independent verification model after authentication.
- Which future app category needs a dedicated service first.
