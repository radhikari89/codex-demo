# Deployment Runbooks

The EC2 host setup, Spring Boot deployment steps, app verification commands, and optional Nginx reverse proxy configuration now live in:

- [EC2_README.md](EC2_README.md)

For custom-domain path routing where a static S3 site stays on the same domain and selected paths go to the backend, use:

- [CUSTOM_DOMAIN_PATH_ROUTING.md](CUSTOM_DOMAIN_PATH_ROUTING.md)

Important: Route 53 alone cannot route based on URL path. Use CloudFront in front of both the S3 site and the backend.
