# ADR-0002: Authentication Strategy

Status: Proposed

Related story: [#38](https://github.com/radhikari89/codex-demo/issues/38)

Related discovery: [Authentication Strategy Discovery](../drafts/auth-strategy-discovery.md)

## Context

`webdevisfun.com` currently has a temporary authentication bridge:

- Angular stores mock auth state in `localStorage`.
- Login looks up a user by email.
- Signup sends a password-like value through `passwordHash`.
- The Spring Boot user service has user persistence but not a complete industry-standard authentication and authorization foundation.

The application is expected to grow into a hub of independently testable prototype areas. Future prototype areas may use shared identity, dedicated services, or external providers. The auth strategy therefore needs to support both the first main application auth flow and later provider experiments.

## Decision State

No final accepted provider decision has been made yet.

The current proposed direction is:

- Keep the application auth API stable, for example `/api/v1/auth/me`, `/api/v1/auth/logout`, and user-profile endpoints.
- Do not use API versions such as `/api/v2` to represent different auth providers.
- Use Spring Security as the application enforcement layer for route/API protection, sessions/tokens, and role/claim mapping.
- Start with a small, testable main-app auth implementation that removes the temporary `passwordHash` bridge.
- Evaluate external OIDC providers through the Security/Auth Provider Lab before promoting one provider path into the main application.
- Treat Keycloak as the first external IdP prototype candidate because it can run locally and exposes real OIDC concepts, roles, clients, realms, and Google identity brokering.

## Options Considered

| Option | Current Position |
| --- | --- |
| Spring Security-owned email/password | Strong first implementation candidate for learning and removing the temporary bridge. |
| Spring Security OAuth2/OIDC with Google | Strong follow-up path once the app auth boundary is stable. |
| Keycloak | Strong first external IdP prototype and possible future shared identity provider. |
| AWS Cognito | AWS-native managed IdP candidate to compare before production hardening. |
| Auth0 / Okta | Commercial managed IdP candidate to compare if hosted identity speed and polish outrank operating an IdP. |
| Firebase Auth / Supabase Auth | Fast app-builder auth candidate, but less aligned with a Spring Boot-centered backend. |

## Consequences

- The main app should depend on a stable app-level auth contract, not provider-specific UI/API paths.
- Provider-specific behavior should live behind Spring Security configuration, adapters, claim mapping, and environment profiles.
- Future provider prototypes should live under the Security/Auth Provider Lab and use a shared evaluation matrix.
- The final provider choice should be promoted through a later accepted ADR or by updating this ADR from `Proposed` to `Accepted`.

## Open Questions

- Should the first production-ready main-app implementation use Spring Security-owned email/password or Keycloak-backed OIDC?
- Should browser auth use HTTP-only cookie sessions, OIDC authorization-code flow, JWT bearer tokens, or a hybrid?
- Should Keycloak be self-hosted for deployed environments or remain local/prototype-only?
- Which provider should be compared after Keycloak: Cognito, Auth0/Okta, Firebase, or Supabase?
- What claims and roles should become the internal application authorization model?

## Follow-Up Work

- Define the auth-lab evaluation matrix.
- Decide whether the next implementation story uses local Spring Security auth or Keycloak-backed OIDC for the main app.
- Document claim/role mapping into a stable application principal.
- Create implementation stories only after the provider path is accepted.
