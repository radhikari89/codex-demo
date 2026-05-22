# ADR-0001: Architecture Docs Approach

Status: Accepted

Related story: [#34](https://github.com/radhikari89/codex-demo/issues/34)

## Context

The application is evolving from a simple deployed Angular/Spring Boot/PostgreSQL app into `webdevisfun.com`, a prototypes hub for modern web technologies.

The architecture needs to be understandable by humans and AI agents. It also needs to stay lightweight enough to update during normal pull requests.

## Decision

Use Markdown plus Mermaid as the default architecture documentation format.

Store cross-system architecture docs under `docs/architecture/`:

- `c4/` for C4-style views
- `workflows/` for user, system, and agent flows
- `contracts/` for API and integration contracts
- `decisions/` for architecture decision records
- `drafts/` for unapproved explorations

## Tool Guidance

- Mermaid is the default for repo-native diagrams.
- Draw.io can be used when a polished visual layout is needed.
- Structurizr can be introduced later if the system grows into multiple bounded contexts, services, or environments that need a governed C4 model.

## Consequences

- Diagrams can be reviewed as plain text in pull requests.
- AI agents can update diagrams without special tooling.
- Richer visual diagram tools remain available later, but they are not required for the first architecture foundation.
