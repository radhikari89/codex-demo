# Deployment Overview

Use this file as the starting point for deployment and infrastructure tasks in `devops`.

## When To Use This File

Open this document when you want to decide which deployment runbook to follow.

## Common Tasks

- Deploy or redeploy the Spring Boot app to EC2: [EC2_README.md](EC2_README.md)
- Inspect files packaged inside the deployed Spring Boot JAR on EC2: [EC2_README.md](EC2_README.md)
- Configure Nginx on EC2 to expose the app on port `80`: [EC2_README.md](EC2_README.md)
- Keep the static S3 site on the same domain and route selected paths to the backend: [CUSTOM_DOMAIN_PATH_ROUTING.md](CUSTOM_DOMAIN_PATH_ROUTING.md)
- Use common AWS CLI helper commands: [AWS_COMMANDS.md](AWS_COMMANDS.md)

## Runbook Guide

### EC2_README.md

Use [EC2_README.md](EC2_README.md) for:

- first-time EC2 setup
- JAR deployment from local machine to S3 to EC2
- inspecting files packaged inside the deployed JAR
- starting, stopping, and restarting the Spring Boot app
- health checks and log inspection
- optional Nginx reverse proxy setup on port `80`

### CUSTOM_DOMAIN_PATH_ROUTING.md

Use [CUSTOM_DOMAIN_PATH_ROUTING.md](CUSTOM_DOMAIN_PATH_ROUTING.md) for:

- keeping the S3 static site on the main domain
- routing only selected paths like `/api/*` to the Spring Boot backend
- understanding why Route 53 alone cannot do path-based routing
- planning CloudFront origin and behavior setup

## Recommended Reading Order

1. Deploy and verify the app on EC2 with [EC2_README.md](EC2_README.md)
2. Optionally add Nginx on EC2 if you want standard HTTP on port `80`
3. Configure custom-domain path routing with [CUSTOM_DOMAIN_PATH_ROUTING.md](CUSTOM_DOMAIN_PATH_ROUTING.md)

## Important Note

Route 53 alone cannot route based on URL path. If one domain should serve both the static S3 site and backend API paths, use CloudFront in front of both origins.
