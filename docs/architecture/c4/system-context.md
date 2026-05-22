# System Context

This diagram shows the current application at a high level.

```mermaid
flowchart LR
  visitor[Public Visitor]
  user[Signed-in User]
  owner[Application Owner]

  app[webdevisfun.com\nWeb Prototype Hub]

  aws[AWS Hosting]
  postgres[(PostgreSQL)]

  visitor -->|views public pages| app
  user -->|uses dashboard and app areas| app
  owner -->|plans features and reviews PRs| app

  app -->|hosted on| aws
  app -->|stores user and app data| postgres
```

Rendered image:

![System context](../../diagrams/generated/system-context.svg)

## Notes

- The app is currently a deployed full-stack starter with Angular, Spring Boot, PostgreSQL, and AWS runbooks.
- The product direction is to become a learning playground and app hub for AI, Blockchain, Misc apps, and reusable app templates.
- Future app areas should define their own boundary and verification model.
