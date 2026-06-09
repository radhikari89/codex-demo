# Feature: Authentication And Authorization

Status: In Progress

Priority: 1

Owner Agent: Solution Architect Agent

Related Staged Source: [Feature Map Draft](../ai-agents/staging/feature-map-draft.md)

Related GitHub Issues:

- [#38 Discover and recommend authentication strategy](https://github.com/radhikari89/codex-demo/issues/38)
- [#59 Configure Auth0 tenant and OIDC application](https://github.com/radhikari89/codex-demo/issues/59)
- [#62 Integrate Angular SPA with Auth0 login](https://github.com/radhikari89/codex-demo/issues/62)
- [#61 Configure Spring Boot JWT resource server](https://github.com/radhikari89/codex-demo/issues/61)
- [#60 Implement current-user profile from Auth0 claims](https://github.com/radhikari89/codex-demo/issues/60)
- [#63 Remove temporary passwordHash auth bridge](https://github.com/radhikari89/codex-demo/issues/63)
- [#65 Document Auth0 deployment and CORS configuration](https://github.com/radhikari89/codex-demo/issues/65)
- [#64 Add Auth0 authentication smoke tests](https://github.com/radhikari89/codex-demo/issues/64)
- [#71 Configure Auth0 tenant, SPA app, and API in Auth0 dashboard](https://github.com/radhikari89/codex-demo/issues/71)

Related PRs:

- Pending

## Purpose

Provide industry-standard sign up, sign in, authorization, route protection, and future social login support for `webdevisfun.com`.

## Current State

- Auth0 is the accepted provider for the main hub login path.
- Angular Auth0 SDK dependency has been added.
- UI login and signup now redirect through Auth0.
- Angular Auth0 values are loaded from `/app-config.json` at runtime.
- Backend JWT Resource Server configuration has been completed under #61.
- Auth0 dashboard tenant, SPA application, and API setup has been completed under #71.
- Current-user/profile implementation is in progress under #60.

## Desired State

- Users can sign up and sign in securely.
- Auth0 owns hosted login.
- Angular uses Auth0 OIDC login.
- Spring Boot validates JWT access tokens as a Resource Server.
- Current-user/profile behavior is derived from trusted Auth0 claims.
- Public, signed-in, and future admin access rules are documented.

## App Boundary

- Type: UI plus shared backend
- Route/access point: `/login`, `/signup`, `/callback`, `/dashboard`, `/api/v1/auth/me`
- Data boundary: Auth0 identity claims, local user profile metadata, future roles/permissions
- Backend/service dependency: `services/userservice`
- Independent verification path: backend auth tests, UI auth flow tests, local and deployed smoke tests

## Completed Work

- Temporary auth bridge exists for first app navigation.
- Auth strategy discovery story has been created.
- ADR-0002 accepts Auth0 as the main hub login solution.
- Auth0/OIDC implementation stories have been created under #44.
- Auth0 tenant/application configuration notes have been merged.
- Angular login, signup, logout, and route guard work has been completed under #62.
- Auth0 runtime config setup has been completed under #65.
- Backend Auth0 issuer/audience validation and protected-route tests have been completed under #61.
- Auth0 dashboard owner setup steps have been completed under #71.
- `/api/v1/auth/me` has been selected as the current-user endpoint for #60.

## Remaining Work

- Implement current-user/profile behavior from Auth0 claims.
- Remove temporary passwordHash auth bridge.
- Add auth smoke tests against the configured Auth0 tenant.

## Decisions

- Auth0 is the accepted login provider for the main hub.
- Spring Boot will act as a JWT Resource Server for secured REST APIs.
- Current-user lookup uses `/api/v1/auth/me`, not the CRUD `/api/v1/users` collection.
- Auth0 provider identity metadata is stored separately from the temporary demo `users` table.
- First-party password handling is deferred; do not build local password auth for the main hub now.

## Open Questions

- Which Auth0 claims should map into application roles/permissions first?
- Should Auth0 social connections be enabled immediately or after the base OIDC flow works?
- Which Auth0 roles/claims should become first-class application permissions?

## Architecture / Diagrams

- [Container View](../architecture/c4/container-view.md)
- [Deployment View](../architecture/c4/deployment-view.md)
- [ADR-0002 Authentication Strategy](../architecture/decisions/ADR-0002-authentication-strategy.md)
- [Auth0 OIDC Configuration](../architecture/knowledge/security-and-auth/auth0-oidc-configuration.md)

## Verification

- Local run: Pending
- Automated tests: `mvn "-Djavax.net.ssl.trustStoreType=Windows-ROOT" test` from `services/userservice`
- Local smoke test: Pending
- Deployed smoke test: Pending
- Required env vars: Auth0 domain, SPA client ID, API audience, issuer URI, redirect URI, logout return URL

## Change Log

- Created initial feature tracking doc from staged vision.
- Accepted Auth0 implementation path and created concrete implementation stories.
- Added initial Auth0 OIDC configuration guide.
- Completed Spring Boot JWT Resource Server implementation for #61.
- Added owner-facing Auth0 dashboard setup steps for #71.
- Selected `/api/v1/auth/me` and started current-user/profile implementation for #60.
