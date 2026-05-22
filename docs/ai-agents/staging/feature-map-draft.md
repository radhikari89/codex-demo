# Feature Map Draft

Status: Draft

Related story: [#29](https://github.com/radhikari89/codex-demo/issues/29)

## Feature Summary

| Feature | Status | Purpose |
| --- | --- | --- |
| Authentication And Authorization | Draft | Provide industry-standard sign up, sign in, social login, authorization, and secure session behavior. |
| Application Shell And Navigation | Draft | Create a professional home page, authenticated dashboard, and navigation model for app categories. |
| AI Playground | Draft | Host AI applications and use AI agents to recommend future apps. |
| Blockchain Playground | Draft | Host blockchain-based experiments and applications. |
| Misc Apps | Draft | Host smaller apps and experiments, including the future Work Orders app. |
| Reusable App Template | Draft | Extract repeatable app foundation patterns for future app creation. |
| Independent App Verification | Draft | Ensure each app area can be tested and verified independently where practical. |
| Design And Wireframing | Draft | Decide how visual design and workflow drafts should be created and approved. |

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

## Feature: AI Playground

Priority: Later

Desired state:

- AI applications can be hosted under this category.
- AI agents can recommend what kind of app to create next.

Candidate work:

- Define first AI app idea
- Define recommendation workflow
- Decide whether AI apps use shared or dedicated backend services

## Feature: Blockchain Playground

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
