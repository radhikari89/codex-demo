# Authentication Strategy Discovery

Status: Draft recommendation

Related story: [#38](https://github.com/radhikari89/codex-demo/issues/38)

## Purpose

Choose the first industry-standard authentication and authorization path for `webdevisfun.com` before replacing the temporary UI-to-userservice auth bridge.

The current application is an Angular UI hosted through CloudFront/S3, a Spring Boot `userservice`, PostgreSQL, and path-based `/api/*` routing. The UI currently stores mock auth state in `localStorage`, looks up users by email, and sends a password value through the `passwordHash` field during signup. That is useful as a starter bridge, but should not become the real auth model.

## Recommendation

Start with **Spring Security-owned email/password auth plus Spring Security OAuth2/OIDC readiness**, then add Google sign-in as the first social provider once the base auth contract is stable.

Also include **Keycloak as an early auth-lab prototype candidate**. Keycloak should not replace the first implementation path yet, but it is valuable to evaluate because it provides a realistic open-source identity provider with OIDC, roles, clients, realms, and Google identity brokering without immediately committing to a commercial managed provider.

Why this path:

- It teaches the core auth mechanics that the project is trying to learn: password hashing, credential verification, session/token behavior, route protection, authorization rules, and backend tests.
- It keeps the first implementation inside the existing Angular, Spring Boot, PostgreSQL, and CloudFront shape.
- It avoids committing too early to a managed identity provider before the app boundary model and future service split are approved.
- It leaves a clean path to Google sign-in through standard OAuth2/OIDC concepts instead of building a one-off social login path.

The first implementation should not expose `passwordHash` to the UI. The UI should send a password only to a dedicated signup/login contract over HTTPS, and the backend should hash and verify credentials server-side.

## Provider Options

| Option | Fit | Advantages | Tradeoffs | First-use Verdict |
| --- | --- | --- | --- | --- |
| Spring Security-owned email/password | Strong fit for learning and current repo | Full control, easy local development, direct backend tests, no extra provider account required | App owns password hardening, reset flow, lockout/rate limiting, CSRF/CORS choices, and ongoing security review | Recommended first base |
| Spring Security OAuth2/OIDC with Google | Strong fit after base auth contract | Uses standard OIDC concepts, supports Google/Gmail sign-in, keeps backend authorization central | Requires callback URLs, client secret handling, account linking, provider-specific local/deployed config | Recommended second step |
| Keycloak | Strong fit for auth learning and provider prototyping | Open-source IdP, runs locally with Docker, supports OIDC/SAML, realms, clients, roles, claims, and Google identity brokering | App team operates and secures it; production use adds upgrade, backup, availability, and admin-hardening responsibility | Prototype early in auth lab; do not make first production default yet |
| AWS Cognito User Pool | Good AWS-aligned managed option | Managed user pool, social federation support, JWTs, hosted UI option, AWS-native deployment story | Adds Cognito configuration, callback domain handling, token validation, and AWS-specific coupling | Evaluate before production hardening |
| Auth0 / Okta | Good managed IdP option | Mature hosted login, social connections, admin tooling, OIDC support | Vendor dependency, pricing/tenant management, local callback setup | Defer unless speed to managed auth outranks learning |
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
- Create isolated auth-lab prototypes for Spring Security-owned auth, Google OIDC, Keycloak, Cognito, Auth0/Okta, and Firebase/Supabase.
- Use the same evaluation checklist for each prototype: signup, signin, current-user lookup, logout, backend identity verification, roles/claims, local development, deployment impact, secret handling, and operational ownership.
- Treat Keycloak as the first external IdP prototype because it can run locally and exposes the core OIDC concepts that also apply to managed providers.
- Promote only one provider path into the main app after the prototype results are reviewed.

## Target First Implementation Shape

Recommended first contracts:

| Method | Path | Purpose | Notes |
| --- | --- | --- | --- |
| `POST` | `/api/v1/auth/signup` | Create account | Accepts name, email, password; backend hashes password. |
| `POST` | `/api/v1/auth/login` | Verify credentials | Accepts email, password; returns authenticated session or token shape. |
| `POST` | `/api/v1/auth/logout` | End session | Clears server/client auth state depending on chosen session model. |
| `GET` | `/api/v1/auth/me` | Get current user | Lets UI restore auth state without trusting `localStorage` as authority. |

Recommended first authorization rules:

| Area | Access |
| --- | --- |
| `/`, `/login`, `/signup` | Public |
| `/dashboard` and future app category routes | Signed-in users |
| Admin-only routes | Not implemented yet, but reserve role support |
| User management endpoints | Protected; no public list-all users endpoint in the final auth flow |

## Session Decision

Preferred first choice: **secure HTTP-only cookie session** for the browser app.

Rationale:

- The UI and API are intended to share one public domain through CloudFront path routing.
- HTTP-only cookies reduce token exposure to JavaScript compared with storing access tokens in `localStorage`.
- It keeps the Angular app simple: call relative `/api/*` endpoints and let the browser include session cookies.

Required design follow-up:

- Set `Secure`, `HttpOnly`, and appropriate `SameSite` attributes.
- Define CSRF handling for state-changing endpoints.
- Confirm CloudFront forwards required cookies/headers only to backend paths.
- Prevent caching of authenticated API responses.

JWT/provider-token validation may become useful later for dedicated services. For the first app-hub slice, avoid introducing a distributed token architecture before dedicated service boundaries exist.

## Impact By Repo Area

| Area | Expected Impact |
| --- | --- |
| `ui/src/app/auth/` | Replace mock local auth authority with calls to `/api/v1/auth/*`; keep Angular guard but base it on `/me` or authenticated state from backend. |
| `ui/src/app/pages/login-page/` | Submit email/password to login endpoint; add safe error states; later add Google sign-in entry. |
| `ui/src/app/pages/signup-page/` | Submit name/email/password to signup endpoint; stop sending `passwordHash`. |
| `services/userservice/` | Add Spring Security, auth controller/service, password hashing, current-user endpoint, protected routes, tests, and OpenAPI updates. |
| `database/postgres/` | Keep user profile table but migrate credential fields deliberately; consider role table/column and identity provider fields. |
| `devops/` | Document auth cookies/headers through CloudFront, HTTPS assumptions, environment variables, and deployed smoke tests. |
| `docs/architecture/c4/` | Update container and deployment views once the auth flow is approved. |

## Security Concerns

- Do not accept client-provided `passwordHash`.
- Hash passwords server-side with an accepted adaptive password hashing mechanism.
- Do not reveal whether a login failure was unknown email versus wrong password.
- Add rate limiting or lockout follow-up before exposing real public auth.
- Review CORS, CSRF, cookie attributes, CloudFront forwarding, and API cache behavior together.
- Keep secrets out of repo docs and shell history; provider client secrets belong in environment/config management.
- Remove or protect public user list/read endpoints before real auth is used.
- Seeded demo users and dummy password hashes must remain local/dev-only.

## Follow-Up Story Candidates

1. Backend: implement Spring Security auth contract.
2. UI: replace temporary auth bridge with `/api/v1/auth/*` integration.
3. Database: migrate user credentials and roles safely.
4. DevOps: document CloudFront cookie/header forwarding and auth deployment config.
5. QA: add local and deployed auth smoke tests.
6. Security: review password handling, session settings, CSRF/CORS, and public endpoint exposure.
7. Discovery: define auth-lab evaluation matrix and prototype boundaries.
8. Prototype: evaluate Google OIDC integration after base auth lands.
9. Prototype: evaluate Keycloak as a local open-source IdP and Google identity broker.
10. Prototype: compare Cognito, Auth0/Okta, and Firebase/Supabase against the same auth-lab checklist.

## Acceptance Check

- Compared Spring Security-owned auth, Google/OIDC path, Keycloak, AWS Cognito, Auth0/Okta, and Firebase/Supabase.
- Included Google/Gmail sign-in as the first social provider to evaluate after base auth.
- Included Keycloak as an early auth-lab prototype candidate for open-source OIDC learning.
- Identified UI, backend, database, deployment, local development, and architecture effects.
- Identified security review points.
- Recommended the first implementation path.
- Produced follow-up story candidates for specialist agents.
