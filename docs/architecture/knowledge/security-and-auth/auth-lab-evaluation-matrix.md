# Auth Lab Evaluation Matrix

Status: Guidance

Related feature: [Security And Auth Provider Lab](../../../features/security-and-auth-provider-lab.md)

Related story: [#52 Define auth-lab evaluation matrix](https://github.com/radhikari89/codex-demo/issues/52)

## Purpose

Use one checklist to compare authentication and authorization provider experiments without mixing those experiments into the main hub login path.

Plain version: every auth provider prototype should answer the same questions so we can compare them fairly.

## Providers To Compare

| Provider Or Pattern | First Lab Shape | Initial Classification |
| --- | --- | --- |
| Spring Security-owned email/password | Design and local prototype later | Runnable only if password handling is intentionally isolated from the hub. |
| Spring Security OAuth2/OIDC with Google | Design note first | Runnable only if direct Google OIDC is being compared against brokered login. |
| Keycloak | First external IdP candidate | Likely runnable, but should get a repo/project boundary before coding. |
| AWS Cognito User Pool | Managed provider comparison | Docs-first until AWS setup is intentionally approved. |
| Auth0 | Baseline/reference provider | Main hub uses Auth0; lab work should compare patterns without disrupting production auth. |
| Okta | Enterprise IAM comparison | Docs-first unless enterprise SSO behavior needs a runnable prototype. |
| Firebase Auth / Supabase Auth | App-builder comparison | Docs-first unless frontend-heavy auth tradeoffs need a runnable prototype. |

## Evaluation Checklist

Each provider note or prototype should answer these questions.

| Area | Questions To Answer |
| --- | --- |
| Signup | How does a new user register? Is signup hosted, embedded, admin-created, invited, or disabled? |
| Signin | Which flow is used: OIDC Authorization Code with PKCE, hosted UI, local form, device flow, or another pattern? |
| Current user | How does the app learn who is signed in? Which claims identify the user? |
| Logout | Is logout app-local, provider-hosted, federated, or both? What return URLs are allow-listed? |
| Roles and claims | Where are roles/permissions defined? How do they appear in tokens or user info? |
| Backend verification | Can Spring Boot validate issuer, audience, signature, expiration, and claims without trusting the browser? |
| Local development | Can it run locally without paid infrastructure? What local services or provider setup are required? |
| Deployment impact | What callback, logout, origin, CORS, DNS, HTTPS, or CloudFront changes are needed? |
| Secret handling | Which values are public runtime config, and which are real secrets that must never be committed? |
| Operational ownership | Who patches, backs up, monitors, rotates keys/secrets, manages users, and responds to outages? |
| Cost | What is free for learning, what becomes paid, and what usage limit creates surprise cost? |
| Portability | Can this app move to another domain, tenant, cloud account, or umbrella brand? |
| User experience | Does the provider support social login, MFA, password reset, account recovery, and clear error states? |
| Security risk | What are the main risks: token storage, open redirects, weak passwords, tenant misconfig, admin exposure, or dependency drift? |
| Fit for this repo | Is it a main-hub candidate, Shared Identity pattern, learning lab, or poor fit? |

## Prototype Boundary Decision

Before a provider experiment becomes runnable, classify it.

| Classification | Where It Lives | Example |
| --- | --- | --- |
| Docs-only comparison | `radhikari89/codex-demo` docs and Project 1 | Provider tradeoff note, cost comparison, setup checklist. |
| Hub category UI only | `radhikari89/codex-demo` | Security category page linking to notes or external labs. |
| Independent runnable lab | New repo and project before coding | Keycloak demo app, Okta prototype app, Cognito hosted UI lab. |
| Existing app integration | Owning app repo/project | Main hub Auth0 implementation, Shared Identity app Auth0 account UX. |

Plain version: notes stay here; real runnable lab apps should usually get their own repo and project board before implementation.

## Promotion Criteria

A provider prototype can influence the main app or Shared Identity architecture only after it proves:

- signup and signin behavior are understood
- logout and session behavior are understood
- backend token or identity verification is understood
- roles/claims mapping is understood
- local setup is repeatable
- deployed callback/logout/origin configuration is understood
- secrets and public runtime config are clearly separated
- operational owner responsibilities are documented
- cost and portability tradeoffs are documented
- security risks and residual questions are documented

Plain version: do not promote a provider because login worked once. Promote it only after we understand local, deployed, backend, security, cost, and ownership behavior.

## Minimum Evidence

Docs-only comparisons should include:

- completed checklist sections
- provider links or setup references
- known assumptions and skipped checks
- recommendation: reject, keep for learning, prototype later, or candidate for production path

Runnable labs should include:

- repo and project link
- local run instructions
- build/test instructions
- provider setup notes without secrets
- local smoke evidence
- deployed smoke evidence if hosted
- security review notes
- rollback or teardown notes

## First Recommended Sequence

1. Complete the shared evaluation matrix.
2. Compare managed providers against the matrix.
3. Re-scope the Keycloak story as either docs-only or independent runnable lab bootstrap.
4. Prototype only the provider that has a clear learning goal and boundary.
5. Feed findings back into the main hub and Shared Identity docs only through reviewed decisions.
