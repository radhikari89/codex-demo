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

Use [Independent App Verification](../features/independent-app-verification.md) for the reusable checklist and handoff template before moving delivery work from Project 1 into an app-owned repository and project.

Plain version: do not start coding a real app until we know where it lives, how to run it, how to test it, and which project board owns it.

## Default App Ownership

- Each new app should start in its own repository.
- Each new app should start with its own GitHub Project for epics, stories, status, and review tracking.
- Each app that persists data should own its own database.
- Apps may share the same Auth0/OIDC tenant or security profile when that keeps identity consistent.
- Apps should usually keep separate Auth0 SPA clients, callback/origin settings, and API audiences so each app remains independently deployable, auditable, and portable. See [Multi-App Auth0 Boundary](knowledge/security-and-auth/multi-app-auth0-boundary.md).
- Apps may share the same root domain while launched from `webdevisfun.com`, but they must remain portable enough to move under a different domain or umbrella later.
- Apps may share a common Kubernetes-like deployment orchestrator or platform conventions, but not a shared release lifecycle by default.
- The hub should act as a launcher/catalog and shared entry point, not as the permanent home for every app's code, database, and backlog.

## New App Incubation And Handoff

Project 1 for this hub is the initiator board for new apps. It is the right place to capture an app idea, approve the boundary decision, and track the bootstrap work needed before the app has its own repo and project.

Use the hub repo and Project 1 for:

- new app idea intake
- app boundary discovery
- approval to create a new independent app
- setup stories for creating the app repo and app GitHub Project
- cross-app coordination, shared auth/platform decisions, and hub navigation/catalog changes

After the app repo and GitHub Project exist, create delivery epics and implementation stories in the app's own repo and project board. Project 1 should keep only a coordination/linking issue for visibility unless the work changes the hub, shared identity, shared platform, or cross-app contracts.

Plain version: Project 1 starts the idea and hands it off. The app's own project board owns the real build work.

The handoff is complete when:

- the app repo exists
- the app GitHub Project exists
- the app has an initial README or feature brief
- the app boundary fields are recorded
- the hub epic links to the app repo and project
- at least one app-owned story exists in the app project, if implementation is ready to start

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
| Shared Identity App | Independent app | Repo: `radhikari89/webdevisfun-identity`; Project: `https://github.com/users/radhikari89/projects/3`. Provides identity/account-facing UX around Auth0 identity while Auth0 remains the login authority. |
| Security/Auth Provider Lab | Hub-owned category/discovery until runnable; independent lab repo when executable | Auth experiments must remain isolated from the main app login path. Provider comparison and evaluation docs stay in Project 1; runnable provider labs should get a repo/project boundary before implementation. |
| AI | Undecided independent app | Needs first app concept and AI provider/cost/security discovery before repo/project creation. |
| Blockchain | Undecided independent app | Needs first safe testnet/tooling concept and security review before repo/project creation. |
| Misc | Undecided independent app category | Smaller apps should get separate repos/projects when they become real apps. |
| Work Orders | Independent app | Should use a separate repo, separate project board, and separate database. The hub may link to it or integrate through explicit contracts. |

Plain version for Security/Auth Provider Lab: comparison docs stay here; runnable login-provider demo apps should usually get their own repo before coding starts.

## Story Creation Rules

- New non-epic app stories must name their parent epic in a `Parent Epic` section.
- The parent epic must list each child story in a `Child Issues` checklist.
- New app stories should reference the owning feature doc and this boundary model.
- New app incubation and bootstrap stories may live in this hub repo and Project 1 until the app repo and app GitHub Project exist.
- New app delivery stories should be created in that app's own repository and GitHub Project unless the story is explicitly about the hub, shared auth, shared platform, or cross-app coordination.
- If a new app repository or project board does not exist yet, create a setup/discovery story in this hub repo before implementation.
- If the boundary type is undecided, create a discovery or architecture story before implementation.
- If a story introduces or changes a backend service, database, deployment path, or repo/project ownership, it should explain the app boundary impact.
- If a story changes routes, data ownership, service dependencies, or verification expectations, update the feature doc in the same PR.

## Open Decisions

- Which app category becomes the first proof of the full independent verification model after authentication.
- Which future app category needs a dedicated service first.
