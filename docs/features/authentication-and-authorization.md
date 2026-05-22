# Feature: Authentication And Authorization

Status: Draft

Priority: 1

Owner Agent: Solution Architect Agent

Related Staged Source: [Feature Map Draft](../ai-agents/staging/feature-map-draft.md)

Related GitHub Issues:

- [#38 Discover and recommend authentication strategy](https://github.com/radhikari89/codex-demo/issues/38)

Related PRs:

- Pending

## Purpose

Provide industry-standard sign up, sign in, authorization, route protection, and future social login support for `webdevisfun.com`.

## Current State

- UI has a temporary local auth bridge.
- Login looks up a user by email.
- Signup sends a password-like value as `passwordHash`.
- User session state is stored client-side.

## Desired State

- Users can sign up and sign in securely.
- Backend owns credential handling or delegates identity to an approved provider.
- Google/Gmail sign-in is evaluated.
- Public, signed-in, and future admin access rules are documented.

## App Boundary

- Type: UI plus shared backend
- Route/access point: `/login`, `/signup`, `/dashboard`, future `/api/v1/auth/*`
- Data boundary: user identity, profile, credentials or external identity mapping
- Backend/service dependency: `services/userservice`
- Independent verification path: backend auth tests, UI auth flow tests, local and deployed smoke tests

## Completed Work

- Temporary auth bridge exists for first app navigation.
- Auth strategy discovery story has been created.

## Remaining Work

- Approve auth strategy.
- Replace temporary auth bridge.
- Add backend auth contract.
- Add UI auth integration.
- Add security review and verification.

## Decisions

- Pending auth strategy approval.

## Open Questions

- Spring Security-owned auth, managed provider, or hybrid?
- Cookie session or token-based model?
- When should Google sign-in be added?

## Architecture / Diagrams

- [Container View](../architecture/c4/container-view.md)
- [Deployment View](../architecture/c4/deployment-view.md)

## Verification

- Local run: Pending
- Automated tests: Pending
- Local smoke test: Pending
- Deployed smoke test: Pending
- Required env vars: Pending

## Change Log

- Created initial feature tracking doc from staged vision.
