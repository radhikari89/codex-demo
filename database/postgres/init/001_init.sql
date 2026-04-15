CREATE TABLE IF NOT EXISTS health_check (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO health_check (message)
VALUES ('postgres up');
