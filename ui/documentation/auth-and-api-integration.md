# Auth And API Integration

Authentication is integrated with the backend user service as a temporary bridge.

## Current Flow

- Login looks up an existing backend user by email through the relative endpoint `GET /api/v1/users?email=...`.
- Signup creates a backend user through the relative endpoint `POST /api/v1/users`.
- Successful login or signup stores the user session in `localStorage`.
- The auth service exposes the current user through Angular signals.
- The dashboard guard checks whether a user is logged in before allowing access.
- Logout clears local auth state and returns the user to the home page.

## API URL Strategy

API URLs in UI code should stay relative, such as `/api/v1/users`, so the app works under any deployed domain.

Local Angular development proxies `/api` to `http://localhost:8080` through `proxy.conf.json`. The local proxy is used only by `ng serve`; it is not bundled into production builds.

In remote environments, path-based infrastructure routing should send `/api/**` traffic to the backend and other paths to the UI.

## Current Backend Limitation

The current backend stores a `passwordHash` field but does not expose a real login/password verification endpoint yet.

This should later be replaced with a dedicated backend authentication endpoint that verifies credentials and returns a real session or token.
