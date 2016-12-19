#!/usr/bin/env bash
SCRIPT_DIR=`dirname ${BASH_SOURCE[0]}`
DB_DIR="$SCRIPT_DIR/db0"
mkdir -p $DB_DIR
mongod --replSet "rstest" --dbpath $DB_DIR --port 5000
