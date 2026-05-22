# Multi-Agent Coordination

Use this workflow when one GitHub story needs more than one agent.

The goal is not to create one large autonomous agent. The goal is to keep each agent narrow, auditable, and easy to review.

## Activation Rule

Start from a GitHub story. If the story is non-trivial, the Orchestrator Agent creates scoped agent tasks before implementation starts.

Each task must define:

- parent issue
- assigned agent
- objective
- inputs
- outputs
- dependencies
- write scope
- status
- blocking questions

## Default Sequence

1. Product Analyst clarifies user value, scope, and acceptance criteria.
2. Solution Architect defines app boundaries, contracts, risks, and sequencing.
3. Orchestrator breaks the story into scoped tasks.
4. Backend, UI, DevOps, QA, and Security tasks run in parallel only when their dependencies and write scopes allow it.
5. QA verifies the integrated behavior.
6. Orchestrator prepares PR context and release handoff notes.

## Parallel Work

Agents can run in parallel when:

- dependencies are satisfied
- write scopes do not overlap
- an agreed contract exists for shared boundaries
- one integration owner is named if shared files must change

If write scopes overlap, serialize the tasks or assign one integration owner.

## Default Write Scopes

| Agent | Default Write Scope |
| --- | --- |
| Product Analyst | `docs/ai-agents/staging/**`, feature/story docs |
| Solution Architect | `docs/architecture/**`, architecture sections of feature docs, API contract docs |
| Backend Agent | `services/userservice/**`, backend API docs, database migrations |
| UI Agent | `ui/**`, UI docs |
| DevOps Agent | `devops/**`, `.github/workflows/**`, deployment docs |
| QA Agent | test plans, verification reports, test harnesses |
| Security Reviewer | security review docs, comments, policy recommendations |
| Release Manager | release notes, deployment checklist, rollback notes |

## Handoff Contracts

Product to Architecture:

```yaml
story:
  title:
  actor:
  goal:
  reason:
acceptance_criteria:
  - id:
    description:
constraints:
  - type:
    detail:
open_questions:
  - question:
    owner:
```

Architecture to Builders:

```yaml
technical_plan:
  summary:
  app_boundary:
    type:
    reason:
  backend:
    endpoints:
      - method:
        path:
        request:
        response:
        errors:
  frontend:
    routes:
      - path:
        purpose:
  infrastructure:
    changes:
      - item:
        reason:
  risks:
    - risk:
      mitigation:
```

Builders to Reviewers:

```yaml
implementation_summary:
  files_changed:
    - path:
      reason:
  tests_added:
    - name:
      command:
  manual_verification:
    - step:
      result:
  known_gaps:
    - gap:
      follow_up:
```

## Feature Doc Updates

Feature docs live under `docs/features/` and should be treated as the current-state record for product features.

Agent tasks should include the relevant feature doc in `Inputs` when the work affects a feature. Pull requests should update that feature doc when they change:

- status
- completed work
- remaining work
- decisions
- open questions
- app boundary
- architecture or diagrams
- verification steps

## Status Flow

```mermaid
stateDiagram-v2
    [*] --> Intake
    Intake --> Requirements
    Requirements --> Architecture
    Architecture --> ReadyForBuild
    ReadyForBuild --> Implementation
    Implementation --> Verification
    Verification --> Review
    Review --> ReleaseReady
    ReleaseReady --> [*]

    Requirements --> Blocked
    Architecture --> Blocked
    ReadyForBuild --> Blocked
    Implementation --> Blocked
    Verification --> Blocked
    Blocked --> Intake
```

Rendered image:

![Multi-agent status flow](../diagrams/generated/multi-agent-status-flow.svg)

## Label Usage

Use labels to communicate routing and state:

- `agent:*` labels identify the next specialist agent.
- `area:*` labels identify the affected system area.
- `risk:*` labels identify cross-cutting review concerns.
- `status:*` labels identify current workflow state.
- `type:*` labels identify issue shape.

The canonical label definitions live in `.github/labels.yml`.

## Label Maintenance

The existing repository labels should not be churned just to match a new naming style. Keep them when they already carry useful history.

Recommended pattern:

- Use `type:*` labels for new issue shape classification.
- Keep existing labels such as `Epic`, `Feature`, `Task`, and `Tech Debt` until there is a deliberate cleanup story.
- Use `area:*` labels for new routing, while allowing existing labels such as `AWS`, `API`, `SPRING BOOT`, `ui`, `Database`, and `SECURITY` to remain as legacy or human-friendly tags.
- Use `agent:*` labels to indicate the next specialist agent.
- Use `status:*` labels to show workflow state.

Do not delete or rename existing labels without an explicit story because older issues may depend on them.
