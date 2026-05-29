# Auth Provider Notes

Status: Living notes

Related discovery: [Authentication Strategy Discovery](../../drafts/auth-strategy-discovery.md)

## OAuth2 vs OIDC

- OAuth2 is commonly described as an authorization framework: it lets a client application obtain permission to call protected APIs or access protected resources, often on behalf of a user.
- OIDC is commonly described as an authentication layer on top of OAuth2: it adds a standard way for the client application to learn who the signed-in user is.
- For login, OIDC is usually the important piece because it provides an identity token and standard user claims.
- For backend APIs, OAuth2 access tokens are usually the important piece because the backend can verify whether the caller is allowed to access protected resources.

Plain version:

- Authentication answers: "Who is this user?"
- Authorization answers: "What is this user or app allowed to access?"
- OAuth2 answers: "What can this app access?"
- OIDC answers: "Who is this user?"

In this repo's likely login flow:

- The user signs in with an identity provider such as Auth0, Cognito, Okta, or Keycloak.
- The Angular frontend is the client application that starts the login flow.
- The Spring Boot backend is the protected API/resource server.
- The identity provider is the authorization server and OIDC provider.

Token format notes:

- OAuth2 access tokens are often JWTs, but they can also be opaque provider-owned strings.
- OIDC ID tokens are JWTs that carry user identity claims such as subject, issuer, audience, expiration, email, and name.
- If the access token is a JWT, the backend can usually validate it directly.
- If the access token is opaque, the backend usually asks the provider to introspect it.

## Current Provider Cost Notes

Pricing changes, so verify official provider pricing before making a production decision.

| Provider | Current free/cheap signal | Notes for this repo |
| --- | --- | --- |
| Auth0 | Strong free developer tier for small apps | Best fit if speed and hosted login experience matter most. Good candidate for the main web prototype hub. |
| Okta | Developer/testing access exists, but production pricing is more enterprise/workforce oriented | Best fit if the goal is learning enterprise IAM, workforce SSO, organization login, policy administration, or B2B identity patterns. Less likely to be the cheapest first choice for the public prototype hub. |
| AWS Cognito | AWS-native free tier for user pools | Best fit if AWS alignment and long-term infrastructure consistency matter most. More AWS-specific setup than Auth0. |
| Firebase / Google Identity Platform | Generous free tier for common email/social login | Good for frontend-heavy apps, less aligned with Spring Boot as the backend authority. |
| Supabase Auth | Generous free tier for small apps | Good if using Supabase stack; less natural for the current AWS/Spring Boot shape. |
| Keycloak | Software is free/open-source | Good Security Prototype candidate. Production use requires hosting, upgrades, backups, monitoring, and admin hardening. |

## Auth0 vs Okta

Auth0 and Okta are related, but they should not be evaluated as the same option.

- Auth0 is the better first comparison point for public app login, hosted OIDC/OAuth flows, social login, and developer-friendly setup.
- Okta is the better comparison point for enterprise identity patterns: workforce SSO, organization-managed users, admin policies, app assignments, and B2B identity integrations.
- For this repo, Auth0 is a stronger main-hub login candidate than Okta if the goal is quick third-party OIDC.
- Okta still belongs in the Security Prototypes section because enterprise identity is worth learning separately.

## Working Recommendation

For the main web prototype hub, prefer a hosted OIDC provider instead of waiting for the Spring Security prototype work.

- Prefer Auth0 if the goal is fastest clean third-party login with a friendly developer experience.
- Prefer AWS Cognito if the goal is AWS-native auth with tighter alignment to the existing AWS deployment.
- Prototype Okta separately if the goal is enterprise IAM/SSO learning rather than cheapest public app login.
- Keep Keycloak in the Security Prototypes section first, not as the main hub login default.

The Security Prototypes section can still evaluate Spring Security-owned auth, Keycloak, Cognito, Auth0, Okta, Firebase, and Supabase without forcing the main hub to wait for every prototype.

## Decision Notes

2026-05-29:

- Main hub login solution: use Auth0 now.
- Portfolio wording: mention this as Okta/Auth0 OIDC integration.
- Technical shape: Angular SPA -> Auth0 login -> JWT access token -> Spring Boot Resource Server -> secured REST APIs.
