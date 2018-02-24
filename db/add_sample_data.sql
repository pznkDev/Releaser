SET ROLE TO 'postgres';

BEGIN;

-- accounts
INSERT INTO "account" (name, nickname, password, role) VALUES
  ('JAMES BOND', '007_agent', 'pass', 'dev');

COMMIT;
