SET ROLE TO 'postgres';
SET client_encoding = 'UTF8';

BEGIN;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;


CREATE TYPE status AS ENUM (
    'ready',
    'unready',
    'in_process'
);
ALTER TYPE status OWNER TO postgres;

CREATE TYPE priority AS ENUM (
    'minor',
    'major',
    'critical'
);
ALTER TYPE priority OWNER TO postgres;

CREATE TYPE role AS ENUM (
    'dev',
    'manager',
    'viewer'
);
ALTER TYPE role OWNER TO postgres;


CREATE TABLE team (
    team_id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(50) UNIQUE NOT NULL
);
ALTER TABLE team OWNER TO postgres;

CREATE TABLE account (
    account_id SERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(50) NOT NULL,
    username CHARACTER VARYING(24) UNIQUE NOT NULL,
    password CHARACTER VARYING(20) NOT NULL,
    role role DEFAULT 'viewer'::role
);
ALTER TABLE account OWNER TO postgres;

CREATE TABLE team_account (
    id SERIAL PRIMARY KEY NOT NULL,
    team_id INTEGER NOT NULL
      REFERENCES team (team_id) ON DELETE CASCADE,
    account_id INTEGER NOT NULL
      REFERENCES account (account_id) ON DELETE CASCADE
);
ALTER TABLE team_account OWNER TO postgres;

CREATE TABLE bug (
    bug_id SERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(30) NOT NULL,
    description CHARACTER VARYING(240),
    team_id INTEGER NOT NULL
      REFERENCES team (team_id) ON DELETE CASCADE,
    priority priority NOT NULL,
    time_created timestamp without time zone NOT NULL
);
ALTER TABLE bug OWNER TO postgres;

CREATE TABLE bug_history (
    bug_id SERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(30) NOT NULL,
    description CHARACTER VARYING(240),
    team_id INTEGER NOT NULL
      REFERENCES team (team_id) ON DELETE CASCADE,
    priority priority NOT NULL,
    time_created timestamp without time zone NOT NULL,
    time_closed timestamp without time zone NOT NULL
);
ALTER TABLE bug_history OWNER TO postgres;

CREATE TABLE release (
    release_id SERIAL PRIMARY KEY NOT NULL,
    tag CHARACTER VARYING(9) NOT NULL UNIQUE,
    time_created timestamp without time zone NOT NULL
);
ALTER TABLE release OWNER TO postgres;

CREATE TABLE team_release_status (
    id SERIAL PRIMARY KEY NOT NULL,
    team_id INTEGER NOT NULL
      REFERENCES team (team_id) ON DELETE CASCADE,
    release_id INTEGER NOT NULL
      REFERENCES release (release_id) ON DELETE CASCADE,
    status status DEFAULT 'in_process'::status,
    comment CHARACTER VARYING(240),
    submitter_id INTEGER
      REFERENCES account (account_id) ON DELETE CASCADE,
    time_submit timestamp without time zone,
    time_delay INTEGER
);
ALTER TABLE team_release_status OWNER TO postgres;

CREATE TABLE team_release_status_history (
    id SERIAL PRIMARY KEY NOT NULL,
    team_id INTEGER NOT NULL
      REFERENCES team (team_id) ON DELETE CASCADE,
    release_id INTEGER NOT NULL
      REFERENCES release (release_id) ON DELETE CASCADE,
    status status DEFAULT 'in_process'::status,
    comment CHARACTER VARYING(240),
    submitter_id INTEGER NOT NULL
      REFERENCES account (account_id) ON DELETE CASCADE,
    time_submit timestamp without time zone NOT NULL,
    time_delay INTEGER
);
ALTER TABLE team_release_status OWNER TO postgres;

CREATE TABLE schedule_update (
    day INTEGER NOT NULL,
    hour INTEGER NOT NULL,
    minute INTEGER NOT NULL
);
ALTER TABLE schedule_update OWNER TO postgres;

COMMIT;
