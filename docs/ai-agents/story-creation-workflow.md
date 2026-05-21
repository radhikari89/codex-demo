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

## Step 2: Extract Epics

Group the vision into broad epics.

Common epic types:

- authentication and account access
- dashboard and user workspace
- data management
- admin or operator workflows
- reporting
- deployment and operations
- security
- quality and testing

Only create epics supported by the vision or current codebase.

## Step 3: Create User Stories

Each story should use this shape:

```text
As a <user type>,
I want <capability>,
so that <outcome>.
```

Each story should include:

- summary
- user value
- acceptance criteria
- dependencies
- suggested agent role
- implementation notes
- test notes

## Step 4: Separate Discovery From Implementation

Create discovery stories when the answer is not known yet.

Use discovery for:

- unclear product rules
- unclear data models
- unclear AWS or security choices
- decisions that affect multiple features

Use implementation stories only when the expected behavior is clear enough to build and test.

## Step 5: Sequence The Work

Organize stories into a practical order:

1. foundation needed by other work
2. smallest useful vertical slice
3. integration and verification
4. hardening
5. future enhancements

Prefer a working end-to-end path over many disconnected partial layers.

## Step 6: Prepare GitHub Issue Drafts

For each story, create a GitHub-ready issue draft:

```markdown
## Summary

## User Story

## Acceptance Criteria

## Technical Notes

## Suggested Agent

## Dependencies

## Verification
```

Do not create GitHub issues automatically unless the user explicitly asks for that.

Each issue should represent a clear unit of work. Implementation should not start until the issue exists, except for tiny documentation corrections made while preparing the issue itself.

## Output Format

Recommended output files:

- `docs/ai-agents/product-brief.md`
- `docs/ai-agents/story-map.md`
- `docs/ai-agents/github-issue-drafts.md`

## Quality Bar

Stories are ready when:

- each story can be assigned to one agent
- acceptance criteria are testable
- dependencies are explicit
- implementation notes point to the right repo areas
- no major feature is invented without marking it as an assumption
