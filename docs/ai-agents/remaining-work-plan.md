# Remaining Work Plan

This plan is organized for AI-assisted delivery. Each phase should produce a working, testable application state before the next phase starts.

## Phase 1: Stabilize Authentication

Goal: replace the temporary email-only login bridge with real credential-based authentication.

Current state:

- Signup creates a user through `POST /api/v1/users`.
- Login finds a user by email through `GET /api/v1/users?email=...`.
- The UI stores a minimal local user object in `localStorage`.
- The backend stores a `passwordHash` value but does not hash or verify passwords yet.

Work:

- Add backend password hashing.
- Stop accepting raw `passwordHash` from the UI for user creation.
- Add a dedicated backend login endpoint.
- Return a minimal authenticated user response from login.
- Update Angular login to submit email and password.
- Keep API URLs relative, such as `/api/v1/auth/login`.
- Add backend tests for login success, invalid email, and invalid password.
- Add UI tests or focused service tests around auth behavior.
- Update `ui/documentation/auth-and-api-integration.md`.

Exit criteria:

- A new user can sign up with a password.
- That user can log in with the same password.
- Wrong credentials produce a clear UI error.
- No UI code sends or stores a raw `passwordHash`.

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
