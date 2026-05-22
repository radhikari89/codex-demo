# Deployment View

This document captures local and deployed topology.

## Local Development

```mermaid
flowchart LR
  developer[Developer Browser]
  angular[Angular Dev Server\nlocalhost:4200]
  proxy[Angular Proxy\n/api]
  service[Spring Boot User Service\nlocalhost:8080]
  db[(Local PostgreSQL\nlocalhost:5432)]

  developer -->|http://localhost:4200| angular
  angular -->|relative /api/v1/* calls| proxy
  proxy -->|forwards to localhost:8080| service
  service -->|JPA/Flyway| db
```

## AWS Deployment

```mermaid
flowchart LR
  browser[Browser]
  cloudfront[CloudFront]
  s3[S3 UI Bucket]
  backend[Backend Origin\nSpring Boot]
  db[(AWS PostgreSQL)]

  browser -->|HTTPS| cloudfront
  cloudfront -->|default behavior| s3
  cloudfront -->|/api/* and backend docs paths| backend
  backend --> db
```

## Notes

- UI source code should call relative API paths like `/api/v1/users`.
- Local Angular development uses `ui/proxy.conf.json` to forward `/api` to `localhost:8080`.
- Deployed routing uses CloudFront path behaviors to send UI traffic to S3 and backend traffic to the Spring Boot origin.

## Related Docs

- [UI deployment](../../../devops/UI_DEPLOY_README.md)
- [Custom domain path routing](../../../devops/CUSTOM_DOMAIN_PATH_ROUTING.md)
- [Backend EC2 deployment](../../../devops/EC2_README.md)
