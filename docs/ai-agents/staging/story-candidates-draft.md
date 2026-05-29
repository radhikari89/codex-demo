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

## Epic: Security And Auth Provider Lab

Suggested agent: Product Analyst Agent / Solution Architect Agent / Security Reviewer

Active epic: [#46](https://github.com/radhikari89/codex-demo/issues/46)

User story:

As the application owner, I want a dedicated security prototype category, so that authentication and authorization provider options can be prototyped and compared without destabilizing the main app.

Acceptance criteria:

- Define Security as an app category alongside AI, Blockchain, and Misc.
- Define how auth provider prototypes remain isolated from production auth.
- Link the epic to the authentication strategy discovery and app boundary model.
- Identify the first provider prototype and comparison checklist.

## Discovery: Define Auth-Lab Evaluation Matrix

Suggested agent: Solution Architect Agent / Security Reviewer

Active story: [#52](https://github.com/radhikari89/codex-demo/issues/52)

User story:

As the application owner, I want a shared auth-lab evaluation matrix, so that Spring Security-owned auth, Google OIDC, Keycloak, Cognito, Auth0, Okta, and Firebase/Supabase can be compared consistently.

Acceptance criteria:

- Define a common prototype checklist for signup, signin, current-user lookup, logout, roles/claims, backend identity verification, local development, deployment impact, secret handling, and operational ownership.
- Define where auth-lab prototype docs and code should live.
- Define what a prototype must prove before it can influence the main app auth decision.
- Identify which prototypes are docs-only versus runnable.

## Prototype: Keycloak Auth Provider Lab

Suggested agent: Solution Architect Agent / Backend Agent / Security Reviewer

Active story: [#53](https://github.com/radhikari89/codex-demo/issues/53)

User story:

As the application owner, I want to prototype Keycloak as a local open-source identity provider, so that I can learn OIDC concepts and compare self-hosted auth against managed providers.

Acceptance criteria:

- Document local Keycloak setup approach, likely Docker-based.
- Define realm, client, callback URL, roles/claims, and Google identity brokering assumptions.
- Show how Spring Boot would validate identity from Keycloak.
- Identify production responsibilities: upgrades, backups, availability, admin hardening, secrets, and monitoring.
- Record whether Keycloak should remain a lab prototype or become a candidate production IdP.

## Prototype: Managed Auth Provider Comparison

Suggested agent: Solution Architect Agent / DevOps Agent / Security Reviewer

Active story: [#54](https://github.com/radhikari89/codex-demo/issues/54)

User story:

As the application owner, I want to compare Cognito, Auth0, Okta, and Firebase/Supabase against the same auth-lab checklist, so that managed-provider tradeoffs are understood before choosing a shared identity provider.

Acceptance criteria:

- Compare setup effort, local development, AWS deployment fit, social login support, roles/claims, backend verification, cost, lock-in, and operational burden.
- Include Cognito as the AWS-native managed IdP candidate.
- Include Auth0 or Okta as the commercial managed IdP candidate.
- Include Firebase or Supabase Auth as the app-builder candidate.
- Recommend which managed provider, if any, deserves a runnable prototype.

## Discovery: Add Security Category To App Navigation Model

Suggested agent: Product Analyst Agent / UI Agent

Active story: [#55](https://github.com/radhikari89/codex-demo/issues/55)

User story:

As a signed-in user, I want to navigate to a Security prototype category, so that auth provider prototypes and security experiments have a clear place in the hub.

Acceptance criteria:

- Update the navigation model to include Security.
- Define first Security category landing behavior.
- Keep runnable auth prototypes isolated from production auth.
- Identify whether this updates the workflow wireframe story or becomes a follow-up UI implementation story.
- Link to the Security/Auth Provider Lab feature doc.

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

## Discovery: AI-Assisted App Creation Playbook

Suggested agent: Solution Architect Agent

User story:

As the application owner, I want to train and guide AI agents with a repeatable app creation playbook, so that future prototype apps can be planned and built much faster with minimal human intervention.

Acceptance criteria:

- Define the owner idea intake flow for a new app.
- Define what context agents must gather before drafting stories.
- Define story, architecture, implementation, and verification templates for new apps.
- Define human approval gates before agents create GitHub issues or start implementation.
- Identify whether any code templates/scripts are needed now or should wait.

## Implementation: Create Feature Tracking Templates

Suggested agent: Documentation Agent

User story:

As the application owner, I want feature-level tracking docs, so that agents can see what has been done and what remains for each feature.

Acceptance criteria:

- Add a feature docs folder.
- Add a reusable feature template.
- Include status, completed work, remaining work, decisions, open questions, related diagrams, related issues, and app boundary.
- Create starter docs for authentication, application shell, AI, Blockchain, Misc, and AI-assisted app creation.
