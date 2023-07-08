# My Issue Tracker

I learned about Subdocuments and aggregation regarding MongoDB and Mongoose in this project.
### On Replit the key is NODE_ENV and the test is the value (using the Secrets).
### It will most likely crash the server and you must restart it again. You can add an after function at the bottom of the “Functional Tests” (after the tests but still inside the callback).
### after(function() {
### chai.request(server)
### .get('/')
### });
NB: after setting up your api.js on the functional test perform instances of /api/issues/test-data-abc123
- collect the _id of an instance and on browser run https://issue-tracker-freecodecamp.kenrique123.repl.co/api/issues/test-data-abc123?_id=[acquired _id].
- Copy all instances and replace dem with the current _id,_issue,.....
- Next for the update test after setting up your api.js on the functional test perform instances of /api/issues/test-data-put
- collect the _id of an instance and on browser run https://issue-tracker-freecodecamp.kenrique123.repl.co/api/issues/test-data-put?_id=[acquired _id].
- Copy all instances and replace dem with the current _id,_issue,.....and anywere required of a known testing _id
