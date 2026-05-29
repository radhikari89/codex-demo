# Feature: Security And Auth Provider Lab

Status: Draft

Priority: 3

Owner Agent: Solution Architect Agent / Security Reviewer

Related Staged Source: [Feature Map Draft](../ai-agents/staging/feature-map-draft.md)

Related GitHub Issues:

- [#46 Epic: Security and Auth Provider Lab](https://github.com/radhikari89/codex-demo/issues/46)
- [#52 Define auth-lab evaluation matrix](https://github.com/radhikari89/codex-demo/issues/52)
- [#53 Prototype Keycloak auth provider lab](https://github.com/radhikari89/codex-demo/issues/53)
- [#54 Compare managed auth providers for auth lab](https://github.com/radhikari89/codex-demo/issues/54)
- [#55 Add Security category to app navigation model](https://github.com/radhikari89/codex-demo/issues/55)

Related PRs:

- Pending

## Purpose

Provide a dedicated prototype category for security-focused applications and authentication/authorization provider prototypes.

## Current State

- Authentication strategy discovery identifies Spring Security-owned auth, Google OIDC, Keycloak, Cognito, Auth0, Okta, and Firebase/Supabase as options.
- Provider prototypes are not yet represented as their own app category or backlog epic.
- The main app still has a temporary auth bridge.

## Desired State

- Security appears as a first-class prototype category in the hub.
- Auth provider prototypes are isolated from the main application auth flow.
- Each provider prototype uses a shared evaluation checklist.
- Prototype findings can guide the future shared identity provider decision for multiple apps.

## App Boundary

- Type: Undecided; likely UI plus shared backend for documentation-first prototypes, with dedicated services only when a runnable lab requires them.
- Route/access point: Proposed `/apps/security` and future `/apps/security/auth-lab`.
- Data boundary: provider configuration notes, prototype users, claims/roles examples, secret-handling notes.
- Backend/service dependency: `services/userservice` for Spring Security/OIDC validation experiments; external IdPs for provider labs.
- Independent verification path: auth-lab setup docs, smoke checklist, provider-specific run notes, and security review notes.

## Completed Work

- Added Keycloak and auth-lab prototype approach to auth strategy discovery.

## Remaining Work

- Define auth-lab evaluation matrix.
- Add Security category to the app shell/navigation model.
- Prototype Keycloak as the first external IdP.
- Compare managed providers against the same checklist.

## Decisions

- The main application should use one approved production auth path.
- Provider prototypes should remain isolated until one path is intentionally promoted.

## Open Questions

- Should Security be visible in the first dashboard navigation or hidden until the first lab exists?
- Should runnable auth-lab prototypes live inside this repo or in separate repos?
- Which managed IdP should receive the first runnable prototype after Keycloak?

## Architecture / Diagrams

- [Authentication Strategy Discovery](../architecture/drafts/auth-strategy-discovery.md)
- [Container View](../architecture/c4/container-view.md)
- [Deployment View](../architecture/c4/deployment-view.md)

## Verification

- Local run: Pending
- Automated tests: Pending
- Local smoke test: Pending
- Deployed smoke test: Pending
- Required env vars: Pending provider choice

## Change Log

- Created feature doc from updated vision entry dated 05-22-2026.
- Created GitHub epic and first story set for Security/Auth Provider Lab.
