port=5432
host=localhost
user=postgres
database=releaser


sudo -u $user createdb $database

psql -h $host -p $port -U $user -d $database -f create_tables.sql
psql -h $host -p $port -U $user -d $database -f add_sample_data.sql
