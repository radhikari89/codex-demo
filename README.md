# Codex Demo App

This repository contains a small full-stack application used to grow an Angular UI, a Spring Boot user service, PostgreSQL local development, and AWS deployment runbooks.

## Project Areas

- [UI technical docs](ui/documentation/technical-overview.md)
- [User service README](services/userservice/README.md)
- [PostgreSQL local setup](database/postgres/README.md)
- [Deployment runbooks](devops/DEPLOY_README.md)
- [Architecture docs](docs/architecture/README.md)
- [Feature tracking](docs/features/README.md)
- [AI agent work plan](docs/ai-agents/README.md)

## Local Auth0 Smoke Test

From the repository root:

```powershell
.\scripts\start-local-auth0-smoke.ps1 -OpenBrowser
```

The script starts Docker Desktop if needed, starts local PostgreSQL, starts the Spring Boot user service, starts the Angular UI, and opens the login page.
