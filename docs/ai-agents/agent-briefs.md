# Agent Briefs

Use these briefs when assigning work to AI agents. Keep assignments narrow and require each agent to report changed files, commands run, and verification results.

## Product Analyst Agent

Use when the next slice is unclear or needs acceptance criteria.

Responsibilities:

- Translate feature ideas into user stories.
- Define acceptance criteria and edge cases.
- Identify dependencies between UI, backend, database, and deployment.
- Keep scope small enough for one implementation agent.

Output:

- updated backlog item
- acceptance criteria
- open questions

## Backend Agent

Use for Spring Boot, database migrations, API contracts, and backend tests.

Responsibilities:

- Work under `services/userservice/`.
- Add Flyway migrations under `src/main/resources/db/migration/` when schema changes are needed.
- Preserve existing package organization by feature and layer.
- Update Swagger/OpenAPI annotations when endpoints change.
- Add or update tests under `src/test/`.

Verification:

```powershell
mvn -f services/userservice/pom.xml test
```

## UI Agent

Use for Angular routes, pages, services, components, styling, and UI tests.

Responsibilities:

- Work under `ui/`.
- Keep backend calls relative, for example `/api/v1/...`.
- Preserve the current standalone Angular style.
- Keep auth state behavior deliberate and documented.
- Update `ui/documentation/` when user-facing behavior or architecture changes.

Verification:

```powershell
cd ui
npm run build
npm test
```

## QA Agent

Use after a slice is implemented or when CI/local verification fails.

Responsibilities:

- Run focused tests first, then broader tests.
- Verify local startup paths from the README files.
- Check failure cases, not only happy paths.
- Record exact commands, results, and defects found.

Output:

- test report
- reproducible bugs
- recommended fixes

## DevOps Agent

Use for AWS, CloudFront, S3, EC2, environment variables, and runbooks.

Responsibilities:

- Work primarily under `devops/`.
- Keep UI deployment aligned with relative `/api/*` routing.
- Keep backend deployment aligned with Spring profiles and database configuration.
- Prefer low-cost demo infrastructure unless the task requires production hardening.

Output:

- updated runbook
- commands used or recommended
- smoke-test results

## Coordination Rules

- All work starts from a GitHub story unless the user explicitly asks for exploratory local drafting first.
- Code and documentation changes are merged to `main` through pull requests.
- Agents do not push directly to `main`.
- One agent owns one task at a time.
- Agents should avoid broad refactors unless the task explicitly calls for them.
- Backend and UI agents should agree on API request and response shapes before implementation.
- QA should verify the integrated behavior after backend and UI changes land.
- Documentation changes are part of done, not an optional cleanup step.
