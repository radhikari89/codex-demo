# Feature: AI-Assisted App Creation Playbook

Status: Draft

Priority: Discovery

Owner Agent: Solution Architect Agent

Related Staged Source: [Feature Map Draft](../ai-agents/staging/feature-map-draft.md)

Related GitHub Issues:

- [#37 Discover AI-assisted app creation playbook](https://github.com/radhikari89/codex-demo/issues/37)

Related PRs:

- Pending

## Purpose

Create an AI-assisted app creation playbook so future prototype apps can be planned and generated much faster with minimal human intervention.

## Current State

- Agents have planning docs, feature docs, architecture docs, branch rules, and story workflows.
- The repo does not yet have a repeatable AI app-creation playbook that tells agents how to go from owner idea to scoped stories, architecture, implementation steps, verification, and handoff.

## Desired State

- Agents can use a repeatable playbook to create new prototype app plans with less human intervention.
- The playbook captures prompts, required questions, story templates, architecture checks, verification expectations, and handoff rules.
- Code extraction is not the primary goal; reusable code templates may come later only if repeated implementation proves they are useful.

## App Boundary

- Type: AI agent workflow / architecture foundation
- Route/access point: Not user-facing by itself
- Data boundary: Not applicable
- Backend/service dependency: Depends on the app being created
- Independent verification path: generated plan/story review first; later app smoke tests when implementation begins

## Completed Work

- Owner clarified that #37 is about training/guiding AI agents for faster app creation, not extracting reusable code templates.
- Discovery story exists.

## Remaining Work

- Define the AI-assisted app creation flow from idea intake to reviewed stories.
- Define what context an agent must gather before proposing a new app.
- Define story, architecture, implementation, and verification templates for new app creation.
- Define where reusable prompts/checklists should live.

## Decisions

- AI playbook first; code template extraction only after repeated app builds prove stable patterns.

## Open Questions

- What is the minimum human input needed before an agent can draft a new app plan?
- Which parts should remain human approval gates?
- Should the first playbook be docs-only, or include scripts/templates later?

## Architecture / Diagrams

- Pending.

## Verification

- Local run: Pending
- Automated tests: Pending
- Local smoke test: Pending
- Deployed smoke test: Pending
- Required env vars: Not applicable for docs-only playbook

## Change Log

- Created initial feature tracking doc from staged vision.
- Reframed from reusable code template extraction to AI-assisted app creation playbook after owner clarification.
