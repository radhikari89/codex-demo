# Multi-App Auth0 Boundary

Status: Guidance

Related epic: [#78 Shared Identity App](https://github.com/radhikari89/codex-demo/issues/78)

Related story: [#86 Document multi-app Auth0 boundary](https://github.com/radhikari89/codex-demo/issues/86)

## Purpose

Define what should be shared across apps that use Auth0 and what should remain app-specific as `webdevisfun.com` grows into multiple independently owned apps.

## Recommended Model

Use one shared Auth0 tenant or security profile for the Web Dev Is Fun app family at first, but give each independently deployed app its own Auth0 application and usually its own Auth0 API/audience.

This keeps identity consistent while preserving each app's ability to deploy, test, audit, revoke, rotate, and later move under a different domain or umbrella.

## Single Sign-On Across Apps

Using the same Auth0 tenant allows single sign-on across apps without forcing every app to share one Auth0 client ID.

Expected user experience:

1. The user signs in to one app, such as the hub.
2. The user opens another app, such as the Shared Identity app.
3. The second app starts its own OIDC login flow with its own Auth0 SPA client.
4. Auth0 sees the existing tenant session.
5. Auth0 redirects the user back to the second app without asking for credentials again, unless policy, session expiration, MFA, or consent requires it.

From the user's point of view, they are already signed in. From the architecture point of view, each app still has its own client ID, callback URL, origins, and token request configuration.

This is the preferred model: shared tenant session for SSO, app-specific client configuration for isolation.

## Common Across Apps

These can be shared or standardized:

| Item | Why It Can Be Common |
| --- | --- |
| Auth0 tenant/domain | Gives users one identity provider and one hosted login authority. |
| Issuer URI | Usually derived from the shared tenant domain. |
| Identity provider connections | Google, username/password, or future social/enterprise connections can be enabled centrally. |
| Role and permission naming conventions | Keeps authorization language consistent across apps. |
| Security defaults | PKCE, token cache guidance, JWT profile, signing algorithm, logout behavior, and review checklist. |
| Setup runbooks/templates | Speeds up new app creation without forcing all apps to share runtime config. |

## App-Specific By Default

These should usually be configured separately per app:

| Item | Why It Should Be App-Specific |
| --- | --- |
| SPA client ID | Identifies one browser app; separate IDs improve audit, revocation, and callback control. |
| Callback URLs | Each app has its own login return route and environment URLs. |
| Logout URLs | Each app needs a safe return location after logout. |
| Allowed web origins | Limits which browser origins can start Auth0 flows for that app. |
| Allowed CORS origins | Limits browser-origin access to Auth0 endpoints for that app. |
| API audience | Identifies the backend API the access token is meant for; separate backends should usually have separate audiences. |
| Backend issuer/audience validation config | Each backend must validate that a token was issued by the expected tenant and intended for that backend. |

## Why Not One Client ID For Everything?

One shared Auth0 SPA client across all apps would make setup look simpler, but it weakens app boundaries:

- every app must be added to the same callback/logout/origin allowlists
- one bad or outdated redirect setting affects every app
- audit logs are less clear because multiple apps appear as the same client
- rotation or emergency revocation affects all apps at once
- moving one app to a different domain or brand becomes harder

For independent repos, projects, deployments, and future domains, separate Auth0 applications are the cleaner default.

## Audience Guidance

An Auth0 API audience identifies a resource server, not necessarily the literal backend URL.

Use a semantic identifier such as:

```text
urn:webdevisfun:hub-api
urn:webdevisfun:identity-api
urn:webdevisfun:work-orders-api
```

Use one shared audience only when multiple backend services are intentionally treated as one logical API with the same authorization boundary. Otherwise, give each backend its own audience so tokens are scoped to the API they are meant to call.

## Shared Identity App Boundary

The Shared Identity app does not replace every app's Auth0/OIDC integration.

It owns:

- account-facing UX
- profile and security settings UX
- connected-apps or app-access visibility if needed
- reusable IAM patterns, runbooks, and templates
- cross-app identity conventions

Each independent app still owns:

- its frontend OIDC client configuration
- its route protection
- access-token attachment to its own APIs
- its backend JWT/resource-server validation
- its own API authorization decisions
- app-specific user/resource mapping

This avoids turning the Shared Identity app into a custom OAuth/OIDC provider or a central place for all app-specific authorization logic.

## Default For New Apps

For each new independent app:

1. Create or select one Auth0 SPA application for that app frontend.
2. Configure that app's callback, logout, web origin, and CORS origin values per environment.
3. Create one Auth0 API/audience for that app backend when it has a backend.
4. Configure the backend to validate the shared issuer and the app-specific audience.
5. Use shared IAM documentation/templates for implementation consistency.
6. Keep app-specific data and authorization rules in that app's repo, backend, and database.

## When To Revisit

Revisit this model if:

- a platform gateway becomes responsible for all user-facing auth and API routing
- multiple backends intentionally become one logical resource server
- a shared library/package is introduced for Angular or Spring Security setup
- an app must move to a different Auth0 tenant for compliance or ownership reasons
- the Shared Identity app needs a deployed account-entry contract consumed by multiple apps
