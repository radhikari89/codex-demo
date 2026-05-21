# Starter Backlog

These are starter tasks for AI-assisted delivery. They are written to be assignable in small batches.

## TASK-001: Define Auth API Contract

Suggested agent: Product Analyst Agent or Backend Agent

Outcome:

- Document request and response shapes for signup and login.
- Decide whether authentication returns only a local session user or a token.
- Define failure responses for invalid credentials and duplicate users.

Acceptance criteria:

- Contract names exact endpoints, fields, and status codes.
- UI and backend agents can implement from the document without guessing.

## TASK-002: Implement Backend Password Hashing And Login

Suggested agent: Backend Agent

Outcome:

- Add password hashing.
- Add credential verification.
- Add login endpoint.
- Update create-user behavior so the UI no longer sends `passwordHash`.

Acceptance criteria:

- Backend tests cover valid login, unknown email, wrong password, duplicate email, and user creation.
- Existing user endpoints still behave intentionally.
- OpenAPI docs show the new auth endpoint.

## TASK-003: Update Angular Auth Flow

Suggested agent: UI Agent

Outcome:

- Update signup to send plain password to the agreed backend contract.
- Update login to submit email and password.
- Map backend errors to clear page-level messages.
- Keep local session storage behavior until token/session requirements are introduced.

Acceptance criteria:

- Login fails for wrong credentials.
- Signup followed by login works locally.
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
