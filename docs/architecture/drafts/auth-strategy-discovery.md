# Authentication Strategy Discovery

Status: Accepted direction captured in ADR-0002

Related story: [#38](https://github.com/radhikari89/codex-demo/issues/38)

Decision record: [ADR-0002 Authentication Strategy](../decisions/ADR-0002-authentication-strategy.md)

Knowledge notes: [Auth Provider Notes](../knowledge/security-and-auth/auth-provider-notes.md)

## Purpose

Choose the first industry-standard authentication and authorization path for `webdevisfun.com` before replacing the temporary UI-to-userservice auth bridge.

The current application is an Angular UI hosted through CloudFront/S3, a Spring Boot `userservice`, PostgreSQL, and path-based `/api/*` routing. The accepted target is Auth0-hosted login with the backend validating trusted JWTs and storing app-owned profile metadata separately from provider identity.

## Recommendation

Use **Auth0 OIDC** as the first real login solution for the main web prototype hub.

Implementation shape:

- Angular SPA starts Auth0 login.
- Auth0 authenticates the user and issues tokens.
- Angular calls secured backend APIs with a JWT access token.
- Spring Boot uses Spring Security Resource Server support to validate JWTs and protect REST APIs.
- The backend maps trusted Auth0 claims/roles into the application's internal authorization model.

Also include **Keycloak as an early auth-lab prototype candidate**. Keycloak should not replace the Auth0 implementation path now, but it is valuable to evaluate because it provides a realistic open-source identity provider with OIDC, roles, clients, realms, and Google identity brokering without immediately committing to operating an identity provider.

Why this path:

- It gives the main hub a professional hosted login flow quickly.
- It demonstrates industry-standard OIDC/OAuth2 integration with a real external provider.
- It keeps Spring Boot responsible for API enforcement without making it own password storage.
- It supports portfolio/resume framing as an Okta/Auth0 OIDC integration.
- It still leaves room to learn Spring Security-owned auth, Keycloak, Cognito, Okta, Firebase, and Supabase through isolated Security Prototypes.

The first implementation should not expose `passwordHash` to the UI. The main hub should not send raw passwords to the backend for first-party verification now. Auth0 should own the hosted login flow, and the backend should validate trusted tokens.

## Provider Options

| Option | Fit | Advantages | Tradeoffs | First-use Verdict |
| --- | --- | --- | --- | --- |
| Auth0 | Strong fit for main hub login now | Hosted OIDC login, social login support, professional developer experience, good portfolio signal | Vendor dependency, tenant/config management, callback/logout URL setup, token validation details | Accepted first main hub provider |
| Spring Security Resource Server | Strong fit for backend API enforcement | Standard JWT validation, route/API protection, claim/role mapping, Spring Boot alignment | Requires issuer/audience configuration and authorization tests | Accepted backend enforcement layer |
| Spring Security-owned email/password | Strong fit for learning mechanics | Full control, easy local development, direct backend tests, no extra provider account required | App owns password hardening, reset flow, lockout/rate limiting, CSRF/CORS choices, and ongoing security review | Prototype later in Security Lab |
| Spring Security OAuth2/OIDC with Google | Useful direct-provider learning path | Uses standard OIDC concepts, supports Google/Gmail sign-in, keeps backend authorization central | Requires callback URLs, client secret handling, account linking, provider-specific local/deployed config | Defer; Auth0 can broker social login first |
| Keycloak | Strong fit for auth learning and provider prototyping | Open-source IdP, runs locally with Docker, supports OIDC/SAML, realms, clients, roles, claims, and Google identity brokering | App team operates and secures it; production use adds upgrade, backup, availability, and admin-hardening responsibility | Prototype early in auth lab; do not make first production default yet |
| AWS Cognito User Pool | Good AWS-aligned managed option | Managed user pool, social federation support, JWTs, hosted UI option, AWS-native deployment story | Adds Cognito configuration, callback domain handling, token validation, and AWS-specific coupling | Evaluate before production hardening |
| Okta | Good enterprise identity option | Strong workforce SSO, organization login, OIDC/SAML app integrations, policy administration, and enterprise IAM learning value | More enterprise-oriented; likely heavier and less cost-focused for the first public prototype hub login | Prototype in auth lab for enterprise IAM/SSO learning |
| Firebase Auth / Supabase Auth | Fast app-builder option | Quick email/social login and client SDKs | Less aligned with Spring Boot as the backend authority; backend token verification and profile ownership need design | Defer for this repo shape |

References for follow-up evaluation:

- Spring Security OAuth2 reference: https://docs.spring.io/spring-security/reference/servlet/oauth2/
- Keycloak server administration guide: https://www.keycloak.org/docs/latest/server_admin/
- Amazon Cognito third-party identity providers: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-identity-federation.html
- Auth0 Google social connection docs: https://auth0.com/docs/authenticate/identity-providers/social-identity-providers/google
- Firebase web Google sign-in docs: https://firebase.google.com/docs/auth/web/google-signin

## Auth Lab Prototype Approach

The project can still learn from every provider option without mixing all of them into the main application auth flow.

Recommended approach:

- Keep the real app on one approved production path.
- Create isolated auth-lab prototypes for Spring Security-owned auth, Google OIDC, Keycloak, Cognito, Auth0, Okta, and Firebase/Supabase.
- Use the same evaluation checklist for each prototype: signup, signin, current-user lookup, logout, backend identity verification, roles/claims, local development, deployment impact, secret handling, and operational ownership.
- Treat Keycloak as the first external IdP prototype because it can run locally and exposes the core OIDC concepts that also apply to managed providers.
- Promote only one provider path into the main app after the prototype results are reviewed.

## Target First Implementation Shape

Recommended first contracts:

| Method | Path | Purpose | Notes |
| --- | --- | --- | --- |
| `GET` | `/api/v1/auth/me` or `/api/v1/users/me` | Get current user/profile | Backend derives identity from validated Auth0 JWT claims. |
| `POST` | `/api/v1/auth/logout` | Optional app logout helper | Only needed if backend participates in logout; Auth0/browser logout may be frontend-driven. |
| `POST` | `/api/v1/users/profile-sync` | Optional profile sync | Creates/updates local profile metadata from trusted Auth0 identity claims. |

Recommended first authorization rules:

| Area | Access |
| --- | --- |
| `/`, `/login`, `/signup` | Public |
| `/dashboard` and future app category routes | Signed-in users |
| Admin-only routes | Not implemented yet, but reserve role support |
| User management endpoints | Protected; no public list-all users endpoint in the final auth flow |

## Browser Auth Decision

Preferred first choice: **Auth0 OIDC Authorization Code Flow with PKCE for the Angular SPA, plus JWT bearer access tokens for Spring Boot APIs**.

Rationale:

- This is the standard browser-app flow for hosted OIDC providers such as Auth0.
- It avoids building first-party credential handling before the app needs it.
- It lets Spring Boot validate JWT access tokens as a Resource Server.
- It aligns with the portfolio goal: Angular SPA to Auth0 login to Spring Boot secured APIs.

Required design follow-up:

- Configure Auth0 application, API audience, callback URLs, logout URLs, and allowed origins for local and deployed environments.
- Decide Auth0 SPA SDK token cache/session settings; avoid storing tokens in `localStorage` unless intentionally accepted.
- Configure Spring Security issuer URI, audience validation, CORS, and authorization rules.
- Prevent caching of authenticated API responses.

HTTP-only cookie sessions may still be worth evaluating later, especially for backend-for-frontend patterns, but they are not the first main hub implementation path now.

## Impact By Repo Area

| Area | Expected Impact |
| --- | --- |
| `ui/src/app/auth/` | Replace mock local auth authority with Auth0 SPA integration and route guards. |
| `ui/src/app/pages/login-page/` | Start Auth0 login; show safe loading/error states. |
| `ui/src/app/pages/signup-page/` | Start Auth0 signup or hosted universal login signup; stop sending `passwordHash`. |
| `services/userservice/` | Configure Spring Security Resource Server, JWT validation, current-user/profile endpoint, protected routes, tests, and OpenAPI updates. |
| `database/postgres/` | Keep local user profile data only as needed; store provider subject/issuer/email metadata, not passwords. |
| `devops/` | Document Auth0 config, environment variables, CORS, HTTPS assumptions, and deployed smoke tests. |
| `docs/architecture/c4/` | Update container and deployment views once the auth flow is approved. |

## Security Concerns

- Do not accept client-provided `passwordHash`.
- Do not store first-party passwords for the main hub Auth0 implementation.
- Validate JWT issuer, audience, expiration, and signature.
- Map only trusted claims into application roles/permissions.
- Review CORS, token handling, CloudFront forwarding, and API cache behavior together.
- Keep secrets out of repo docs and shell history; provider client secrets belong in environment/config management.
- Remove or protect public user list/read endpoints before real auth is used.
- Demo users must remain profile/demo data only; the main app must not seed or rely on password-like credential data.

## Follow-Up Story Candidates

1. UI: implement Auth0 SPA login/logout and route protection.
2. Backend: configure Spring Security Resource Server JWT validation.
3. Backend/API: implement current-user/profile endpoint from trusted Auth0 claims.
4. Database: migrate away from local password fields; store provider identity/profile metadata only as needed.
5. DevOps: document Auth0 local/deployed configuration, CORS, HTTPS, and secret handling.
6. QA: add local and deployed auth smoke tests.
7. Security: review token handling, CORS, claim mapping, and public endpoint exposure.
8. Discovery: define auth-lab evaluation matrix and prototype boundaries.
9. Prototype: evaluate Keycloak as a local open-source IdP and Google identity broker.
10. Prototype: compare Cognito, Okta, Firebase/Supabase, and Spring Security-owned auth against the same auth-lab checklist.

## Acceptance Check

- Compared Spring Security-owned auth, Google/OIDC path, Keycloak, AWS Cognito, Auth0, Okta, and Firebase/Supabase.
- Accepted Auth0 as the first main hub OIDC provider.
- Included Keycloak as an early auth-lab prototype candidate for open-source OIDC learning.
- Identified UI, backend, database, deployment, local development, and architecture effects.
- Identified security review points.
- Recommended the first implementation path.
- Produced follow-up story candidates for specialist agents.
