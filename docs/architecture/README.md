# Architecture

This folder stores cross-system architecture docs, diagrams, decisions, workflows, and contracts for the application.

Use Mermaid inside Markdown files by default. Mermaid keeps diagrams easy for humans and AI agents to update in normal pull requests.

## Documents

- [Architecture Docs Approach](decisions/ADR-0001-architecture-docs-approach.md)
- [Authentication Strategy](decisions/ADR-0002-authentication-strategy.md)
- [System Context](c4/system-context.md)
- [Container View](c4/container-view.md)
- [Deployment View](c4/deployment-view.md)
- [AI Agent Story Flow](workflows/ai-agent-story-flow.md)
- [Authentication Strategy Discovery](drafts/auth-strategy-discovery.md)
- [Architecture Knowledge](knowledge/README.md)
- [Auth Provider Notes](knowledge/security-and-auth/auth-provider-notes.md)

## Folder Structure

- `c4/`: C4-style system, container, component, and deployment views.
- `workflows/`: user, system, and agent process flows.
- `contracts/`: API, data, integration, and service contract notes.
- `decisions/`: architecture decision records.
- `drafts/`: unapproved architecture explorations.
- `knowledge/`: reusable architecture concepts, provider notes, tradeoff summaries, and learning references.

## Maintenance Rules

- Update diagrams when system boundaries, request routing, deployment shape, or core workflows change.
- Keep diagrams connected to implementation docs, runbooks, and feature docs.
- Prefer one focused diagram per file instead of one oversized diagram.
- Use draft diagrams first when product or architecture direction is not approved yet.
- For every story touching boundaries, APIs, data ownership, authentication, deployment routing, or service split decisions, the Solution Architect Agent should update relevant architecture docs or explicitly state why no architecture doc change is needed.

## Diagram Tool Strategy

- Use Mermaid for diagrams that should stay text-first and easy to update in PRs.
- Use Draw.io only when visual layout fidelity matters for a review or presentation.
- Use Structurizr later if the app grows into multiple bounded contexts or services and needs a governed C4 model.
