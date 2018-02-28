SET ROLE TO 'postgres';

BEGIN;

-- team
INSERT INTO "team" (name) VALUES ('backendeners');
INSERT INTO "team" (name) VALUES ('frontenders');
INSERT INTO "team" (name) VALUES ('QA');
INSERT INTO "team" (name) VALUES ('designers');

-- accounts
INSERT INTO "account" (name, username, password, role) VALUES
  ('Vasya', 'vasya_back', 'vasya_back', 'dev');
INSERT INTO "account" (name, username, password, role) VALUES
  ('Alfred', 'alfred_back', 'alfred_back', 'dev');
INSERT INTO "account" (name, username, password, role) VALUES
  ('Lua', 'lua_front', 'lua_front', 'dev');
INSERT INTO "account" (name, username, password, role) VALUES
  ('Alex', 'alex_front', 'alex_front', 'dev');
INSERT INTO "account" (name, username, password, role) VALUES
  ('Mike', 'mike_qa', 'mike_qa', 'dev');
INSERT INTO "account" (name, username, password, role) VALUES
  ('Rose', 'rose_qa', 'rose_qa', 'dev');
INSERT INTO "account" (name, username, password, role) VALUES
  ('Gwen', 'gwen_design', 'gwen_design', 'dev');
INSERT INTO "account" (name, username, password, role) VALUES
  ('Morty', 'morty_design', 'morty_design', 'dev');

-- team_account
INSERT INTO "team_account" (account_id, team_id) VALUES (1, 1);
INSERT INTO "team_account" (account_id, team_id) VALUES (2, 1);
INSERT INTO "team_account" (account_id, team_id) VALUES (3, 2);
INSERT INTO "team_account" (account_id, team_id) VALUES (4, 2);
INSERT INTO "team_account" (account_id, team_id) VALUES (5, 3);
INSERT INTO "team_account" (account_id, team_id) VALUES (6, 3);
INSERT INTO "team_account" (account_id, team_id) VALUES (7, 4);
INSERT INTO "team_account" (account_id, team_id) VALUES (8, 4);

-- bugs
INSERT INTO "bug" (name, description, team_id, priority, time_created) VALUES
  ('Wrong height', 'Wrong height parameter on landing-page', 2, 'minor', '2018-02-02 15:00:23');
INSERT INTO "bug" (name, description, team_id, priority, time_created) VALUES
  ('Auth error', 'No hint in auth page', 1, 'major', '2018-02-11 11:21:40');
INSERT INTO "bug" (name, description, team_id, priority, time_created) VALUES
  ('404 on main', 'Sometimes main page returns 404', 1, 'critical', '2018-02-17 20:10:43');
INSERT INTO "bug" (name, description, team_id, priority, time_created) VALUES
  ('Timer IE_10', 'I found that in IE v.10 there is a trouble with time, please fix it', 2, 'minor', '2018-01-30 08:15:47');
INSERT INTO "bug" (name, description, team_id, priority, time_created) VALUES
  ('Stat trouble', 'Wrong values in statistic', 1, 'major', '2018-02-01 10:12:44');
INSERT INTO "bug" (name, description, team_id, priority, time_created) VALUES
  ('New design', 'Old design on stat page. Implement style: material design', 4, 'minor', '2018-01-22 14:08:24');

COMMIT;
