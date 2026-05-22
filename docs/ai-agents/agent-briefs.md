# Agent Briefs

Use these briefs when assigning work to AI agents. Keep assignments narrow and require each agent to report changed files, commands run, and verification results.

## Orchestrator Agent

Use when a GitHub story needs more than one specialist agent or has unclear sequencing.

Responsibilities:

- Break a parent story into scoped agent tasks.
- Assign each task an owner, write scope, dependencies, and expected outputs.
- Decide which tasks can run in parallel.
- Track blockers and status labels.
- Prepare the final pull request summary and handoff context.

Output:

- task breakdown
- dependency order
- write-scope map
- blocker list
- final integration notes

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

## Solution Architect Agent

Use when work affects system shape, app boundaries, service boundaries, API contracts, data ownership, deployment topology, or reusable templates.

Responsibilities:

- Define application architecture and app boundaries.
- Decide when a feature should be UI-only, shared-backend, dedicated service, external linked app, or undecided.
- Maintain architecture and workflow diagrams.
- Define API, service, data, and integration contracts before implementation.
- Define when microservices are justified.
- Identify risks, tradeoffs, sequencing constraints, and cross-team dependencies.
- Coordinate with DevOps on deployment topology and with Product Analyst on feature scope.

Output:

- architecture decision notes
- updated diagrams or diagram tasks
- app boundary model updates
- API/service/data contract guidance
- risks and tradeoffs
- recommended implementation sequence

Verification:

- Architecture docs link to relevant stories and features.
- Diagrams match current repo and deployment reality.
- Decisions include reasoning and known tradeoffs.

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
- Keep backend calls in source code relative, for example `/api/v1/...`.
- For local integration testing, run the backend on `localhost:8080` and use the Angular dev proxy so relative `/api` calls reach the local service.
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

## Security Reviewer

Use when work touches authentication, authorization, secrets, IAM, personal data, dependency risk, or public exposure.

Responsibilities:

- Review data exposure and access rules.
- Review authentication and authorization changes.
- Check for secret handling and environment variable risks.
- Identify dependency, IAM, CORS, and deployment security concerns.
- Recommend blocking fixes or follow-up hardening work.

Output:

- security findings
- approval or requested changes
- risk notes
- follow-up security tasks

## Release Manager

Use when a completed story needs release notes, deployment sequencing, or rollback context.

Responsibilities:

- Summarize user-visible changes.
- Collect verification results from implementation and QA agents.
- Prepare deployment checklist and rollback notes when deployment is involved.
- Confirm linked stories and follow-up issues are documented.

Output:

- release notes
- deployment checklist
- rollback notes
- final handoff summary

## Coordination Rules

- All work starts from a GitHub story unless the user explicitly asks for exploratory local drafting first.
- Code and documentation changes are merged to `main` through pull requests.
- Agents do not push directly to `main`.
- One agent owns one task at a time.
- Multi-agent work is coordinated by an Orchestrator Agent before specialist implementation starts.
- Agents should avoid broad refactors unless the task explicitly calls for them.
- Backend and UI agents should agree on API request and response shapes before implementation. Mediate this through a story comment, issue checklist, or short contract document that names endpoints, methods, request fields, response fields, status codes, and error shapes before either side builds against it.
- QA should verify the integrated behavior after backend and UI changes land.
- Documentation changes are part of done, not an optional cleanup step.
