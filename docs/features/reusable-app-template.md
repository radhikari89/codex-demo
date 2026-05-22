# Feature: Reusable App Template

Status: Draft

Priority: Discovery

Owner Agent: Solution Architect Agent

Related Staged Source: [Feature Map Draft](../ai-agents/staging/feature-map-draft.md)

Related GitHub Issues:

- [#37 Discover reusable app template foundation](https://github.com/radhikari89/codex-demo/issues/37)

Related PRs:

- Pending

## Purpose

Identify reusable app foundation pieces so future apps can be created faster and eventually automated from a template.

## Current State

- The app has reusable-looking foundations: Angular shell, Spring Boot service, PostgreSQL, deployment docs, and agent planning.
- No template boundary has been approved.

## Desired State

- Reusable shell, auth, route, deployment, documentation, and test patterns are identified.
- Template extraction waits until patterns are proven enough to avoid premature abstraction.

## App Boundary

- Type: Architecture foundation
- Route/access point: Not user-facing by itself
- Data boundary: Not applicable
- Backend/service dependency: Depends on template scope
- Independent verification path: template generation or clone smoke test when approved

## Completed Work

- Template idea captured in vision and staged feature map.
- Discovery story exists.

## Remaining Work

- Discover reusable pieces.
- Define what not to abstract yet.
- Recommend first extraction milestone.

## Decisions

- Build once, learn; build twice, extract is the likely guiding rule, pending approval.

## Open Questions

- Should templates be documentation-only first, or automated with scripts later?

## Architecture / Diagrams

- Pending.

## Verification

- Local run: Pending
- Automated tests: Pending
- Local smoke test: Pending
- Deployed smoke test: Pending
- Required env vars: Pending template scope

## Change Log

- Created initial feature tracking doc from staged vision.
