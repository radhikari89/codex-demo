# Remaining Work Plan

This plan is organized for AI-assisted delivery. Each phase should produce a working, testable application state before the next phase starts.

## Phase 1: Stabilize Authentication

Goal: replace the temporary email-only login bridge with Auth0-hosted OIDC login and backend JWT validation.

Current state:

- Auth0 is the accepted main hub login provider.
- The UI starts login/signup through Auth0.
- The backend validates JWT access tokens and syncs current-user profile data from trusted Auth0 claims.
- The legacy `users` CRUD table is demo/profile data only, not an authentication or credential store.

Work:

- Remove remaining password-hash bridge behavior.
- Keep API URLs relative, such as `/api/v1/auth/me`.
- Add Auth0 local/deployed smoke tests.
- Add UI tests or focused service tests around Auth0 route and service behavior.
- Update `ui/documentation/auth-and-api-integration.md`.

Exit criteria:

- A new user can sign up through Auth0.
- That user can return to the app and call `/api/v1/auth/me`.
- Token/config failures produce clear UI or runbook guidance.
- No UI or backend production auth path sends, stores, or relies on `passwordHash`.

## Phase 2: Build The First Useful Dashboard Slice

Goal: make the authenticated dashboard useful rather than a placeholder.

Work:

- Define the first dashboard data model.
- Add backend endpoint or mock-safe service boundary for dashboard data.
- Add loading, empty, error, and populated UI states.
- Add route guard coverage and dashboard rendering tests.
- Document the dashboard contract.

Exit criteria:

- Authenticated users see useful personalized content.
- Unauthenticated users are redirected to login.
- Dashboard states are testable without a deployed backend.

## Phase 3: Harden API Contracts And Validation

Goal: make backend behavior predictable for UI and deployment work.

Work:

- Standardize API error response shapes.
- Confirm validation messages for user creation and login.
- Add integration tests for user endpoints.
- Review OpenAPI docs for accuracy.
- Add service-level test coverage around duplicate users and not-found behavior.

Exit criteria:

- The UI can rely on stable error response fields.
- Swagger/OpenAPI describes implemented behavior.
- Backend tests cover expected user and auth failures.

## Phase 4: Improve UI Structure

Goal: prepare the Angular app for more feature areas without overbuilding.

Work:

- Extract shared form controls, buttons, and auth page layout where duplication is meaningful.
- Add route-level lazy loading once feature folders grow.
- Keep visual design consistent with the existing home, auth, and dashboard pages.
- Expand tests for forms, route guards, and auth service behavior.

Exit criteria:

- Shared UI pieces reduce duplication without obscuring simple pages.
- New pages have a clear place to live.
- Tests protect the main auth and dashboard flows.

## Phase 5: Deployment Verification

Goal: make local and AWS verification repeatable.

Work:

- Add a local end-to-end verification checklist.
- Confirm production UI build uses only relative API paths.
- Verify CloudFront `/api/*` routing reaches the backend.
- Record smoke-test commands for UI, backend, database, and deployment.
- Keep runbooks in `devops/` aligned with application behavior.

Exit criteria:

- A fresh developer can run and verify the app locally.
- A deployment can be smoke-tested from documented commands.
- Known environment values and placeholders are clear.
