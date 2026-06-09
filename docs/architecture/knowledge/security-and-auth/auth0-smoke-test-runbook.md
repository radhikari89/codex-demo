# Auth0 Smoke Test Runbook

Related story: [#64](https://github.com/radhikari89/codex-demo/issues/64)

Use this checklist to verify the Auth0 login path, protected Angular routes, and Spring Boot Resource Server enforcement.

## Local Setup

1. Confirm Auth0 dashboard settings match [Auth0 OIDC Configuration](auth0-oidc-configuration.md).
2. Confirm `ui/public/app-config.json` matches the local Auth0 SPA values.
3. Start the local stack:

```powershell
.\scripts\start-local-auth0-smoke.ps1 -OpenBrowser
```

This starts Docker PostgreSQL, Spring Boot, and Angular.

## Local Browser Smoke Test

1. Open `http://localhost:4200/dashboard` in a fresh browser session.
2. Confirm the app redirects unauthenticated users to `/login`.
3. Click **Continue with Auth0** and complete login.
4. Confirm Auth0 returns to `http://localhost:4200/callback`.
5. Confirm the app opens `/dashboard`.
6. Confirm the dashboard shows signed-in user/profile data from `/api/v1/auth/me`.
7. Click logout.
8. Confirm Auth0 returns to `http://localhost:4200` and `/dashboard` is protected again.

## Local API Smoke Test

Run the anonymous and invalid-token checks:

```powershell
.\scripts\test-auth0-api-smoke.ps1
```

Expected results:

- `GET /actuator/health` returns `200`.
- `GET /api/v1/auth/me` without a token returns `401`.
- `GET /api/v1/auth/me` with an invalid bearer token returns `401`.

If you have a real Auth0 API access token for audience `urn:webdevisfun:api`, run:

```powershell
.\scripts\test-auth0-api-smoke.ps1 -AccessToken "<auth0-access-token>"
```

Expected result:

- `GET /api/v1/auth/me` with the valid token returns `200` and profile JSON.

## Automated Backend Verification

Run:

```powershell
cd services\userservice
mvn "-Djavax.net.ssl.trustStoreType=Windows-ROOT" test
```

Current automated coverage includes:

- Public health and Swagger routes remain reachable.
- Protected API routes reject missing tokens.
- Protected API routes reject invalid tokens.
- Protected API routes accept valid decoded JWTs.
- `/api/v1/auth/me` syncs one local profile per Auth0 issuer and subject.

## Deployed Smoke Test

Use the production URL values from the Auth0 dashboard and deployment config.

1. Open `https://webdevisfun.com/dashboard`.
2. Confirm unauthenticated users are routed to login.
3. Complete Auth0 login.
4. Confirm the callback returns to `https://webdevisfun.com/callback`.
5. Confirm `/dashboard` loads signed-in user/profile data.
6. Confirm logout returns to `https://webdevisfun.com`.
7. Run API checks against the deployed backend URL if it is directly reachable:

```powershell
.\scripts\test-auth0-api-smoke.ps1 -BaseUrl "https://webdevisfun.com"
```

## Residual Security Review Items

- Manual browser login still depends on the owner-managed Auth0 tenant and test account.
- A valid-token smoke test requires a real Auth0 API access token; do not paste tokens into committed files.
- Review Auth0 Allowed Callback URLs, Allowed Logout URLs, Allowed Web Origins, and CORS origins before each environment is considered production-ready.
- Confirm CloudFront or deployed routing does not cache authenticated API responses.
- Review future roles/permissions mapping before adding admin-only features.
