# AI Agent Work Plan

This folder is the coordination space for using AI agents to finish the remaining work in this application.

Machine-readable agent routing lives in [`../../agents.yaml`](../../agents.yaml).

The project is currently a starter full-stack app with:

- Angular UI under `ui/`
- Spring Boot user service under `services/userservice/`
- Local PostgreSQL setup under `database/postgres/`
- AWS deployment runbooks under `devops/`

## Documents

- [Vision Intake](vision-intake.md): raw product vision capture for the human owner to fill in.
- [Staging](staging/README.md): draft product interpretation and story candidates waiting for owner approval.
- [Story Creation Workflow](story-creation-workflow.md): instructions for turning vision into organized stories.
- [Golden Rules](golden-rules.md): non-negotiable working rules for all agents.
- [Multi-Agent Coordination](multi-agent-coordination.md): how multiple agents are activated, sequenced, and handed off.
- [Remaining Work Plan](remaining-work-plan.md): phased plan for the next application increments.
- [Agent Briefs](agent-briefs.md): reusable agent roles, responsibilities, and handoff rules.
- [Starter Backlog](starter-backlog.md): initial tasks that can be assigned to agents.

## Working Model

Use one short-lived agent per focused task. Each agent should leave behind:

- changed files
- commands run
- test results
- unresolved questions
- follow-up task suggestions

Prefer small vertical slices over large rewrites. A useful slice should include the backend contract, UI behavior, tests, and documentation updates needed to verify it.

All agent work must follow the [Golden Rules](golden-rules.md).

Product interpretation work should move through [Staging](staging/README.md) before GitHub implementation stories are created.

## GitHub Setup Stories

Initial AI agent setup is tracked in:

- [#25 Set up AI agent planning and operating docs](https://github.com/radhikari89/codex-demo/issues/25)
- [#26 Define golden rules for AI agent work](https://github.com/radhikari89/codex-demo/issues/26)
- [#27 Create workflow to convert product vision into GitHub stories](https://github.com/radhikari89/codex-demo/issues/27)
- [#31 Continue AI agent setup with architecture role, labels, and orchestration](https://github.com/radhikari89/codex-demo/issues/31)

## Current Priority

The highest-value next increment is replacing the temporary user lookup login flow with real authentication.

That work should include:

- backend password hashing and credential verification
- a dedicated login endpoint
- UI login updates to send email and password
- clearer auth error states
- tests for success and failure cases
- documentation updates describing the final local and deployed auth flow
