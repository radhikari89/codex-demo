# App Boundary Model

Status: Approved

Related story: [#39](https://github.com/radhikari89/codex-demo/issues/39)

## Purpose

This model defines what counts as an app inside `webdevisfun.com` and how each app area stays independently understandable, testable, and eventually deployable.

Use this model before creating implementation stories for AI, Blockchain, Security, Misc, Work Orders, or future generated apps.

## What Counts As An App

An app is a self-contained product or experiment area launched from the main hub. It should have a clear purpose, an owner feature doc, a route or access point, a known data boundary, a verification path, and a decision about whether it uses shared backend services or dedicated services.

A page is not automatically an app. A page is usually part of an existing app when it only supports navigation, settings, documentation, or a narrow workflow inside an existing boundary.

A feature is not automatically an app. A feature becomes app-like when it has its own user goal, data ownership, verification path, or operational lifecycle.

## Boundary Types

| Type | Use When | Example |
| --- | --- | --- |
| UI-only app | No backend data or persistence is needed. | Static demo, calculator-style tool, documentation-first prototype |
| UI plus shared backend | The app can safely use an existing backend service and shared data model. | Dashboard widget, profile-backed category landing page |
| UI plus dedicated service | The app has distinct data, lifecycle, security, scale, or domain rules. | Mature Work Orders app |
| External linked app | The app is maintained separately but launched from the hub. | Separately hosted experiment |
| Undecided | Product or architecture is not clear yet. | Early AI or Blockchain concept |

## Required App Boundary Fields

Every app or app category feature doc should keep these fields current:

| Field | Required Meaning |
| --- | --- |
| Type | One of the approved boundary types. |
| Route/access point | The UI route, external link, API entry point, or operational entry point. |
| Data boundary | What data the app owns, reads, writes, or must not touch. |
| Backend/service dependency | Shared backend, dedicated service, external provider, or none. |
| Independent verification path | How the app can be verified without guessing from another feature. |

## Independent Verification Requirements

Each app should eventually document:

- local run command
- automated test command
- local smoke test
- deployed smoke test
- required environment variables
- backend/service dependencies
- known skipped checks or manual-only checks

For documentation-first or discovery-only apps, it is acceptable to mark runtime checks as not applicable, but the reason should be explicit.

## Microservice Guidance

Introduce a dedicated service only when there is a real boundary:

- distinct business domain
- separate database ownership
- different release cadence
- different scaling needs
- different security profile
- need for independent local or deployed verification
- operational ownership that would make shared deployment risky or confusing

Avoid creating a dedicated service only because the app is new.

## Current App Areas

| App Area | Approved Boundary Type | Notes |
| --- | --- | --- |
| Main site shell | UI plus shared backend | Owns public pages, auth entry points, dashboard shell, and navigation. |
| Authentication foundation | UI plus shared backend | Cross-cutting login/profile capability backed by Auth0 and `services/userservice`. |
| Security/Auth Provider Lab | UI category plus shared backend until a runnable lab justifies dedicated services | Auth experiments must remain isolated from the main app login path. |
| AI | Undecided | Needs first app concept and AI provider/cost/security discovery. |
| Blockchain | Undecided | Needs first safe testnet/tooling concept and security review. |
| Misc | Undecided | Can host smaller experiments and Work Orders integration decisions. |
| Work Orders | UI plus dedicated service or external linked app | Existing separate work should be evaluated before integration. |

## Story Creation Rules

- New app stories should reference the owning feature doc and this boundary model.
- If the boundary type is undecided, create a discovery or architecture story before implementation.
- If a story introduces a dedicated service, it should explain which microservice criteria are met.
- If a story changes routes, data ownership, service dependencies, or verification expectations, update the feature doc in the same PR.

## Open Decisions

- Which app category becomes the first proof of the full independent verification model after authentication.
- Whether Work Orders should be embedded, linked, or migrated into this repo.
- Which future app category needs a dedicated service first.
