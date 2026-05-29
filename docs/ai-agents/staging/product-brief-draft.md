# Product Brief Draft

Status: Draft

Related story: [#29](https://github.com/radhikari89/codex-demo/issues/29)

## Draft Product Direction

`webdevisfun.com` is a learning prototypes hub for modern web technologies. The application should start simple, then grow into a professional site where different experiments and app areas can be explored from one authenticated user experience.

The site currently has a deployed AWS-backed dynamic foundation with a home page, login page, and post-login landing page. The next direction is to improve that foundation into a reusable shell for authentication, navigation, dashboards, app categories, and independently testable app modules.

## Product Intent

- Build practical experience with high-demand, industry-standard web app features.
- Use real tools and patterns rather than toy-only examples.
- Start with simple vertical slices and add complexity when the app needs it.
- Host multiple app categories under one main hub.
- Eventually create an AI-assisted app creation playbook so new related apps can be planned and built faster with less human intervention.

## Target Experience

The application should feel like a professional prototypes hub:

- public home page that explains the app
- sign up and sign in with industry-standard authentication
- authenticated dashboard
- navigation to app categories
- app areas for AI, Blockchain, Misc, and future experiments

## Current Priority

1. Authentication and authorization
2. App workflow, dashboard, and navigation
3. Feature/app category structure
4. AI-assisted app creation playbook discovery
5. Independent app verification model

## Assumptions

- Google sign-in is the first social provider to evaluate because the vision mentions Gmail.
- More providers can be added later if the auth foundation supports them.
- Microservices should be introduced for app boundaries when independent testing, data ownership, deployment, or security needs justify them.
- The Work Orders app belongs under Misc until a more specific category exists.

## Open Questions

- Should wireframes be created in Figma, Mermaid, Draw.io, or a mix?
- Should authentication be built directly in Spring Security or delegated to a managed identity provider?
- What should be considered an app versus a page or feature?
- Which first app category should receive a complete vertical slice after authentication?
