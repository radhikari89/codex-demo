# Feature: Design And Wireframing

Status: Draft

Priority: Discovery

Owner Agent: Product Analyst Agent / UI Agent

Related Staged Source: [Workflow Wireframe Draft](../ai-agents/staging/workflow-wireframe-draft.md)

Related GitHub Issues:

- [#40 Wireframe home, dashboard, and app navigation workflow](https://github.com/radhikari89/codex-demo/issues/40)

Related PRs:

- Pending

## Purpose

Define how product workflows and UI direction are drafted and approved before implementation.

## Current State

- Owner has a free Figma account.
- Repo-native Mermaid/Markdown wireframes are being used for first workflow drafts.

## Desired State

- Use Markdown/Mermaid for early workflow approval.
- Use Figma or Draw.io later when visual layout fidelity matters.
- Keep approved flows linked to implementation stories.

## App Boundary

- Type: Planning practice
- Route/access point: Not user-facing by itself
- Data boundary: Not applicable
- Backend/service dependency: None
- Independent verification path: owner review and approved follow-up stories

## Completed Work

- Workflow wireframe story exists.

## Remaining Work

- Approve the first home/dashboard/navigation workflow.
- Decide when Figma becomes useful.
- Create UI implementation stories after approval.

## Decisions

- Mermaid/Markdown first is the current draft recommendation.

## Open Questions

- Does the first app shell need a Figma mockup before build?

## Architecture / Diagrams

- [AI Agent Story Flow](../architecture/workflows/ai-agent-story-flow.md)

## Verification

- Local run: Not applicable
- Automated tests: Not applicable
- Local smoke test: Not applicable
- Deployed smoke test: Not applicable
- Required env vars: None

## Change Log

- Created initial feature tracking doc from staged vision.
