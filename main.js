"use strict";

let assert = require("assert");
let os = require("os");
let MongoClient = require("mongodb").MongoClient;
let hostname = os.hostname();
let url = `mongodb://${hostname}:5000,${hostname}:5001,${hostname}:5002/db_test?replicaSet=rstest`;
let counter = 0;

let topologyEventNames = [
	"serverDescriptionChanged", "serverHeartbeatStarted", "serverHeartbeatSucceeded", "serverHeartbeatFailed",
	"serverOpening", "serverClosed", "topologyOpening", "topologyClosed", "topologyDescriptionChanged",
];

MongoClient.connect(url, function(err, db) {
	assert(db);
	console.log("Connected successfully");

	for (let eventName of topologyEventNames) {
		db.topology.on(eventName, function(event) {
			console.error("TOPOLOGY EVENT " + eventName);
			console.error(JSON.stringify(event, null, 2));
		});
	}

	let collection = db.collection("test_update");

	function doUpdate() {
		let n = counter;
		counter++;

		collection.update({
			_id: "test"
		}, {
			_id: "test",
			counter: n,
		}, {
			upsert: true
		}, function(err, result) {
			if (err) {
				console.error("Update failed", n);
			} else {
				console.log("Update successed", n);
			}
		});
	}

	setInterval(doUpdate, 1000);
});
