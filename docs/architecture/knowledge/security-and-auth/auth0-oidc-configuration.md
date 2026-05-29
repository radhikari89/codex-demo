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

Record these non-secret values in local environment files or deployment configuration:

| Value | Example | Used By |
| --- | --- | --- |
| Auth0 domain | `dev-example.us.auth0.com` | Angular, Spring Boot |
| Issuer URI | `https://dev-example.us.auth0.com/` | Spring Boot |
| SPA client ID | Auth0-generated public client id | Angular |
| API audience | `https://webdevisfun.com/api` | Angular, Spring Boot |

The Auth0 client secret is not used by the Angular SPA. Do not put client secrets in browser code.

## Auth0 Application

Create an Auth0 application:

| Setting | Value |
| --- | --- |
| Application type | Single Page Application |
| Token endpoint authentication method | None |
| Grant type | Authorization Code with PKCE |
| Login experience | Universal Login |

Recommended local URLs:

| Auth0 Setting | Local Value |
| --- | --- |
| Allowed Callback URLs | `http://localhost:4200/callback` |
| Allowed Logout URLs | `http://localhost:4200/` |
| Allowed Web Origins | `http://localhost:4200` |
| Allowed Origins (CORS) | `http://localhost:4200` |

Recommended deployed URLs:

| Auth0 Setting | Deployed Value |
| --- | --- |
| Allowed Callback URLs | `https://webdevisfun.com/callback` |
| Allowed Logout URLs | `https://webdevisfun.com/` |
| Allowed Web Origins | `https://webdevisfun.com` |
| Allowed Origins (CORS) | `https://webdevisfun.com` |

If the Angular callback route changes, update Auth0 and the Angular route together.

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

Suggested Angular variables:

```text
AUTH0_DOMAIN=<tenant-domain>
AUTH0_CLIENT_ID=<spa-client-id>
AUTH0_AUDIENCE=https://webdevisfun.com/api
AUTH0_REDIRECT_URI=http://localhost:4200/callback
AUTH0_LOGOUT_RETURN_TO=http://localhost:4200/
```

Suggested Spring Boot variables:

```text
AUTH0_ISSUER_URI=https://<tenant-domain>/
AUTH0_AUDIENCE=https://webdevisfun.com/api
```

Deployment values should use the deployed URLs for redirect/logout settings.

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
