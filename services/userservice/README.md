# userservice

Spring Boot backend starter for the `codex-demo` repository. This service lives under `services/` so the repo can grow into a microservices-friendly structure over time.

## Prerequisites

- Java 21 or newer
- Maven 3.9 or newer
- PostgreSQL running locally

PostgreSQL Docker setup and commands live in [../../database/postgres/README.md](../../database/postgres/README.md).

## Local configuration

The application runs with the `local` profile by default. Update the values in [`src/main/resources/application-local.properties`](src/main/resources/application-local.properties) if your local PostgreSQL settings differ.

Default values:

- Port: `8080`
- Database: `myappdb`
- Username: `myappuser`
- Password: `myapppassword`

Flyway now owns application schema changes. Docker starts only PostgreSQL; tables are created by backend migrations on application startup.

## Run locally

```powershell
cd database/postgres
docker compose up -d

cd services/userservice
mvn spring-boot:run
```

## Build and test

```powershell
cd services/userservice
mvn clean test
```

## Local URLs

- Root URL: `http://localhost:8080/` redirects to Swagger UI
- Health endpoint: `http://localhost:8080/api/v1/health`
- Users endpoint: `http://localhost:8080/api/v1/users`
- Actuator health: `http://localhost:8080/actuator/health`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI docs: `http://localhost:8080/v3/api-docs`

## Notes

- REST, validation, JPA, PostgreSQL, actuator, and Swagger/OpenAPI dependencies are included.
- The package structure is ready for future controller, service, repository, domain, and exception work.
- A starter health endpoint is implemented for quick verification after startup.
