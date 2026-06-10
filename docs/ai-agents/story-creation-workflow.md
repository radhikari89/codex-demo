# Story Creation Workflow

Use this workflow after `vision-intake.md` has been filled in.

## Agent Goal

Convert the human-written vision into clear delivery stories without losing the original intent.

The output should be suitable for:

- GitHub issues
- implementation planning
- agent task assignment
- acceptance testing

## Inputs

Read these documents before creating stories:

- `docs/ai-agents/vision-intake.md`
- `docs/ai-agents/staging/README.md`
- `docs/ai-agents/golden-rules.md`
- `docs/ai-agents/agent-briefs.md`
- `docs/ai-agents/remaining-work-plan.md`
- existing technical docs under `ui/documentation/`
- relevant service and deployment README files

## Step 1: Restate The Vision

Create a concise product brief:

- product purpose
- target users
- main problems solved
- first useful version
- future direction

Keep this faithful to the original vision. If the source is ambiguous, mark the statement as an assumption.

Write the first version to `docs/ai-agents/staging/product-brief-draft.md`.

## Step 2: Create Draft Feature Map

Group the vision into features and broad epics.

Common epic types:

- authentication and account access
- dashboard and user workspace
- data management
- admin or operator workflows
- reporting
- app shell and navigation
- independently testable app modules
- AI-assisted app creation playbook or app factory
- deployment and operations
- security
- quality and testing

Only create epics supported by the vision or current codebase.

Write the first version to `docs/ai-agents/staging/feature-map-draft.md`.

## Step 3: Define App Boundaries

For each app or major feature area, classify its boundary:

- independent UI-only app
- independent UI plus dedicated backend
- external linked app
- undecided

Also capture how that app can be run, tested, and smoke-tested independently.

For real app work, assume the app starts with its own repository and its own GitHub Project. Shared infrastructure may still include the Auth0/OIDC tenant or security profile, root domain, and deployment/orchestration conventions, but app code, app database, and app backlog should be owned separately unless the owner explicitly approves a hub-owned exception.

Write the first version to `docs/ai-agents/staging/app-boundary-model-draft.md`.

## Step 4: Create Story Candidates

Each story should use this shape:

```text
As a <user type>,
I want <capability>,
so that <outcome>.
```

Each story should include:

- summary
- parent epic
- user value
- acceptance criteria
- dependencies
- suggested agent role
- implementation notes
- test notes

Write the first version to `docs/ai-agents/staging/story-candidates-draft.md`.

## Step 5: Separate Discovery From Implementation

Create discovery stories when the answer is not known yet.

Use discovery for:

- unclear product rules
- unclear data models
- unclear AWS or security choices
- decisions that affect multiple features

Use implementation stories only when the expected behavior is clear enough to build and test.

## Step 6: Human Approval Gate

Before creating GitHub issues, the owner should review the staged drafts and decide whether each item is:

- approved
- needs revision
- rejected
- deferred

Agents should not convert staged story candidates into GitHub issues until the owner explicitly approves them.

## Step 7: Sequence The Work

Organize stories into a practical order:

1. foundation needed by other work
2. smallest useful vertical slice
3. integration and verification
4. hardening
5. future enhancements

Prefer a working end-to-end path over many disconnected partial layers.

## Step 8: Prepare GitHub Issue Drafts

For each story, create a GitHub-ready issue draft:

```markdown
## Summary

## Parent Epic

## User Story

## Acceptance Criteria

## Technical Notes

## Suggested Agent

## Dependencies

## Verification
```

Do not create GitHub issues automatically unless the user explicitly asks for that.

Each issue should represent a clear unit of work. Implementation should not start until the issue exists, except for tiny documentation corrections made while preparing the issue itself.

Every non-epic issue must name a parent epic in the `Parent Epic` section. If no suitable epic exists, create or identify the epic first instead of creating an orphan story.

The parent epic must also list the story in its `Child Issues` checklist so the relationship is visible from both directions.

For stories that belong to an independent app, create and track the story in that app's repository and GitHub Project. Use this hub repository only for hub-owned work, shared identity/auth foundation work, platform coordination, or approved cross-app documentation.

## Output Format

Recommended output files:

- `docs/ai-agents/staging/product-brief-draft.md`
- `docs/ai-agents/staging/feature-map-draft.md`
- `docs/ai-agents/staging/app-boundary-model-draft.md`
- `docs/ai-agents/staging/story-candidates-draft.md`
- `docs/ai-agents/github-issue-drafts.md`

## Quality Bar

Stories are ready when:

- each story can be assigned to one agent
- each story has a parent epic
- the parent epic lists the story in its child issue checklist
- acceptance criteria are testable
- dependencies are explicit
- implementation notes point to the right repository, GitHub Project, and repo areas
- no major feature is invented without marking it as an assumption
