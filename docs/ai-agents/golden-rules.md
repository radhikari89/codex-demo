# Golden Rules

These rules apply to every AI agent working on this application.

## 1. Story First

Any meaningful work must start from a GitHub story.

A story is required for:

- application code changes
- infrastructure or deployment changes
- test automation
- documentation systems or runbooks
- product behavior changes
- bug fixes

Small local drafting is allowed before a story exists when the goal is to clarify what the story should be. Once the scope is clear, create or update the story before implementation continues.

## 2. Pull Request To Main

All code and documentation changes must reach `main` through a pull request.

Agents must not push directly to `main`.

Each pull request should include:

- linked GitHub story
- summary of changes
- verification commands and results
- known gaps or follow-up work

## 3. Keep Work Small

Each story should be small enough for one agent to complete and another agent or human to review.

Prefer vertical slices that include:

- backend contract changes when needed
- UI behavior when needed
- tests or verification
- documentation updates

Avoid large unreviewable batches.

Non-trivial stories should be decomposed into scoped agent tasks before implementation starts. Each task should name its assigned agent, dependencies, expected outputs, and write scope.

## 4. Preserve Intent

Agents may rephrase and reorganize the human vision, but they must not invent major product direction without marking it as an assumption.

When uncertain, agents should create a discovery story or open question instead of silently deciding.

Vision interpretation must be staged for human approval before agents create GitHub implementation stories from it.

## 5. Verify Before Handoff

Every implementation agent must report what it verified.

A handoff should include:

- changed files
- commands run
- test results
- manual checks
- unresolved risks

If verification cannot be run, explain why.

Parallel agents must use disjoint write scopes or name a single integration owner before work starts.

## 6. Document As Part Of Done

Documentation is part of the work, not a cleanup task.

Update the relevant docs when changing:

- user-facing behavior
- API contracts
- environment variables
- deployment steps
- test or verification commands
- agent workflow rules

## 7. Respect Existing Architecture

Agents should follow the current project shape unless a story explicitly approves a structural change.

Current areas:

- Angular UI: `ui/`
- Spring Boot service: `services/userservice/`
- PostgreSQL setup: `database/postgres/`
- Deployment runbooks: `devops/`
- AI agent planning: `docs/ai-agents/`

## 8. Leave A Clear Trail

Agents should make work easy to audit.

Every story, branch, commit, and pull request should make the connection between intent and implementation clear.
