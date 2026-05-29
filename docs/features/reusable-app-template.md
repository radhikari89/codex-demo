# Feature: AI-Assisted App Creation Playbook

Status: Paused

Priority: Final-phase discovery

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

## Hold Decision

This feature should stay on hold until the end of the current application development path.

Reason:

- The playbook will be more useful after the app has real examples of auth, navigation, app boundaries, verification, and at least one prototype category.
- Building it too early risks creating generic process documentation before the project has enough proven patterns.
- The current priority is to finish the main hub foundation first.

When resumed, this should be treated as a playbook design story, not an implementation story.

Expected approach when resumed:

1. Define the owner idea intake template.
2. Define how agents interpret the idea into staged planning artifacts.
3. Define approval gates before issue creation, implementation, paid providers, or new services.
4. Define standard outputs: feature doc, story candidates, architecture note, verification plan, deployment notes, and GitHub issue set.
5. Define agent roles for new app creation: product, architecture, UI, backend, QA, DevOps, and orchestrator.
6. Prove the playbook with one sample app idea before making it part of the default workflow.

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
- Resume only after the main app foundation and first prototype paths are more mature.

## Decisions

- AI playbook first; code template extraction only after repeated app builds prove stable patterns.
- Hold until the end of the current application development path.

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
- Put on hold until the end of the current application development path.
