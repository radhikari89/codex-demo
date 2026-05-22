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
- Delete merged branches after the pull request is merged.

## Agent Task Branches

When a feature is split across multiple agent tasks, use the parent issue number plus the task focus:

```text
task/34-backend-auth-contract
task/34-ui-auth-flow
task/34-qa-auth-verification
```

This keeps stacked or parallel work connected to the same story while still showing each branch's scope.
