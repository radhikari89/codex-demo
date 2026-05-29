# ADR-0002: Authentication Strategy

Status: Accepted

Related story: [#38](https://github.com/radhikari89/codex-demo/issues/38)

Related discovery: [Authentication Strategy Discovery](../drafts/auth-strategy-discovery.md)

## Context

`webdevisfun.com` currently has a temporary authentication bridge:

- Angular stores mock auth state in `localStorage`.
- Login looks up a user by email.
- Signup sends a password-like value through `passwordHash`.
- The Spring Boot user service has user persistence but not a complete industry-standard authentication and authorization foundation.

The application is expected to grow into a hub of independently testable prototype areas. Future prototype areas may use shared identity, dedicated services, or external providers. The auth strategy therefore needs to support both the first main application auth flow and later provider experiments.

## Decision

Use **Auth0** as the first real login solution for the main web prototype hub.

The accepted implementation direction is:

- Angular SPA starts the Auth0 OIDC login flow.
- Auth0 authenticates the user and issues tokens.
- Angular calls secured backend APIs with a JWT access token.
- Spring Boot is configured as a Spring Security Resource Server.
- Spring Boot validates the JWT, maps trusted claims/roles, and protects REST APIs.
- Keep app-level profile/current-user APIs stable, for example `/api/v1/auth/me` or `/api/v1/users/me`.
- Do not use API versions such as `/api/v2` to represent different auth providers.
- Remove the temporary `passwordHash` bridge and do not build first-party password handling for the main hub login now.
- Keep Spring Security-owned auth, Keycloak, Cognito, Okta, Firebase, and Supabase in the Security/Auth Provider Lab as learning prototypes and comparisons.

Portfolio/resume wording may mention **Okta/Auth0 OIDC integration** because Auth0 is part of Okta, but the concrete provider selected for this app is Auth0.

## Options Considered

| Option | Current Position |
| --- | --- |
| Auth0 | Accepted main hub provider for hosted OIDC login and fast professional app-login experience. |
| Spring Security Resource Server | Accepted backend enforcement layer for JWT validation, route/API protection, and claim/role mapping. |
| Spring Security-owned email/password | Defer to Security/Auth Provider Lab; useful for learning mechanics but not the main hub default. |
| Spring Security OAuth2/OIDC with Google | Defer as a direct-provider learning path; Auth0 can broker social login first. |
| Keycloak | Keep as a strong local external IdP prototype and possible future shared identity provider. |
| AWS Cognito | Keep as AWS-native managed IdP comparison before production hardening. |
| Okta | Keep as enterprise identity comparison for workforce SSO, organization login, OIDC/SAML app integrations, and IAM policy learning. |
| Firebase Auth / Supabase Auth | Keep as app-builder auth comparison; less aligned with a Spring Boot-centered backend. |

## Consequences

- The main app should move directly to industry-standard hosted OIDC login instead of first building local password auth.
- The backend should act as a Resource Server, not as the credential owner for the first real hub login.
- Provider-specific behavior should live in Auth0 configuration, Spring Security configuration, claim mapping, and environment profiles.
- Future provider prototypes should live under the Security/Auth Provider Lab and use a shared evaluation matrix.
- The app should still keep stable internal user/profile concepts so Auth0 can be replaced later if needed.

## Open Questions

- What exact Auth0 tenant, application, audience, callback URL, logout URL, and allowed-origin configuration should be used for local and deployed environments?
- Should the Angular Auth0 integration keep tokens in memory only, use refresh token rotation, or use another Auth0-supported browser session strategy?
- Which Auth0 claims and roles should become the internal application authorization model?
- Should Keycloak be self-hosted later or remain local/prototype-only?
- Which provider should be compared after Auth0: Cognito, Keycloak, Okta, Firebase, or Supabase?

## Follow-Up Work

- Define Auth0 local and deployed configuration.
- Implement Angular Auth0 login/logout and route protection.
- Configure Spring Boot as a JWT Resource Server.
- Add `/me` or profile-sync behavior based on trusted Auth0 claims.
- Document claim/role mapping into a stable application principal.
- Define the auth-lab evaluation matrix for non-main-hub provider prototypes.
