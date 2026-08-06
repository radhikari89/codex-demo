# Feature: Security And Auth Provider Lab

Status: Draft

Priority: 3

Owner Agent: Solution Architect Agent / Security Reviewer

Related Staged Source: [Feature Map Draft](../ai-agents/staging/feature-map-draft.md)

Related GitHub Issues:

- [#46 Epic: Security and Auth Provider Lab](https://github.com/radhikari89/codex-demo/issues/46)
- [#52 Define auth-lab evaluation matrix](https://github.com/radhikari89/codex-demo/issues/52)
- [#53 Prototype Keycloak auth provider lab](https://github.com/radhikari89/codex-demo/issues/53)
- [#54 Compare managed auth providers for auth lab](https://github.com/radhikari89/codex-demo/issues/54)
- [#55 Add Security category to app navigation model](https://github.com/radhikari89/codex-demo/issues/55)
- [#90 Apply independent verification model to Security/Auth Provider Lab](https://github.com/radhikari89/codex-demo/issues/90)

Related PRs:

- Pending

## Purpose

Provide a dedicated prototype category for security-focused applications and authentication/authorization provider prototypes.

## Current State

- Authentication strategy discovery identifies Spring Security-owned auth, Google OIDC, Keycloak, Cognito, Auth0, Okta, and Firebase/Supabase as options.
- The Security category exists in the hub as a discovery and navigation area.
- Provider prototypes are represented as planned stories, but no runnable provider lab has been approved for implementation yet.
- The main app login path uses Auth0 OIDC, while provider experiments remain separate.

## Desired State

- Security appears as a first-class prototype category in the hub.
- Auth provider prototypes are isolated from the main application auth flow.
- Each provider prototype uses a shared evaluation checklist.
- Prototype findings can guide the future shared identity provider decision for multiple apps.
- Runnable provider labs have their own boundary, verification path, and repository/project decision before code is written.

## App Boundary

- Type: Hub-owned category and documentation/discovery area until a runnable provider lab is approved.
- Route/access point: `/apps/security` for the hub category; future runnable labs should use an explicit route or external app URL recorded by their own boundary story.
- Repository: `radhikari89/codex-demo` for category/discovery docs; future runnable labs should receive a dedicated repo unless explicitly approved as hub-owned.
- GitHub Project: Project 1 for category/discovery/bootstrap coordination; app-owned project for runnable lab delivery after handoff.
- Data boundary: provider evaluation notes, claims/roles examples, secret-handling notes, and non-secret configuration guidance. No production credentials, tenant admin credentials, private keys, or live user data.
- Backend/service dependency: none for documentation-only evaluation; dedicated backend or isolated sandbox service only when a runnable lab requires server-side behavior.
- Independent verification path: auth-lab evaluation checklist, provider-specific setup notes, local smoke test, deployed smoke test if hosted, and security review notes.
- Portability notes: Provider labs must remain portable away from `webdevisfun.com` and must not become dependencies of the main hub login path unless promoted by an explicit decision.

## Independent Verification Applied

### Ownership And Tracking

- Hub-owned work: Security category docs, evaluation matrix, provider comparison, and repo/project bootstrap coordination.
- App-owned work: runnable provider-lab implementations once a provider lab needs executable code, isolated runtime config, dedicated deployment, or sandbox data.
- Existing Project 1 stories:
  - #52 remains hub-owned because it defines the shared evaluation matrix.
  - #54 remains hub-owned because it compares managed providers against the matrix.
  - #53 should be reviewed before implementation; if Keycloak becomes a runnable lab, create a repo/project bootstrap story before writing code.

### Local Development

- Documentation-only work has no local runtime.
- Hub category UI verification uses the hub UI local run path.
- Runnable labs must document install, start, build, test, required local services, provider sandbox, and missing-config behavior in the owning repo.

### Automated Checks

- Documentation-only work uses Markdown review.
- Hub UI category changes use the hub UI build/test path.
- Runnable labs must define their own build, unit/component tests, security/dependency checks, and CI expectations before release.

### Local Smoke Test

- Documentation-only work: verify links and issue references.
- Hub category work: verify `/apps/security` loads and does not alter main Auth0 login behavior.
- Runnable provider labs: verify provider login/callback/logout, token or claim inspection, protected route/API behavior, and failure states with a sandbox provider.

### Deployed Smoke Test

- Documentation-only work: not applicable.
- Hub category work: verify deployed `/apps/security` route when UI changes are made.
- Runnable provider labs: verify deployed HTTPS, callback/logout/origin configuration, provider sandbox behavior, route refresh, and rollback notes.

### Auth0 And IAM

- Main hub Auth0 configuration remains the production login path.
- Provider experiments must not share production client secrets, tenant admin credentials, management tokens, or private keys.
- Provider experiments may use the shared Auth0 tenant only when testing same-tenant behavior; otherwise use provider sandboxes or test tenants.
- Cross-app Auth0 assumptions should follow [Multi-App Auth0 Boundary](../architecture/knowledge/security-and-auth/multi-app-auth0-boundary.md).

### Backend And Data

- No app-owned database exists for the documentation/category phase.
- Runnable labs that persist data must own their own database or explicitly document why persistence is external/provider-owned.
- App-specific user/resource mapping belongs to the runnable lab, not to the main hub or Shared Identity app.

## Completed Work

- Added Keycloak and auth-lab prototype approach to auth strategy discovery.
- Security category is represented in the app shell/navigation model.
- Applied the independent app verification model to the Security/Auth Provider Lab under #90.

## Remaining Work

- Define auth-lab evaluation matrix.
- Implement the Security category landing page in the UI.
- Re-scope the Keycloak prototype before implementation: keep it documentation-only in Project 1 or create an independent repo/project for a runnable lab.
- Compare managed providers against the same checklist.

## Decisions

- The main application should use one approved production auth path.
- Provider prototypes should remain isolated until one path is intentionally promoted.
- Security should be visible as a first-class app category once the app shell supports category navigation.
- Empty Security category state is acceptable before the first runnable lab exists.
- Security/Auth Provider Lab remains hub-owned for discovery, comparison, and category navigation.
- Runnable provider labs should become independent app/repo/project work unless an explicit architecture decision keeps a specific lab in the hub.

## Open Questions

- Which managed IdP should receive the first runnable prototype after Keycloak?
- What threshold should trigger a provider lab repo/project: executable UI, backend service, provider sandbox credentials, hosted deployment, or persisted test data?

## Architecture / Diagrams

- [Authentication Strategy Discovery](../architecture/drafts/auth-strategy-discovery.md)
- [Container View](../architecture/c4/container-view.md)
- [Deployment View](../architecture/c4/deployment-view.md)

## Verification

- Local run: Not applicable for documentation-only evaluation; hub UI run applies when `/apps/security` changes.
- Automated tests: Markdown review for this boundary update; hub UI build/test applies when category UI changes.
- Local smoke test: Verify docs links and issue references; runnable labs must define provider-specific local smoke tests before implementation.
- Deployed smoke test: Not applicable for documentation-only evaluation; deployed route/provider checks apply when UI or runnable lab code exists.
- Required env vars: None for documentation-only evaluation; runnable labs must document provider-specific non-secret config and secret handling before implementation.

## Change Log

- Created feature doc from updated vision entry dated 05-22-2026.
- Created GitHub epic and first story set for Security/Auth Provider Lab.
- 2026-08-06: Applied independent app verification model and clarified hub-owned versus future app-owned provider lab work under #90.
