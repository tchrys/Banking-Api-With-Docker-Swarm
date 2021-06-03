CREATE TABLE IF NOT EXISTS account (
    id serial PRIMARY KEY,
    user_id integer,
    amount integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS transfer (
    id serial PRIMARY KEY,
    account_from integer REFERENCES account(id),
    account_to integer REFERENCES account(id),
    amount integer DEFAULT 0 NOT NULL,
    date_time TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS withdrawal (
    id serial PRIMARY KEY,
    account_id integer references account(id),
    amount integer DEFAULT 0 NOT NULL,
    date_time TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS deposit (
    id serial PRIMARY KEY,
    account_id integer references account(id),
    amount integer DEFAULT 0 NOT NULL,
    date_time TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS credit (
    id serial PRIMARY KEY,
    account_id integer references account(id),
    amount integer DEFAULT 0 NOT NULL,
    interest integer DEFAULT 0 NOT NULL,
    months integer NOT NULL
);