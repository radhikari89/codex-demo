-- Local PostgreSQL helper queries for my-app.
-- Open this file in your SQL client or paste sections into psql as needed.

-- Show all databases.
SELECT datname
FROM pg_database
WHERE datistemplate = false
ORDER BY datname;

-- Show the current database.
SELECT current_database();

-- Create new database
CREATE DATABASE myappdb;

-- Show installed tables in the public schema.
SELECT tablename
FROM pg_catalog.pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Show Flyway migration history.
SELECT installed_rank, version, description, type, success, installed_on
FROM flyway_schema_history
ORDER BY installed_rank;

-- Inspect all users.
SELECT id, username, email, created_at, updated_at
FROM users
ORDER BY id;

-- Count users.
SELECT COUNT(*) AS user_count
FROM users;

-- Find a user by username.
SELECT id, username, email, created_at, updated_at
FROM users
WHERE username = 'alice';

-- Insert a test user manually.
INSERT INTO users (username, email, password_hash)
VALUES ('demo-user', 'demo-user@myapp.local', 'demo-hash');

-- Update a user's email.
UPDATE users
SET email = 'alice.updated@myapp.local'
WHERE username = 'alice';

-- Delete a test user.
DELETE FROM users
WHERE username = 'demo-user';
