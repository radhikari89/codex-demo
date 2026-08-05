# Feature: Independent App Verification

Status: Approved

Priority: Architecture discovery

Owner Agent: Solution Architect Agent / QA Agent

Related Staged Source: [App Boundary Model Draft](../ai-agents/staging/app-boundary-model-draft.md)

Related GitHub Issues:

- [#39 Approve app boundary model and independent verification rules](https://github.com/radhikari89/codex-demo/issues/39)
- [#88 Define independent app verification checklist and handoff template](https://github.com/radhikari89/codex-demo/issues/88)

Related PRs:

- Pending

## Purpose

Define how each app area can be owned, tracked, tested, deployed, and verified independently as the hub grows.

## Current State

- App boundary model is approved in [App Boundary Model](../architecture/app-boundary-model.md).
- Per-app verification fields are required in feature docs.
- Real apps are expected to start with separate repositories, separate GitHub Projects, and separate databases when persistence is needed.
- The hub project board is the initiator board for app ideas, boundary approval, and repo/project bootstrap work.

## Desired State

- Each app documents local run, automated tests, local smoke test, deployed smoke test, env vars, and dependencies.
- Each app can be tested independently across UI and backend.
- Each app can be deployed independently through the shared deployment/orchestration approach.
- Each app's delivery work is tracked in its own GitHub Project after bootstrap.
- Shared pieces are limited to identity/security profile, domain/platform conventions, and explicit integration contracts.

## Reusable Verification Checklist

Use this checklist when approving a new app boundary, bootstrapping a new app repo, or preparing an app for handoff from Project 1 to its app-owned project.

### Ownership And Tracking

- Repository exists or the story explicitly explains why it does not yet exist.
- GitHub Project exists for app-owned delivery work.
- Parent epic exists in the owning repo/project.
- Hub Project 1 keeps only incubation, bootstrap, coordination, or hub-linking stories after handoff.
- Branch, PR, review, and Done-after-merge rules are documented in the owning repo.
- App feature doc records type, route/access point, data boundary, service dependencies, verification path, and portability notes.

### Local Development

- Local install command is documented.
- Local start command is documented.
- Required local services are listed, such as backend, database, Auth0 tenant, provider sandbox, or none.
- Required local environment variables and runtime config files are documented.
- Local startup has a known success signal, such as URL, health endpoint, or visible app shell.
- Missing-config behavior is documented and safe.

### Automated Checks

- Build command is documented.
- Unit/component test command is documented, or the reason tests are not applicable is explicit.
- Lint/typecheck/static analysis command is documented when available.
- Security/dependency checks are documented when provider, auth, deployment, or data risk exists.
- Checks avoid live secrets and can run in CI or a clean local environment.

### Local Smoke Test

- Public route or entry point can be reached.
- Protected route behavior is verified when the app uses login.
- Main happy path is verified with local dependencies.
- Error/empty/loading states are verified when user-facing.
- Auth0 callback, logout, and token behavior are verified when the app uses Auth0.
- Backend health and at least one API call are verified when the app has a backend.
- Database migration/startup behavior is verified when the app owns persistence.

### Deployed Smoke Test

- Deployed URL, environment, and commit/version are recorded.
- HTTPS works and redirects correctly.
- SPA deep links refresh correctly when applicable.
- Public, protected, and not-found routes behave as expected.
- API routing, CORS, and `Authorization` header forwarding work when applicable.
- Auth0 callback/logout/origin values match the deployed URL when applicable.
- Runtime config is environment-specific and does not contain secrets.
- Rollback or recovery path is documented.

### Auth0 And IAM

- App uses the shared Auth0 tenant when SSO with Web Dev Is Fun apps is expected.
- App has its own Auth0 SPA client ID unless an ADR explicitly approves sharing.
- App-specific callback, logout, allowed web origin, and CORS origin values are configured per environment.
- App-specific API audience is configured when the app owns a backend API.
- Backend validates issuer, audience, signature, expiration, and relevant authorization claims.
- Browser runtime config contains only non-secret values.
- Tokens are not persisted in browser local storage unless a security review accepts that tradeoff.
- Cross-app SSO expectations follow [Multi-App Auth0 Boundary](../architecture/knowledge/security-and-auth/multi-app-auth0-boundary.md).

### Backend And Data

- Backend ownership is explicit: dedicated backend, shared hub backend, external provider, or none.
- Database ownership is explicit: app-owned database, external provider, or none.
- Migrations, seed data, and local database startup are documented when persistence exists.
- App-specific user/resource mapping is owned by the app, not by the Shared Identity app.
- Service-to-service or machine-to-machine auth is excluded unless a story explicitly approves it.

## Handoff Template

Copy this section into a new app bootstrap or release handoff story and fill it in before moving implementation work out of Project 1.

```markdown
## Independent App Handoff

- App name:
- Owning repository:
- Owning GitHub Project:
- Parent epic:
- Boundary type:
- Route/access point:
- Data boundary:
- Backend/service dependency:
- Database ownership:
- Shared dependencies:
- Portability notes:

## Local Verification

- Install:
- Start:
- Build:
- Test:
- Local smoke test:
- Required env vars/runtime config:
- Required local services:
- Known manual checks:

## Deployed Verification

- Deployment target:
- Deployed smoke test:
- Auth0 callback/logout/origin values:
- API routing/CORS checks:
- Rollback/recovery path:
- Evidence location:

## Handoff Decision

- Work remaining in Project 1:
- Work moving to app-owned project:
- Cross-app coordination stories:
- Blocking decisions:
- Reviewer/owner:
```

## Boundary-Type Guidance

| Boundary Type | Minimum Verification |
| --- | --- |
| Independent UI-only app | Install, build, local start, route smoke test, deployed HTTPS/deep-link smoke test, runtime config review when applicable. |
| Independent UI plus dedicated backend | UI checks plus backend build/tests, local service startup, API smoke test, database/migration verification, deployed API routing/CORS/auth smoke test, rollback notes. |
| External linked app | Link health, ownership record, auth/session expectations, return-path behavior, user-facing failure mode, and contact/issue tracker. |
| Undecided | Architecture discovery, boundary decision, verification plan, and explicit blockers before implementation starts. |

## App Boundary

- Type: Cross-cutting architecture and QA practice
- Route/access point: Not user-facing by itself
- Data boundary: Per app
- Backend/service dependency: Per app
- Independent verification path: Defined by this feature

## Completed Work

- App boundary model draft exists.
- Approval story exists.
- App boundary model has been promoted to stable architecture docs.
- Independent verification requirements have been approved.
- Reusable verification checklist and handoff template added under #88.

## Remaining Work

- Apply the model to the first app category.
- Use the model during future story creation and feature-doc updates.

## Decisions

- An app is a self-contained product or experiment area launched from the main hub.
- A page or feature is not automatically an app unless it has its own purpose, data boundary, verification path, or operational lifecycle.
- Approved boundary types are independent UI-only app, independent UI plus dedicated backend, external linked app, and undecided.
- New real apps should start in separate repositories with separate GitHub Projects.
- Project 1 can track app incubation and handoff, but app delivery stories move to the app-owned project after the repo/project exists.
- Apps that persist data should own separate databases.
- Apps may share the same Auth0/OIDC tenant or security profile, root domain, and Kubernetes-like deployment orchestrator.
- Apps should remain portable enough to move under a different domain, brand, or umbrella later.

## Open Questions

- Which app should be the first proof of the full independent verification model?

## Architecture / Diagrams

- [System Context](../architecture/c4/system-context.md)
- [App Boundary Model](../architecture/app-boundary-model.md)

## Verification

- Local run: Not applicable; architecture/documentation-only story
- Automated tests: Markdown review
- Local smoke test: Checklist defined; execution is applied per app
- Deployed smoke test: Checklist defined; execution is applied per app
- Required env vars: None

## Change Log

- Created initial feature tracking doc from staged vision.
- Promoted the app boundary model and approved independent verification requirements under #39.
- 2026-08-05: Added reusable independent-app verification checklist and handoff template under #88.
