# Auth Provider Notes

Status: Living notes

Related discovery: [Authentication Strategy Discovery](../../drafts/auth-strategy-discovery.md)

## OAuth2 vs OIDC

- OAuth2 is mainly an authorization framework: it lets an application obtain permission to call APIs or access resources.
- OIDC is an authentication layer on top of OAuth2: it lets an application know who the signed-in user is.
- For login, OIDC is usually the important piece because it provides an identity token and standard user claims.
- For backend APIs, OAuth2 access tokens are usually the important piece because the backend can verify whether the caller is allowed to access protected resources.

Plain version:

- OAuth2 answers: "What can this app access?"
- OIDC answers: "Who is this user?"

## Current Provider Cost Notes

Pricing changes, so verify official provider pricing before making a production decision.

| Provider | Current free/cheap signal | Notes for this repo |
| --- | --- | --- |
| Auth0 | Strong free developer tier for small apps | Best fit if speed and hosted login experience matter most. Good candidate for the main web prototype hub. |
| AWS Cognito | AWS-native free tier for user pools | Best fit if AWS alignment and long-term infrastructure consistency matter most. More AWS-specific setup than Auth0. |
| Firebase / Google Identity Platform | Generous free tier for common email/social login | Good for frontend-heavy apps, less aligned with Spring Boot as the backend authority. |
| Supabase Auth | Generous free tier for small apps | Good if using Supabase stack; less natural for the current AWS/Spring Boot shape. |
| Keycloak | Software is free/open-source | Good Security Prototype candidate. Production use requires hosting, upgrades, backups, monitoring, and admin hardening. |

## Working Recommendation

For the main web prototype hub, prefer a hosted OIDC provider instead of waiting for the Spring Security prototype work.

- Prefer Auth0 if the goal is fastest clean third-party login with a friendly developer experience.
- Prefer AWS Cognito if the goal is AWS-native auth with tighter alignment to the existing AWS deployment.
- Keep Keycloak in the Security Prototypes section first, not as the main hub login default.

The Security Prototypes section can still evaluate Spring Security-owned auth, Keycloak, Cognito, Auth0/Okta, Firebase, and Supabase without forcing the main hub to wait for every prototype.
