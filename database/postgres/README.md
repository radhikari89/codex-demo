# Local PostgreSQL

This directory contains the local PostgreSQL 16 Docker setup for the project.

## What this setup does

- Starts a PostgreSQL container named `myapp-postgres`
- Exposes PostgreSQL on `localhost:5432`
- Uses values from `.env` for the database name, user, password, and host port
- Persists data in a named Docker volume
- Does not create application tables or schema objects during container startup

## Files

- `docker-compose.yml`: local PostgreSQL container definition
- `.env`: local development database settings
- `init/001_init.sql`: intentionally neutralized so Docker only provisions PostgreSQL
- `util-postgres.sql`: commonly used local PostgreSQL helper queries

## Commands

Run all commands from `database/postgres`.

### Start the database

```powershell
docker compose up -d
```

### Check running containers

```powershell
docker ps
```

### Follow database logs

```powershell
docker compose logs -f
```

### Stop the database

```powershell
docker compose down
```

### Open a `psql` shell in the container

```powershell
docker exec -it myapp-postgres psql -U myappuser -d myappdb
```

### Verify the initialization script ran

Run this after opening `psql` and after the backend has started once:

```sql
SELECT * FROM flyway_schema_history;
SELECT * FROM users;
```

### Reset the database completely

This removes the container and the named volume. Use it when you want a clean database and want the `init/` scripts to run again.

```powershell
docker compose down -v
```

If you switch an existing local database to Flyway-managed schema changes and see an error about a non-empty schema with no schema history table, reset the volume and start again so Flyway can initialize the schema from scratch.

## Connection details

- Host: `localhost`
- Port: `5432`
- Database: `myappdb`
- Username: `myappuser`
- Password: `myapppassword`
- SSL: disable for local development unless your client requires a different setting

## Important note about init scripts

Scripts mounted into `/docker-entrypoint-initdb.d` only run on first initialization of a fresh PostgreSQL data directory.

That means:

- If the named volume already exists, changing files in `init/` will not re-run them automatically
- Use `docker compose down -v` to reset the volume and trigger initialization again

Application tables are no longer created here. Start PostgreSQL first, then start the Spring Boot backend so Flyway can apply migrations.

## Note about the `.env` file

The current `.env` values are local development defaults and are intentionally committed for convenience right now. If this repository later needs environment-specific secrets, move sensitive values into a non-committed secret management approach.
