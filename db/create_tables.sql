SET ROLE TO 'postgres';
SET client_encoding = 'UTF8';

BEGIN;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

COMMIT;
