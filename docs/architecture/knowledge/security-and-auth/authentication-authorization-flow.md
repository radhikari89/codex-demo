# Authentication and Authorization Flow

Status: Living knowledge note

Related notes:

- [Auth Provider Notes](auth-provider-notes.md)
- [Auth0 OIDC Configuration](auth0-oidc-configuration.md)

## Plain Meaning

- Authentication answers: "Who is this user?"
- Authorization answers: "What is this authenticated user or client allowed to access?"

For the main hub, Auth0 handles login and identity. Spring Boot validates tokens and enforces protected API access.

## Main Hub Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Browser as Browser / Angular SPA
    participant Auth0 as Auth0 OIDC Provider
    participant API as Spring Boot API
    participant DB as PostgreSQL

    User->>Browser: Open protected dashboard
    Browser->>Auth0: Start OIDC login with PKCE
    Auth0->>User: Prompt for login / signup
    User->>Auth0: Complete login
    Auth0-->>Browser: Redirect to callback with authorization code
    Browser->>Auth0: Exchange code for tokens
    Auth0-->>Browser: Return ID token and access token

    Note over Browser,Auth0: Authentication: Auth0 proves who signed in.

    Browser->>API: Call /api/* with access token
    API->>Auth0: Load public signing keys / OIDC metadata
    API->>API: Validate signature, issuer, audience, expiration, claims

    Note over API: Authorization: backend decides whether the verified caller can access this API/resource.

    alt Allowed
        API->>DB: Read/write authorized data
        DB-->>API: Data
        API-->>Browser: 200 response
    else Not allowed
        API-->>Browser: 401 unauthenticated or 403 forbidden
    end
```

## Responsibility Diagram

```mermaid
flowchart LR
    user[User]
    browser[Angular SPA]
    auth0[Auth0 OIDC Provider]
    api[Spring Boot Resource Server]
    db[(PostgreSQL)]

    user -->|uses| browser
    browser -->|login/signup redirect| auth0
    auth0 -->|ID token: user identity| browser
    auth0 -->|access token: API access grant| browser
    browser -->|Authorization: Bearer access token| api
    api -->|validate token issuer/audience/signature/claims| auth0
    api -->|authorized data access| db

    subgraph Authentication
        auth0
    end

    subgraph Authorization
        api
        db
    end
```

## Token Roles

| Token | Main Consumer | Purpose |
| --- | --- | --- |
| ID token | Angular SPA | Helps the client know who signed in. |
| Access token | Spring Boot API | Lets the backend verify and authorize protected API calls. |

The backend should not trust the browser simply because the UI says the user is signed in. It should validate the access token on protected API calls and then apply resource-level rules.
