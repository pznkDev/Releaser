CREATE USER db_admin WITH password 'db_admin';
GRANT ALL ON database releaser TO db_admin;

COMMIT;
