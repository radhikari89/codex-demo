# Feature Map Draft

Status: Draft

Related story: [#29](https://github.com/radhikari89/codex-demo/issues/29)

## Feature Summary

| Feature | Status | Purpose |
| --- | --- | --- |
| Authentication And Authorization | Draft | Provide industry-standard sign up, sign in, social login, authorization, and secure session behavior. |
| Application Shell And Navigation | Draft | Create a professional home page, authenticated dashboard, and navigation model for app categories. |
| Security And Auth Provider Lab | Draft | Prototype security-focused applications and compare authentication/authorization providers without destabilizing the main app. |
| AI Prototypes | Draft | Host AI applications and use AI agents to recommend future apps. |
| Blockchain Prototypes | Draft | Host blockchain-based experiments and applications. |
| Misc Apps | Draft | Host smaller apps and experiments, including the future Work Orders app. |
| Reusable App Template | Draft | Extract repeatable app foundation patterns for future app creation. |
| Independent App Verification | Draft | Ensure each app area can be tested and verified independently where practical. |
| Design And Wireframing | Draft | Decide how visual design and workflow drafts should be created and approved. |

## Epic Summary

| Epic | Priority | Purpose | Initial Stories |
| --- | --- | --- | --- |
| [#44 Authentication And Authorization Foundation](https://github.com/radhikari89/codex-demo/issues/44) | 1 | Replace the temporary auth bridge with a secure approved auth flow for the main app. | #38, auth contract, backend auth, UI auth, auth verification |
| [#45 Application Shell And Navigation](https://github.com/radhikari89/codex-demo/issues/45) | 2 | Turn the app into a professional hub with home, auth entry, dashboard, and app category navigation. | #40, app shell implementation, dashboard MVP, category routes |
| [#46 Security And Auth Provider Lab](https://github.com/radhikari89/codex-demo/issues/46) | 3 | Create an isolated prototype category for auth provider and authorization prototypes. | #52, #53, #54, #55 |
| [#47 App Boundary And Independent Verification](https://github.com/radhikari89/codex-demo/issues/47) | 4 | Define how app areas can be tested, documented, and split when justified. | #39, per-app verification template, first boundary proof |
| [#48 Reusable App Template](https://github.com/radhikari89/codex-demo/issues/48) | 5 | Extract repeatable app foundation pieces after enough real patterns exist. | #37, template milestone, generated app checklist |
| [#49 AI Prototypes](https://github.com/radhikari89/codex-demo/issues/49) | Later | Host AI-focused applications and AI-assisted app recommendations. | First AI app discovery, recommendation workflow |
| [#50 Blockchain Prototypes](https://github.com/radhikari89/codex-demo/issues/50) | Later | Host blockchain-focused applications after tooling and security assumptions are clear. | First blockchain app discovery |
| [#51 Misc Apps And Work Orders](https://github.com/radhikari89/codex-demo/issues/51) | Later | Host smaller apps and integrate or link the Work Orders app. | Work Orders integration discovery |

## Feature: Authentication And Authorization

Priority: 1

Current state:

- UI has a temporary auth flow.
- Backend has users but not full industry-standard auth.

Desired state:

- Users can sign up and sign in securely.
- Google/Gmail sign-in is evaluated.
- Authorization rules are clear for public, signed-in, and admin paths.

Candidate work:

- Authentication provider decision
- Auth API and UI flow design
- Social login discovery
- Route protection and session handling
- Auth verification tests

## Feature: Application Shell And Navigation

Priority: 2

Desired state:

- Professional public home page
- Login/signup entry points
- Authenticated dashboard
- Navigation to AI, Blockchain, Misc, and future app areas

Candidate work:

- Wireframe home/dashboard/navigation
- Define dashboard information architecture
- Implement app category navigation
- Add responsive layout and navigation states

## Feature: Security And Auth Provider Lab

Priority: 3

Current state:

- Authentication strategy discovery now identifies provider options and an auth-lab prototype approach.
- Security is not yet represented as an app category in the navigation model or feature docs.

Desired state:

- Security appears as a first-class prototype category.
- Auth provider prototypes are isolated from the main application auth flow.
- Spring Security-owned auth, Google OIDC, Keycloak, Cognito, Auth0, Okta, and Firebase/Supabase can be compared with the same checklist.
- Provider prototypes document local development, deployment shape, secrets, roles/claims, logout, backend identity verification, and operational ownership.

Candidate work:

- Define auth-lab evaluation matrix.
- Add Security category to app navigation and dashboard model.
- Prototype Keycloak as the first external identity provider.
- Prototype or document managed IdP comparisons against Cognito, Auth0, Okta, and Firebase/Supabase.
- Decide which provider pattern should graduate into the main app after review.

## Feature: AI Prototypes

Priority: Later

Desired state:

- AI applications can be hosted under this category.
- AI agents can recommend what kind of app to create next.

Candidate work:

- Define first AI app idea
- Define recommendation workflow
- Decide whether AI apps use shared or dedicated backend services

## Feature: Blockchain Prototypes

Priority: Later

Desired state:

- Blockchain-based applications can be hosted under this category.

Candidate work:

- Define first blockchain app idea
- Identify blockchain tooling and environment needs
- Define security and wallet assumptions before implementation

## Feature: Misc Apps

Priority: Later

Desired state:

- Smaller apps can live here.
- Work Orders can be linked or integrated here as an early app.

Candidate work:

- Define Work Orders integration shape
- Decide whether Misc apps are embedded, routed, or externally linked

## Feature: Reusable App Template

Priority: Discovery

Desired state:

- Reusable patterns can be extracted from this app.
- Future apps can be created faster and tied back to the main hub.

Candidate work:

- Identify reusable shell/auth/deploy/test patterns
- Define app template contents
- Prototype generating or copying a second app from the template

## Feature: Independent App Verification

Priority: Architecture discovery

Desired state:

- Each app can document its own run, test, and smoke-test path.
- App boundaries can become microservices when justified.

Candidate work:

- Define app boundary types
- Add per-app verification section to feature docs
- Define when to introduce a dedicated service

## Feature: Design And Wireframing

Priority: Discovery

Desired state:

- Product and workflow ideas can be wireframed before implementation.

Candidate work:

- Decide Figma versus repo-native diagrams for wireframes
- Create first dashboard/navigation wireframe
- Define approval process for visual direction
