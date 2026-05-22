# Story Candidates Draft

Status: Draft

Related story: [#29](https://github.com/radhikari89/codex-demo/issues/29)

These are candidates only. Do not create GitHub issues from this list until the owner approves or revises the staged direction.

## Discovery: Choose Authentication Strategy

Suggested agent: Product Analyst Agent / Backend Agent

Active story: [#38](https://github.com/radhikari89/codex-demo/issues/38)

Draft output: [Authentication Strategy Discovery](../../architecture/drafts/auth-strategy-discovery.md)

User story:

As the application owner, I want to choose an industry-standard authentication strategy, so that sign up, sign in, social login, and authorization are built on the right foundation.

Acceptance criteria:

- Compare Spring Security-owned auth, managed identity providers, and social login options.
- Include Google/Gmail sign-in.
- Recommend the first implementation path.
- Identify effects on UI, backend, deployment, and local development.

## Discovery: Wireframe Home, Dashboard, And Navigation

Suggested agent: Product Analyst Agent / UI Agent

Active story: [#40](https://github.com/radhikari89/codex-demo/issues/40)

Draft output: [Workflow Wireframe Draft](workflow-wireframe-draft.md)

User story:

As the application owner, I want wireframes for the public home page, auth pages, dashboard, and app navigation, so that implementation follows an approved workflow.

Acceptance criteria:

- Recommend whether to use Figma, repo-native diagrams, or both.
- Draft the first navigation model.
- Include AI, Blockchain, and Misc app categories.
- Identify what the dashboard should show first.

## Implementation: Replace Temporary Auth Bridge

Suggested agent: Backend Agent / UI Agent

User story:

As a visitor, I want to sign up and sign in securely, so that I can access the app dashboard with a real account.

Acceptance criteria:

- Backend no longer accepts raw `passwordHash` from the UI.
- Login verifies credentials through an agreed auth contract.
- UI login uses email and password or the approved provider flow.
- Auth errors are user-safe and testable.

## Discovery: Define App Boundary Rules

Suggested agent: Product Analyst Agent / Solution Architect Agent

User story:

As the application owner, I want a clear definition of an app boundary, so that future AI, Blockchain, Misc, and Work Orders areas can be tested independently.

Acceptance criteria:

- Define app boundary types.
- Define when to use a shared backend versus a dedicated service.
- Define required per-app verification documentation.
- Identify the first app area to prove the model.

## Discovery: Reusable App Template Foundation

Suggested agent: Solution Architect Agent

User story:

As the application owner, I want to identify reusable app foundation pieces, so that future apps can eventually be generated or created from a template.

Acceptance criteria:

- Identify reusable shell, auth, route, deployment, and test patterns.
- Identify what should not be abstracted yet.
- Recommend a build-once or build-twice extraction rule.
- Propose a first template extraction milestone.

## Implementation: Create Feature Tracking Templates

Suggested agent: Documentation Agent

User story:

As the application owner, I want feature-level tracking docs, so that agents can see what has been done and what remains for each feature.

Acceptance criteria:

- Add a feature docs folder.
- Add a reusable feature template.
- Include status, completed work, remaining work, decisions, open questions, related diagrams, related issues, and app boundary.
- Create starter docs for authentication, application shell, AI, Blockchain, Misc, and reusable app template.
