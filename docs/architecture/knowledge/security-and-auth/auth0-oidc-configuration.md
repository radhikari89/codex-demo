# Auth0 OIDC Configuration

Status: Dashboard setup in progress

Related decision: [ADR-0002 Authentication Strategy](../../decisions/ADR-0002-authentication-strategy.md)

Related stories:

- [#59 Configure Auth0 tenant and OIDC application](https://github.com/radhikari89/codex-demo/issues/59)
- [#71 Configure Auth0 tenant, SPA app, and API in Auth0 dashboard](https://github.com/radhikari89/codex-demo/issues/71)

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

Use environment-specific Auth0 values. This project currently tracks only local and prod app configuration. They may share a tenant at first, but they should still have distinct application configuration values where needed. Production should be easy to separate later if stronger isolation is required.

| Environment | Auth0 Domain | Issuer URI | SPA Client ID | API Audience |
| --- | --- | --- | --- | --- |
| Local | `<local-auth0-domain>` | `https://<local-auth0-domain>/` | `<local-spa-client-id>` | `urn:webdevisfun:api` |
| Prod | `<prod-auth0-domain>` | `https://<prod-auth0-domain>/` | `<prod-spa-client-id>` | `urn:webdevisfun:api` |

Used by:

- Angular: Auth0 domain, SPA client ID, API audience.
- Spring Boot: issuer URI and API audience.

The Auth0 client secret is not used by the Angular SPA. Do not put client secrets in browser code.

## Auth0 Dashboard Steps For Owner

These steps must be done by the Auth0 account owner in the Auth0 dashboard.

### 1. Create or Select Tenant

1. Sign in to the Auth0 dashboard.
2. Create or select the tenant for the prototype hub.
3. Record the tenant domain shown in the dashboard, such as `<tenant-region>.auth0.com`.
4. Use this domain to derive the issuer URI: `https://<tenant-region>.auth0.com/`.

Keep:

- Auth0 domain
- Issuer URI

Do not record or share tenant admin credentials.

### 2. Create SPA Application

1. Go to Applications > Applications.
2. Select Create Application.
3. Name it `webdevisfun-spa`.
4. Choose Single Page Web Applications.
5. Create the application.
6. Open the application Settings tab.
7. Confirm Token Endpoint Authentication Method is None.
8. Record the Client ID.

Keep:

- SPA client ID

Do not use the SPA client secret. Browser applications must not store client secrets.

### 3. Configure SPA URLs

In the `webdevisfun-spa` application Settings tab, set these values.

| Auth0 Setting | Local Value | Production Value |
| --- | --- | --- |
| Allowed Callback URLs | `http://localhost:4200/callback` | `https://webdevisfun.com/callback` |
| Allowed Logout URLs | `http://localhost:4200` | `https://webdevisfun.com` |
| Allowed Web Origins | `http://localhost:4200` | `https://webdevisfun.com` |
| Allowed Origins (CORS) | `http://localhost:4200` | `https://webdevisfun.com` |

If another deployed environment is added later, add its real UI origin to the same fields. Example: an environment origin would produce a callback URL like `<environment-ui-origin>/callback`.

Save changes before leaving the page.

### 4. Create Backend API

1. Go to Applications > APIs.
2. Select Create API.
3. Name it `webdevisfun-api`.
4. Set Identifier to `urn:webdevisfun:api`.
5. Set Signing Algorithm to RS256.
6. Create the API.

Keep:

- API audience: `urn:webdevisfun:api`

### 5. Confirm API Token Settings

1. Open Applications > APIs > `webdevisfun-api`.
2. Confirm the identifier is exactly `urn:webdevisfun:api`.
3. Confirm the signing algorithm is RS256.
4. Leave token signing keys managed by Auth0.

### 6. Configure Local Runtime Values

For local Angular testing, update the local runtime config with non-secret values.

```json
{
  "auth0": {
    "domain": "<tenant-region>.auth0.com",
    "clientId": "<spa-client-id>",
    "audience": "urn:webdevisfun:api",
    "redirectUri": "http://localhost:4200/callback",
    "logoutReturnTo": "http://localhost:4200"
  }
}
```

For local Spring Boot testing, provide:

```text
AUTH0_ISSUER_URI=https://<tenant-region>.auth0.com/
AUTH0_AUDIENCE=urn:webdevisfun:api
```

### 7. Owner Checklist

- Auth0 tenant exists.
- `webdevisfun-spa` SPA application exists.
- SPA callback, logout, web origin, and CORS URLs include local and production values.
- `webdevisfun-api` API exists.
- API identifier is `urn:webdevisfun:api`.
- API signing algorithm is RS256.
- Auth0 domain, issuer URI, SPA client ID, and API audience are captured.
- No client secret, management token, private key, or admin credential is committed.

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
| Prod | `https://webdevisfun.com` |

Examples:

- Local application base URL might be `http://localhost:4200`.
- Prod application base URL is `https://webdevisfun.com`.
- If `<application-base-url>` is `http://localhost:4200` and `<login-callback-route>` is `/callback`, the full callback URL is `http://localhost:4200/callback`.

If the Angular callback route changes from `/callback`, update Auth0 and the Angular route together for every environment.

## Auth0 API

Create an Auth0 API for the Spring Boot backend.

| Setting | Value |
| --- | --- |
| Name | `webdevisfun-api` |
| Identifier / Audience | `urn:webdevisfun:api` |
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
    "audience": "urn:webdevisfun:api",
    "redirectUri": "<full-login-callback-url>",
    "logoutReturnTo": "<full-logout-return-url>"
  }
}
```

The active runtime file is `ui/public/app-config.json`. Keep the local and prod source configs in the same public folder:

- `ui/public/app-config.local.json`
- `ui/public/app-config.prod.json`

For local development, `ui/public/app-config.json` should match `ui/public/app-config.local.json`. Production deployment should upload or replace `/app-config.json` with the production values from `ui/public/app-config.prod.json`. Do not put Auth0 client secrets in any of these files.

Angular should keep the Auth0 SDK token cache in memory:

```ts
cacheLocation: 'memory'
```

This is more secure than `localstorage` because access tokens are not persisted in browser storage. If the app ever has an XSS vulnerability, tokens in local storage are easier for injected JavaScript to read and reuse. Memory caching still allows the active page session to call APIs, but the token cache is cleared when the tab reloads or closes. Auth0 may restore the user session through its own secure login session, but the SPA should not persist API tokens unless there is a strong product reason and the security tradeoff is accepted.

Suggested Spring Boot variables:

```text
AUTH0_ISSUER_URI=https://<tenant-domain>/
AUTH0_AUDIENCE=urn:webdevisfun:api
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
