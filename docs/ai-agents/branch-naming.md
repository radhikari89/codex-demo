# Branch Naming

Use branch names that make the work type, GitHub issue, and intent clear.

## Format

```text
<type>/<issue-number>-<short-kebab-summary>
```

Examples:

```text
feature/32-auth-strategy-discovery
docs/33-feature-tracking-docs
task/34-backend-auth-contract
fix/35-login-error-handling
chore/36-label-sync
spike/37-google-auth-options
```

## Branch Types

| Type | Use For |
| --- | --- |
| `feature/` | User-facing feature work or feature-level planning. |
| `task/` | Scoped implementation or agent task under a larger feature. |
| `docs/` | Documentation-only changes. |
| `fix/` | Bug fixes. |
| `chore/` | Repo maintenance, labels, workflows, or cleanup. |
| `spike/` | Time-boxed discovery or experiments. |
| `release/` | Release preparation or deployment coordination. |
| `hotfix/` | Urgent production fixes. |

## Rules

- Include the GitHub issue number once an issue exists.
- Use lowercase kebab-case.
- Keep names short enough to scan in GitHub, ideally under 50 characters.
- Name the artifact or outcome, not the agent or person doing the work.
- Use `spike/` for discovery work that may not ship product changes.
- Use `docs/` when the pull request only changes documentation.
- Create or switch to the correctly named branch before editing files.
- Comment on the GitHub issue with the active branch name when work starts.
- Delete merged branches after the pull request is merged.

## Start-Work Checklist

Before editing files:

1. Identify the GitHub issue.
2. Confirm the issue is in GitHub Project 1.
3. Set the Project Status to `In Progress`.
4. Create or switch to the branch using this naming convention.
5. Comment on the issue with the branch, Project Status, and scope.

Example issue comment:

```text
Agent active on this story.

Project Status: In Progress
Branch: docs/56-project-board-branch-sync
Scope: update workflow docs for project-board sync and branch naming enforcement.
```

## Agent Task Branches

When a feature is split across multiple agent tasks, use the parent issue number plus the task focus:

```text
task/34-backend-auth-contract
task/34-ui-auth-flow
task/34-qa-auth-verification
```

This keeps stacked or parallel work connected to the same story while still showing each branch's scope.
