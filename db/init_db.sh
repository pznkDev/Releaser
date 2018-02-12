#!/usr/bin/env bash
port=5432
user=db_admin
password=db_admin
db_name=releaser

psql "dbname='$db_name' user='$user' password='$password' host='localhost'" -f create_tables.sql
