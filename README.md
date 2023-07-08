# My Issue Tracker

In this project I learned about Subdocuments and aggregation when it comes to MongoDB and Mongoose.
### On Replit the key is NODE_ENV and test is the value (using the Secrets).
### It will most likely crash the server and you must restart it again. You can add an after function at the bottom of the “Functional Tests” (after the tests but still inside the callback).
### after(function() {
### chai.request(server)
### .get('/')
### });
