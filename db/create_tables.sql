SET ROLE TO 'postgres';
SET client_encoding = 'UTF8';

BEGIN;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;


CREATE TYPE status AS ENUM (
    'ready',
    'unready',
    'inprocess'
);
ALTER TYPE status OWNER TO postgres;

CREATE TYPE priority AS ENUM (
    'minor',
    'major',
    'critical'
);
ALTER TYPE status OWNER TO postgres;

CREATE TYPE role AS ENUM (
    'dev',
    'manager',
    'viewer'
);
ALTER TYPE role OWNER TO postgres;


CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(50) UNIQUE NOT NULL
);
ALTER TABLE team OWNER TO postgres;

CREATE TABLE account (
    id SERIAL PRIMARY KEY NOT NULL,
    name_full CHARACTER VARYING(50) NOT NULL,
    nickname CHARACTER VARYING(24) NOT NULL,
    password CHARACTER VARYING(20) NOT NULL,
    role role DEFAULT 'viewer'::role
);
ALTER TABLE account OWNER TO postgres;

CREATE TABLE schedule_update (
    day INTEGER NOT NULL,
    hour INTEGER NOT NULL,
    minute INTEGER NOT NULL
);
ALTER TABLE schedule_update OWNER TO postgres;

CREATE TABLE release (
    id SERIAL PRIMARY KEY NOT NULL,
    tag CHARACTER VARYING(15) NOT NULL,
    time_created timestamp without time zone NOT NULL
);
ALTER TABLE release OWNER TO postgres;

COMMIT;
