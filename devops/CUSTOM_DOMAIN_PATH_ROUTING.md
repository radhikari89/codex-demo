# Route A Specific Domain Path To The Spring Boot App

Use this runbook when you want one domain to keep serving the static S3 site while sending only selected URL paths to the Spring Boot backend.

## When To Use This File

Open this document when:

- the main domain already points to a static S3 site
- the backend is already reachable on EC2 or behind another HTTP origin
- you want paths like `/api/*` to go to the backend without moving the whole domain off S3

## Prerequisites

- the static site is already deployed
- the Spring Boot backend is already working on EC2
- you know which public paths should be served by the backend
- you are ready to put CloudFront in front of the S3 site and backend

## Key Limitation

Route 53 can route by host name, but not by URL path.

That means Route 53 alone cannot do this:

- `example.com/` -> S3
- `example.com/api/*` -> EC2

You need CloudFront, or another reverse proxy layer, to make path-based routing decisions.

## Recommended Architecture

Use one CloudFront distribution with two origins:

- default origin -> the existing S3 static site
- backend origin -> the Spring Boot backend

Then create CloudFront behaviors such as:

- `Default (*)` -> S3
- `/api/*` -> Spring Boot backend
- `/actuator/*` -> Spring Boot backend
- `/swagger-ui.html` -> Spring Boot backend
- `/v3/api-docs*` -> Spring Boot backend

Finally, point the Route 53 record for your domain to the CloudFront distribution.

## Why This Setup Works Well

- the static site stays on the same domain
- only selected backend paths are routed away from S3
- HTTPS can terminate at CloudFront
- the backend does not have to become the main public website origin

## Backend Origin Choices

You have two practical options for the backend origin:

1. Better for production: use an Application Load Balancer in front of EC2 and point CloudFront to the ALB
2. Simpler for now: use the EC2 public DNS name as a CloudFront custom origin

The ALB option is more stable because EC2 public DNS and public IP can change if the instance is replaced.

## CloudFront Setup Outline

### 1. Create Or Reuse An ACM Certificate

Create the certificate in `us-east-1` for the CloudFront domain names, for example:

- `example.com`
- `www.example.com`

### 2. Create The CloudFront Distribution

Origins:

- S3 origin for the static site bucket
- custom origin for the backend:
  - ALB DNS name, or
  - EC2 public DNS name

Default behavior:

- target origin -> S3
- viewer protocol policy -> `Redirect HTTP to HTTPS`

Additional behaviors:

- `/api/*` -> backend origin
- `/actuator/*` -> backend origin
- `/swagger-ui.html` -> backend origin
- `/v3/api-docs*` -> backend origin

Recommended backend behavior settings:

- allowed methods -> `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`
- cache -> disabled or low TTL for API paths
- query strings -> forward them
- headers -> forward the headers your app needs, commonly `Host`, `Authorization`, and CORS-related headers

### 3. Update Route 53

Change the existing `A` and `AAAA` alias record for the domain so it points to the CloudFront distribution instead of directly to the S3 website endpoint.

## App-Specific Notes For This Repository

The backend currently uses:

- `server.servlet.context-path=/`
- controller paths like `/api/v1/users`

That means the cleanest public mapping is:

- `https://example.com/api/v1/users` -> backend

without adding another prefix such as `/backend/*`.

If you want a prefix like `/backend/*`, you will also need one of these:

- CloudFront path rewrite logic
- a reverse proxy such as Nginx
- a Spring Boot context path change

## Expected End Result

- `https://example.com/` -> static site from S3
- `https://example.com/api/v1/users` -> Spring Boot backend
- `https://example.com/actuator/health` -> Spring Boot backend
- `https://example.com/swagger-ui.html` -> Spring Boot backend

## Troubleshooting

### Route 53 Already Points To An S3 Website Endpoint

That setup cannot do path-based routing to EC2 by itself.

To support mixed static-plus-backend routing on one domain, the domain should point to CloudFront instead.

## Related Runbooks

- Deployment overview: [DEPLOY_README.md](DEPLOY_README.md)
- EC2 setup and app deployment: [EC2_README.md](EC2_README.md)
