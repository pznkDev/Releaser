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
INSERT INTO "account" (name, username, password, role) VALUES
  ('Admin', 'admin', 'io', 'manager');

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

-- bugs_history
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Issue #452', 'Change url for jira', 3, 'major', '2017-11-25', '2017-12-10');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Issue #482', 'Migration exception main.py', 1, 'minor', '2017-11-30', '2017-12-03');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Change color', 'Wrong color on dashboard', 3, 'minor', '2017-12-02', '2017-12-22');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Login Button exception', 'Exception displays in logs after pressing login button', 3, 'minor', '2017-12-06', '2017-12-20');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Design issue #135', 'Error with assets', 2, 'minor', '2017-12-18', '2017-12-30');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Session error', 'Sometimes, in session after 15 min, user becomes unathorized', 1, 'major', '2017-12-17', '2018-01-17');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Issue #334', 'Rendering bug_history errors', 4, 'minor', '2017-12-19', '2018-01-20');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Issue #134', 'ModalForm design fix', 2, 'minor', '2017-12-18', '2018-01-26');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Session error', 'Sometimes, in session after 30 min, user becomes unathorized', 1, 'major', '2017-01-11', '2018-01-16');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Voting error', 'Team KPISHNIK has not any rules', 4, 'major', '2017-01-12', '2018-01-15');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Header menus', 'Not all items in header menu', 1, 'major', '2017-01-20', '2018-01-23');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('API response trouble', '/api/bug_history/?page=3 error', 3, 'major', '2017-01-20', '2018-01-27');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Donation error', 'Users have no permissions to donate us', 1, 'major', '2017-01-22', '2018-01-24');
INSERT INTO "bug_history" (name, description, team_id, priority, time_created, time_closed) VALUES
  ('Issue #132', 'Response 404 time by time', 2, 'critical', '2018-04-25', '2018-04-28');


INSERT INTO "release" (tag, time_created) VALUES ('18.11.1', '2018-01-24');
INSERT INTO "release" (tag, time_created) VALUES ('18.12.1', '2018-02-03');
INSERT INTO "release" (tag, time_created) VALUES ('18.12.2', '2018-02-07');

-- schedule
INSERT INTO "schedule_update" (day, hour, minute) VALUES (2, 15, 0);
INSERT INTO "schedule_update" (day, hour, minute) VALUES (4, 15, 0);

COMMIT;
