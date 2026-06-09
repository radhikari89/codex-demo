# Auth And API Integration

Authentication is integrated through Auth0 for the Angular app. The backend user service remains the API/data service, and backend token enforcement is handled by the Spring Boot Resource Server story.

## Current Flow

- Angular loads `/app-config.json` before app bootstrap and uses those non-secret Auth0 values.
- Login and signup redirect to Auth0 Universal Login using Authorization Code with PKCE.
- Auth0 redirects back to `/callback`, then the app opens the dashboard.
- The Auth0 Angular SDK owns token handling and uses in-memory cache by default.
- The app auth service exposes the current Auth0 user profile through Angular signals.
- The dashboard guard waits for Auth0 loading to complete, then checks authenticated state.
- Logout redirects through Auth0 and returns the user to the app origin.

## API URL Strategy

API URLs in UI code should stay relative, such as `/api/v1/users`, so the app works under any deployed domain.

Local Angular development proxies `/api` to `http://localhost:8080` through `proxy.conf.json`. The local proxy is used only by `ng serve`; it is not bundled into production builds.

In remote environments, path-based infrastructure routing should send `/api/**` traffic to the backend and other paths to the UI.

## Auth0 Runtime Config

The UI reads Auth0 values from `/app-config.json`:

```json
{
  "auth0": {
    "domain": "<tenant-domain>",
    "clientId": "<spa-client-id>",
    "audience": "urn:webdevisfun:api",
    "redirectUri": "https://<domain>/callback",
    "logoutReturnTo": "https://<domain>"
  }
}
```

The API audience is environment runtime configuration. UI source code should not hardcode it, because local and prod may point at different Auth0 API identifiers over time.

Runtime config files:

- `ui/public/app-config.json` is the active file fetched by the running app.
- `ui/public/app-config.local.json` stores the local values.
- `ui/public/app-config.prod.json` stores the production values.

For local development, keep `app-config.json` aligned with `app-config.local.json`. For production deployment, publish the production values as `/app-config.json`.

The file is public and must contain only non-secret SPA values. Auth0 client secrets, management API tokens, and private keys do not belong in the UI.

## Backend Enforcement

The Spring Boot Resource Server validates Auth0 JWT access tokens for protected APIs. UI route protection is still only a browser-side convenience; backend APIs remain the real security boundary.

## Smoke Testing

Use [Auth0 Smoke Test Runbook](../../docs/architecture/knowledge/security-and-auth/auth0-smoke-test-runbook.md) for repeatable local and deployed checks.
