# Security and Auth Knowledge

Status: Living knowledge base

This folder stores reusable security, authentication, authorization, identity provider, token, and session notes.

Key cross-app rule: use the same Auth0 tenant for single sign-on across apps, but keep separate Auth0 SPA clients, callback/logout URLs, origins, and API audiences per app. See [Multi-App Auth0 Boundary](multi-app-auth0-boundary.md).

## Notes

- [Auth Provider Notes](auth-provider-notes.md)
- [Auth0 OIDC Configuration](auth0-oidc-configuration.md)
- [Multi-App Auth0 Boundary](multi-app-auth0-boundary.md)
- [Authentication and Authorization Flow](authentication-authorization-flow.md)
- [Auth0 Smoke Test Runbook](auth0-smoke-test-runbook.md)
