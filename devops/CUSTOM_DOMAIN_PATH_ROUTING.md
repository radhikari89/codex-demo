# Route A Specific Domain Path To The Spring Boot App

This project can already run the Spring Boot app on EC2 and serve a static site from S3. If you want one domain to keep serving the static site while sending only selected paths to the backend, do not try to solve that in Route 53 alone.

Route 53 can route by host name, not by URL path.

## Recommended setup

Use one CloudFront distribution with two origins:

- Default origin: the existing S3 static site
- Secondary origin: the Spring Boot backend

Then add CloudFront behaviors such as:

- `Default (*)` -> S3
- `/api/*` -> Spring Boot backend
- `/actuator/*` -> Spring Boot backend
- `/swagger-ui.html` -> Spring Boot backend
- `/v3/api-docs*` -> Spring Boot backend

Finally, point the Route 53 record for your domain to the CloudFront distribution.

## Why CloudFront is the right fit

- Keeps the existing static site on the same domain
- Supports path-based routing
- Lets you keep HTTPS on your custom domain
- Avoids exposing the backend directly as the main public origin

## Backend origin choices

You have two practical options for the backend origin:

1. Better for production: put an Application Load Balancer in front of EC2 and use the ALB as the CloudFront origin
2. Simpler for now: use the EC2 public DNS name as a CloudFront custom origin

The ALB option is more stable because EC2 public DNS and public IP can change if the instance is replaced.

## Typical AWS changes

## 1. Create Or Reuse An ACM Certificate

Create the certificate in `us-east-1` for the domain used by CloudFront, for example:

- `example.com`
- `www.example.com`

## 2. Create A CloudFront Distribution

Origins:

- S3 origin for the static site bucket
- Custom origin for backend:
  - ALB DNS name, or
  - EC2 public DNS name

Default behavior:

- Target origin: S3
- Viewer protocol policy: `Redirect HTTP to HTTPS`

Additional behaviors:

- Path pattern: `/api/*`
- Path pattern: `/actuator/*`
- Path pattern: `/swagger-ui.html`
- Path pattern: `/v3/api-docs*`
- Target origin for each of those: backend origin

Recommended cache settings for backend paths:

- Allowed methods: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`
- Cache: disabled or very low TTL for API paths
- Forward query strings: yes
- Forward headers: at least what your app needs, commonly `Host`, `Authorization`, and CORS-related headers

## 3. Update Route 53

Change the existing `A`/`AAAA` alias record for the domain so it points to the CloudFront distribution instead of directly to S3 website hosting.

After that:

- `https://your-domain/` continues to serve the static site
- `https://your-domain/api/v1/users` goes to Spring Boot

## Important note about S3 website endpoints

If your current Route 53 record points directly to an S3 website endpoint, that setup cannot do path-based routing to EC2.

To support mixed static-plus-backend routing on one domain, the domain should point to CloudFront.

## App-level note for this repository

The backend currently runs with:

- `server.servlet.context-path=/`
- controller routes like `/api/v1/users`

That means the cleanest public mapping is to send `/api/*` directly to the backend without adding another prefix like `/backend/*`.

If you want a prefix such as `/backend/*`, you will also need one of these:

- CloudFront path rewrite logic, or
- a reverse proxy such as Nginx, or
- a Spring Boot context path change

## Example end result

- Static site: `https://example.com/`
- Users API: `https://example.com/api/v1/users`
- Health check: `https://example.com/actuator/health`
- Swagger UI: `https://example.com/swagger-ui.html`
