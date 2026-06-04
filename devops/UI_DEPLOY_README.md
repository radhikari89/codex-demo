# Angular UI Deployment To AWS

Use this runbook to build and deploy the Angular UI as a static site in AWS.

## Quick Links

- [Bucket-Specific Quick Reference](#bucket-specific-quick-reference)
- [Build The UI](#build-the-ui)
- [Upload The UI Build To S3](#upload-the-ui-build-to-s3)
- [CloudFront Setup](#cloudfront-setup)
- [Auth0 Runtime Config](#auth0-runtime-config)
- [SPA Route Fallback](#spa-route-fallback)
- [Verify Deployment](#verify-deployment)

## When To Use This File

Open this document when you need to:

- deploy or redeploy the Angular UI
- upload the UI build output to S3
- configure CloudFront to serve the UI
- keep UI routes like `/login`, `/signup`, and `/dashboard` working on refresh
- support same-domain API calls like `/api/v1/users`
- deploy Auth0 runtime config for the Angular app

## Target Architecture

Recommended request flow:

- `https://<domain>/` -> CloudFront -> S3 UI origin
- `https://<domain>/login` -> CloudFront -> S3 UI origin -> Angular router
- `https://<domain>/dashboard` -> CloudFront -> S3 UI origin -> Angular router
- `https://<domain>/api/v1/users` -> CloudFront -> backend origin

The Angular app should use relative API URLs such as `/api/v1/users`. Do not hardcode `localhost`, EC2 DNS names, or AWS domains in UI source code.

The Angular app reads Auth0 settings from `/app-config.json` at startup. This file contains non-secret runtime values and can differ by environment without rebuilding the Angular bundle.

## Prerequisites

- AWS CLI is configured locally.
- The backend is deployed and reachable through EC2, Nginx, or an ALB.
- An S3 bucket exists or will be created for UI static files.
- A CloudFront distribution exists or will be created for the public domain.
- If using a custom domain, an ACM certificate exists in `us-east-1`.

Replace these placeholders in commands:

```text
<ui-bucket-name>
<cloudfront-distribution-id>
<domain>
```

Current CloudFront distribution domain:

```text
d349cikug2iot6.cloudfront.net
```

CloudFront invalidation commands require the distribution ID, not the distribution domain name. If you only know the domain name, find the ID with:

```powershell
aws cloudfront list-distributions --query "DistributionList.Items[?DomainName=='d349cikug2iot6.cloudfront.net'].Id" --output text
```

## Build The UI

From the repository root:

```powershell
cd ui
npm install
npm run build
cd ..
```

The production build output should be under:

```text
ui/dist/my-app/browser
```

Verify the output:

```powershell
Get-ChildItem dist\my-app\browser
```

You should see `index.html`, JavaScript bundles, CSS bundles, and static assets.

## First-Time S3 Setup

Create the UI bucket if it does not already exist:

```powershell
aws s3 mb s3://<ui-bucket-name>
```

For production, prefer keeping the S3 bucket private and serving it through CloudFront using Origin Access Control.

If you are doing a simple temporary static website setup, configure static website hosting:

```powershell
aws s3 website s3://<ui-bucket-name> --index-document index.html --error-document index.html
```

For a CloudFront private-origin setup, static website hosting is not required. CloudFront should use the S3 bucket origin directly and be allowed to read from the bucket through Origin Access Control.

## Upload The UI Build To S3

From the repository root after building:

```powershell
aws s3 sync ui/dist/my-app/browser s3://<ui-bucket-name> --delete
```

This uploads new files and removes deleted files from the bucket.

After upload, replace `app-config.json` with the environment-specific Auth0 values for that environment.

## Recommended Cache Headers

Angular production builds generate hashed JavaScript and CSS bundle names. These can be cached longer than `index.html`.

Simple deployment command:

```powershell
aws s3 sync ui/dist/my-app/browser s3://<ui-bucket-name> --delete
```

More controlled option:

These are intentionally split into two commands because `index.html` and hashed static assets need different cache behavior. Keep `index.html` easy to refresh so users receive the latest bundle references after a deploy. Cache hashed JavaScript, CSS, and asset files aggressively because their filenames change when their content changes.

```powershell
aws s3 cp ui/dist/my-app/browser/index.html s3://<ui-bucket-name>/index.html --cache-control "no-cache"
aws s3 sync ui/dist/my-app/browser s3://<ui-bucket-name> --exclude "index.html" --exclude "app-config.json" --delete --cache-control "public,max-age=31536000,immutable"
```

Use the simple command first unless browser caching becomes a deployment problem.

## Auth0 Runtime Config

The UI build includes `app-config.json` at the site root. It is intentionally non-secret and should contain environment-specific Auth0 values:

```json
{
  "auth0": {
    "domain": "<tenant-domain>",
    "clientId": "<spa-client-id>",
    "audience": "https://webdevisfun.com/api",
    "redirectUri": "https://<domain>/callback",
    "logoutReturnTo": "https://<domain>"
  }
}
```

Local example:

```json
{
  "auth0": {
    "domain": "<local-auth0-domain>",
    "clientId": "<local-spa-client-id>",
    "audience": "https://webdevisfun.com/api",
    "redirectUri": "http://localhost:4200/callback",
    "logoutReturnTo": "http://localhost:4200"
  }
}
```

Production example:

```json
{
  "auth0": {
    "domain": "<prod-auth0-domain>",
    "clientId": "<prod-spa-client-id>",
    "audience": "https://webdevisfun.com/api",
    "redirectUri": "https://webdevisfun.com/callback",
    "logoutReturnTo": "https://webdevisfun.com"
  }
}
```

For S3/CloudFront deploys, upload `app-config.json` with `no-cache` so config changes do not require waiting on browser cache:

```powershell
aws s3 cp ui/dist/my-app/browser/app-config.json s3://<ui-bucket-name>/app-config.json --cache-control "no-cache"
```

If you prepare an environment-specific config outside the build folder, upload that file instead:

```powershell
aws s3 cp .\app-config.prod.json s3://<ui-bucket-name>/app-config.json --cache-control "no-cache"
```

Auth0 dashboard settings for the deployed domain:

```text
Allowed Callback URLs: https://<domain>/callback
Allowed Logout URLs: https://<domain>
Allowed Web Origins: https://<domain>
Allowed Origins (CORS): https://<domain>
```

## CloudFront Setup

Create or update a CloudFront distribution with at least two origins:

- UI origin -> S3 UI bucket
- backend origin -> ALB DNS name, EC2 public DNS name, or Nginx endpoint

Default behavior:

- path pattern -> `Default (*)`
- target origin -> UI S3 origin
- viewer protocol policy -> `Redirect HTTP to HTTPS`
- allowed methods -> `GET, HEAD`

Backend API behavior:

- path pattern -> `/api/*`
- target origin -> backend origin
- viewer protocol policy -> `Redirect HTTP to HTTPS`
- allowed methods -> `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`
- cache policy -> disabled or low TTL
- origin request policy -> forward query strings and required headers, including `Authorization`

Authenticated API responses should not be cached by CloudFront. Keep `/api/*` on disabled caching or a low/private cache policy before enabling authenticated endpoints.

For backend documentation and health endpoints, optionally route these paths to the backend origin too:

- `/actuator/*`
- `/swagger-ui.html`
- `/v3/api-docs*`

More path-routing detail lives in [CUSTOM_DOMAIN_PATH_ROUTING.md](CUSTOM_DOMAIN_PATH_ROUTING.md).

## SPA Route Fallback

Angular owns routes such as `/login`, `/signup`, and `/dashboard`. If a user refreshes one of those paths, CloudFront/S3 must return `index.html` so Angular can render the route.

Configure CloudFront custom error responses:

- HTTP error code -> `403`
- response page path -> `/index.html`
- HTTP response code -> `200`

If using S3 static website hosting, also configure:

- index document -> `index.html`
- error document -> `index.html`

## Invalidate CloudFront

After uploading a new UI build, invalidate CloudFront:

```powershell
aws cloudfront create-invalidation --distribution-id <cloudfront-distribution-id> --paths "/*"
```

For lower-cost invalidations later, invalidate only `index.html` when hashed asset filenames are used:

```powershell
aws cloudfront create-invalidation --distribution-id <cloudfront-distribution-id> --paths "/index.html"
```

## Verify Deployment

Open these URLs:

```text
https://<domain>/
https://<domain>/login
https://<domain>/signup
https://<domain>/dashboard
https://<domain>/callback
https://<domain>/app-config.json
https://<domain>/api/v1/users
```

Expected behavior:

- `/` loads the Angular home page.
- `/login` and `/signup` load directly after refresh.
- `/dashboard` loads the Angular app and redirects according to auth state.
- `/callback` loads the Angular app so Auth0 can finish redirect handling.
- `/app-config.json` returns the environment-specific Auth0 config with no secrets.
- `/api/v1/users` reaches the Spring Boot backend, not the Angular app.

## Local Development Note

Local UI development uses `ui/proxy.conf.json` to forward `/api` from `localhost:4200` to `localhost:8080`.

That proxy is only used by `ng serve`. It is not bundled into production builds and is not part of AWS deployment.

## Related Runbooks

- Deployment overview: [DEPLOY_README.md](DEPLOY_README.md)
- Backend EC2 deployment: [EC2_README.md](EC2_README.md)
- Custom-domain path routing: [CUSTOM_DOMAIN_PATH_ROUTING.md](CUSTOM_DOMAIN_PATH_ROUTING.md)
- AWS helper commands: [AWS_COMMANDS.md](AWS_COMMANDS.md)

## Bucket-Specific Quick Reference

Current UI bucket:

```text
codex-demo-ui
```

Current CloudFront distribution domain:

```text
d349cikug2iot6.cloudfront.net
```

Build the UI:

```powershell
cd ui
npm install
npm run build
cd ..
```

Verify the build output:

```powershell
Get-ChildItem ui\dist\my-app\browser
```

Create the bucket if it does not already exist:

```powershell
aws s3 mb s3://codex-demo-ui
```

Configure temporary S3 static website hosting if needed:

```powershell
aws s3 website s3://codex-demo-ui --index-document index.html --error-document index.html
```

Upload the UI build:

```powershell
aws s3 sync ui/dist/my-app/browser s3://codex-demo-ui --delete
```

Upload with cache headers:

These two commands are split on purpose. `index.html` uses `no-cache` so the app shell can be refreshed after deploys, while hashed bundles and assets use long-lived immutable caching for better performance.

```powershell
aws s3 cp ui/dist/my-app/browser/index.html s3://codex-demo-ui/index.html --cache-control "no-cache"
aws s3 cp ui/dist/my-app/browser/app-config.json s3://codex-demo-ui/app-config.json --cache-control "no-cache"
aws s3 sync ui/dist/my-app/browser s3://codex-demo-ui --exclude "index.html" --exclude "app-config.json" --delete --cache-control "public,max-age=31536000,immutable"
```

Find the CloudFront distribution ID from the distribution domain:

```powershell
aws cloudfront list-distributions --query "DistributionList.Items[?DomainName=='d349cikug2iot6.cloudfront.net'].Id" --output text
```

Invalidate CloudFront after upload:

```powershell
aws cloudfront create-invalidation --distribution-id <cloudfront-distribution-id> --paths "/*"
```
