# Auth0 OIDC Configuration

Status: Initial setup guide

Related decision: [ADR-0002 Authentication Strategy](../../decisions/ADR-0002-authentication-strategy.md)

Related story: [#59 Configure Auth0 tenant and OIDC application](https://github.com/radhikari89/codex-demo/issues/59)

## Purpose

Document the Auth0 tenant, Angular SPA application, API audience, callback/logout URLs, allowed origins, and environment variables needed for the main `webdevisfun.com` Auth0/OIDC login path.

Do not commit Auth0 secrets, management API tokens, private keys, or tenant admin credentials.

## Target Flow

```text
Angular SPA -> Auth0 Universal Login -> JWT access token -> Spring Boot Resource Server -> secured REST APIs
```

## Auth0 Tenant

Create or use one Auth0 tenant for the prototype hub.

Record these non-secret values in local environment files or deployment configuration.

Use environment-specific Auth0 values. Local, dev, test, and prod may share a tenant at first, but they should still have distinct application configuration values where needed. Production should be easy to separate later if stronger isolation is required.

| Environment | Auth0 Domain | Issuer URI | SPA Client ID | API Audience |
| --- | --- | --- | --- | --- |
| Local | `<local-auth0-domain>` | `https://<local-auth0-domain>/` | `<local-spa-client-id>` | `<local-api-audience>` |
| Dev | `<dev-auth0-domain>` | `https://<dev-auth0-domain>/` | `<dev-spa-client-id>` | `<dev-api-audience>` |
| Test | `<test-auth0-domain>` | `https://<test-auth0-domain>/` | `<test-spa-client-id>` | `<test-api-audience>` |
| Prod | `<prod-auth0-domain>` | `https://<prod-auth0-domain>/` | `<prod-spa-client-id>` | `https://webdevisfun.com/api` |

Used by:

- Angular: Auth0 domain, SPA client ID, API audience.
- Spring Boot: issuer URI and API audience.

The Auth0 client secret is not used by the Angular SPA. Do not put client secrets in browser code.

## Auth0 Application

Create an Auth0 application:

| Setting | Value |
| --- | --- |
| Application type | Single Page Application |
| Token endpoint authentication method | None |
| Grant type | Authorization Code with PKCE |
| Login experience | Universal Login |

Recommended URL settings:

| Auth0 Setting | Meaning | Example Pattern |
| --- | --- | --- |
| Allowed Callback URLs | Full URL Auth0 can redirect to after login | `<application-base-url><login-callback-route>` |
| Allowed Logout URLs | Full URL Auth0 can redirect to after logout | `<application-base-url>/` |
| Allowed Web Origins | Browser app origin allowed to start Auth0 web flows | `<application-base-url>` |
| Allowed Origins (CORS) | Browser app origin allowed to call Auth0 endpoints | `<application-base-url>` |

Environment origins:

| Environment | Application Base URL |
| --- | --- |
| Local | `<local-ui-origin>` |
| Dev | `<dev-ui-origin>` |
| Test | `<test-ui-origin>` |
| Prod | `https://webdevisfun.com` |

Examples:

- Local application base URL might be `http://localhost:4200`.
- Dev and test origins should use the actual deployed environment domains when they exist.
- Prod application base URL is `https://webdevisfun.com`.
- If `<application-base-url>` is `http://localhost:4200` and `<login-callback-route>` is `/callback`, the full callback URL is `http://localhost:4200/callback`.

If the Angular callback route changes from `/callback`, update Auth0 and the Angular route together for every environment.

## Auth0 API

Create an Auth0 API for the Spring Boot backend.

| Setting | Value |
| --- | --- |
| Name | `webdevisfun-api` |
| Identifier / Audience | `https://webdevisfun.com/api` |
| Signing algorithm | `RS256` |

The Spring Boot resource server should validate:

- issuer
- audience
- token expiration
- JWT signature through Auth0 JWKS

## Environment Variables

Angular runtime config:

The Angular app reads non-secret Auth0 values from `/app-config.json` before bootstrapping.

```json
{
  "auth0": {
    "domain": "<tenant-domain>",
    "clientId": "<spa-client-id>",
    "audience": "https://webdevisfun.com/api",
    "redirectUri": "<full-login-callback-url>",
    "logoutReturnTo": "<full-logout-return-url>"
  }
}
```

The committed `ui/public/app-config.json` is a safe placeholder. Each deployed environment should upload or replace that file with its own values. Do not put Auth0 client secrets in it.

Suggested Spring Boot variables:

```text
AUTH0_ISSUER_URI=https://<tenant-domain>/
AUTH0_AUDIENCE=https://webdevisfun.com/api
```

Each environment should provide its own full redirect and logout URLs.

## CloudFront / CORS Notes

- `/app-config.json` should be served from the UI origin and cached with `no-cache`.
- `/api/*` should route to the backend origin and must forward the `Authorization` header.
- Authenticated API responses should use disabled caching or a low/private cache policy.
- Auth0 Allowed Callback URLs should include each environment's `<application-base-url>/callback`.
- Auth0 Allowed Logout URLs, Allowed Web Origins, and Allowed Origins (CORS) should include each environment's `<application-base-url>`.

## Local Verification

- Auth0 login opens from the Angular app.
- Auth0 redirects back to the Angular callback route.
- Angular can request an access token for the configured API audience.
- Spring Boot rejects protected API calls without a token.
- Spring Boot accepts valid Auth0 JWT access tokens.

## Follow-Up Stories

- [#62 Integrate Angular SPA with Auth0 login](https://github.com/radhikari89/codex-demo/issues/62)
- [#61 Configure Spring Boot JWT resource server](https://github.com/radhikari89/codex-demo/issues/61)
- [#65 Document Auth0 deployment and CORS configuration](https://github.com/radhikari89/codex-demo/issues/65)
