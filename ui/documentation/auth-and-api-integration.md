# Auth And API Integration

Authentication is integrated through Auth0 for the Angular app. The backend user service remains the API/data service, and backend token enforcement is handled by the Spring Boot Resource Server story.

## Current Flow

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

## Current Backend Limitation

The backend does not yet validate Auth0 JWT access tokens. Until the Spring Boot Resource Server story is complete, UI route protection is only a browser-side convenience.

Protected backend APIs should require valid Auth0 access tokens before auth is considered end-to-end secure.
