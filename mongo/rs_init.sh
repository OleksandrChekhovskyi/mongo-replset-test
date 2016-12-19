#!/usr/bin/env bash
HOSTNAME=`hostname`
mongo --port 5000 --eval "rs.initiate();"
mongo --port 5000 --eval "rs.add('$HOSTNAME:5001');"
mongo --port 5000 --eval "rs.add('$HOSTNAME:5002');"
