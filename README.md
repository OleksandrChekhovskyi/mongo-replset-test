# Mongo Replica Set Test

Assuming Unix-like environment.

1. Start `mongod*.sh` scripts in `mongo` directory, in three different terminals.
2. Run once `rs_init.sh` script to initialize the replica set.
3. Run `npm install` in the root directory.
4. Start the test client application with `node main.js`.
5. Press Ctrl+Z in the terminal window of the primary `mongod` (likely to be the first one started).
   This will make it unresponsive, but the TCP socket connection stays open.
6. Observe how the client application never recovers from failure.
   It should instead notice the new replica set configuration and resume normal operation.
7. Observe topology events - the driver is stuck in a disconnect/reconnect loop
   (note `serverOpening`, `serverClosed` events).
