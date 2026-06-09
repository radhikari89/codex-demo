# Starter Backlog

These are starter tasks for AI-assisted delivery. They are written to be assignable in small batches.

## TASK-001: Define Auth0 API Contract

Suggested agent: Product Analyst Agent or Backend Agent

Outcome:

- Document current-user/profile response shapes for Auth0-backed login.
- Define how Angular obtains tokens and how Spring Boot validates them.
- Define failure responses for missing, invalid, or unauthorized tokens.

Acceptance criteria:

- Contract names exact endpoints, fields, and status codes.
- UI and backend agents can implement from the document without guessing.

## TASK-002: Implement Backend JWT Validation And Current User

Suggested agent: Backend Agent

Outcome:

- Configure Spring Security Resource Server JWT validation.
- Add current-user/profile endpoint from trusted Auth0 claims.
- Remove any backend behavior that accepts client-provided `passwordHash`.

Acceptance criteria:

- Backend tests cover valid token claims, missing token, invalid audience, and profile sync.
- Existing user endpoints still behave intentionally.
- OpenAPI docs show the current-user auth endpoint.

## TASK-003: Update Angular Auth0 Flow

Suggested agent: UI Agent

Outcome:

- Update signup and login pages to start Auth0 Universal Login.
- Attach access tokens to secured backend API calls.
- Map Auth0/config/backend errors to clear page-level messages.
- Keep token cache in memory unless the security tradeoff is explicitly accepted.

Acceptance criteria:

- Auth0 login redirects back to the app locally.
- Signup followed by `/api/v1/auth/me` works locally.
- No UI interface or request type includes `passwordHash`.

## TASK-004: Add Auth Flow Verification

Suggested agent: QA Agent

Outcome:

- Add or document repeatable local verification for auth.
- Run backend and UI tests.
- Record any gaps that need follow-up.

Acceptance criteria:

- Test results are recorded.
- Manual smoke path is documented.
- Bugs are filed as follow-up backlog items.

## TASK-005: Define Dashboard MVP

Suggested agent: Product Analyst Agent

Outcome:

- Define what the dashboard should show after login.
- Identify needed backend data.
- Decide whether the first version uses live backend data or a temporary UI-only model.

Acceptance criteria:

- Dashboard MVP has clear acceptance criteria.
- Data ownership is explicit.
- Follow-up implementation tasks are ready.

## TASK-006: Implement Dashboard MVP

Suggested agent: UI Agent with Backend Agent if API work is needed

Outcome:

- Replace placeholder dashboard content with the agreed MVP.
- Add loading, error, empty, and populated states.
- Add tests for route protection and rendering.

Acceptance criteria:

- Authenticated users see the dashboard.
- Unauthenticated users are redirected.
- The page remains usable on mobile and desktop.

## TASK-007: Standardize API Errors

Suggested agent: Backend Agent

Outcome:

- Confirm all API errors use a stable response shape.
- Add validation coverage for user and auth endpoints.
- Update docs for UI consumption.

Acceptance criteria:

- UI can consistently read a user-safe error message.
- Tests cover validation and not-found responses.

## TASK-008: Deployment Smoke Test Runbook

Suggested agent: DevOps Agent or QA Agent

Outcome:

- Create a concise smoke-test runbook for local and AWS environments.
- Include UI, API, health, Swagger, database, and CloudFront route checks.

Acceptance criteria:

- A new developer can follow the smoke test without extra context.
- The runbook points to existing deployment documents instead of duplicating them.
