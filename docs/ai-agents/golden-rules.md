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

## 2. Project And Branch First

Before editing files for a non-trivial story, agents must make the work visible and traceable:

- Confirm the GitHub story exists.
- Confirm the story has a `Parent Epic` section unless the issue itself is an epic.
- Confirm the story is in GitHub Project 1.
- Set the Project Status to `In Progress`.
- Create or switch to a branch that follows [Branch Naming](branch-naming.md).
- Add an issue comment naming the active agent, Project Status, branch, and scope.

If the work is blocked before edits begin, set the Project Status to `Blocked` when that project option exists, add `status:blocked`, and comment with the blocking question.

## 3. Pull Request To Main

All code and documentation changes must reach `main` through a pull request.

Agents must not push directly to `main`.

Each pull request should include:

- linked GitHub story
- summary of changes
- verification commands and results
- known gaps or follow-up work

When a pull request is ready for owner or reviewer attention, agents should set the Project Status to `Review`.

## 4. Keep Work Small

Each story should be small enough for one agent to complete and another agent or human to review.

Prefer vertical slices that include:

- backend contract changes when needed
- UI behavior when needed
- tests or verification
- documentation updates

Avoid large unreviewable batches.

Non-trivial stories should be decomposed into scoped agent tasks before implementation starts. Each task should name its assigned agent, dependencies, expected outputs, and write scope.

## 5. Preserve Intent

Agents may rephrase and reorganize the human vision, but they must not invent major product direction without marking it as an assumption.

When uncertain, agents should create a discovery story or open question instead of silently deciding.

Vision interpretation must be staged for human approval before agents create GitHub implementation stories from it.

## 6. Verify Before Handoff

Every implementation agent must report what it verified.

A handoff should include:

- changed files
- commands run
- test results
- manual checks
- unresolved risks

The handoff should also state the GitHub story, branch, pull request when one exists, and current Project Status.

If verification cannot be run, explain why.

Parallel agents must use disjoint write scopes or name a single integration owner before work starts.

## 7. Document As Part Of Done

Documentation is part of the work, not a cleanup task.

Update the relevant docs when changing:

- user-facing behavior
- API contracts
- environment variables
- deployment steps
- test or verification commands
- agent workflow rules

When work changes a feature's status, completed work, remaining work, decisions, app boundary, or verification path, update the related feature doc under `docs/features/` in the same pull request.

## 8. Respect Existing Architecture

Agents should follow the current project shape unless a story explicitly approves a structural change.

Current areas:

- Angular UI: `ui/`
- Spring Boot service: `services/userservice/`
- PostgreSQL setup: `database/postgres/`
- Deployment runbooks: `devops/`
- AI agent planning: `docs/ai-agents/`

## 9. Leave A Clear Trail

Agents should make work easy to audit.

Every story, branch, commit, and pull request should make the connection between intent and implementation clear.
