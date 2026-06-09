# Feature: Independent App Verification

Status: Approved

Priority: Architecture discovery

Owner Agent: Solution Architect Agent / QA Agent

Related Staged Source: [App Boundary Model Draft](../ai-agents/staging/app-boundary-model-draft.md)

Related GitHub Issues:

- [#39 Approve app boundary model and independent verification rules](https://github.com/radhikari89/codex-demo/issues/39)

Related PRs:

- Pending

## Purpose

Define how each app area can be tested and verified independently as the hub grows.

## Current State

- App boundary model is approved in [App Boundary Model](../architecture/app-boundary-model.md).
- Per-app verification fields are required in feature docs.

## Desired State

- Each app documents local run, automated tests, local smoke test, deployed smoke test, env vars, and dependencies.
- Microservices are introduced only when boundaries justify them.

## App Boundary

- Type: Cross-cutting architecture and QA practice
- Route/access point: Not user-facing by itself
- Data boundary: Per app
- Backend/service dependency: Per app
- Independent verification path: Defined by this feature

## Completed Work

- App boundary model draft exists.
- Approval story exists.
- App boundary model has been promoted to stable architecture docs.
- Independent verification requirements have been approved.

## Remaining Work

- Apply the model to the first app category.
- Use the model during future story creation and feature-doc updates.

## Decisions

- An app is a self-contained product or experiment area launched from the main hub.
- A page or feature is not automatically an app unless it has its own purpose, data boundary, verification path, or operational lifecycle.
- Approved boundary types are UI-only app, UI plus shared backend, UI plus dedicated service, external linked app, and undecided.
- Dedicated services should be introduced only when a real domain, data, release, scale, security, verification, or operational boundary exists.

## Open Questions

- Which app should be the first proof of independent verification?
- Should Work Orders be embedded, linked, or migrated into this repo?

## Architecture / Diagrams

- [System Context](../architecture/c4/system-context.md)
- [App Boundary Model](../architecture/app-boundary-model.md)

## Verification

- Local run: Not applicable; architecture/documentation-only story
- Automated tests: Markdown review
- Local smoke test: Not applicable; applied per app
- Deployed smoke test: Not applicable; applied per app
- Required env vars: None

## Change Log

- Created initial feature tracking doc from staged vision.
- Promoted the app boundary model and approved independent verification requirements under #39.
