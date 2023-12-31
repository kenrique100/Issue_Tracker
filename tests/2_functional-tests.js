const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
require("../db-connection");

chai.use(chaiHttp);

// Create an issue with every field: POST request to /api/issues/{project}
// Create an issue with only required fields: POST request to /api/issues/{project}
// Create an issue with missing required fields: POST request to /api/issues/{project}
// View issues on a project: GET request to /api/issues/{project}
// View issues on a project with one filter: GET request to /api/issues/{project}
// View issues on a project with multiple filters: GET request to /api/issues/{project}
// Update one field on an issue: PUT request to /api/issues/{project}
// Update multiple fields on an issue: PUT request to /api/issues/{project}
// Update an issue with missing _id: PUT request to /api/issues/{project}
// Update an issue with no fields to update: PUT request to /api/issues/{project}
// Update an issue with an invalid _id: PUT request to /api/issues/{project}
// Delete an issue: DELETE request to /api/issues/{project}
// Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
// Delete an issue with missing _id: DELETE request to /api/issues/{project}

let deleteID;
suite("Functional Tests", function() {
  suite("Routing Tests", function() {
    suite("3 Post request Tests", function() {
      test("Create an issue with every field: POST request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .post("/api/issues/projects")
          .set("content-type", "application/json")
          .send({
            issue_title: "Issue",
            issue_text: "Functional Test",
            created_by: "fCC",
            assigned_to: "Kenrique",
            status_text: "Not Done",
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            deleteID = res.body._id;
            assert.equal(res.body.issue_title, "Issue");
            assert.equal(res.body.assigned_to, "Kenrique");
            assert.equal(res.body.created_by, "fCC");
            assert.equal(res.body.status_text, "Not Done");
            assert.equal(res.body.issue_text, "Functional Test");
            done();
          });
      });
      test("Create an issue with only required fields: POST request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .post("/api/issues/projects")
          .set("content-type", "application/json")
          .send({
            issue_title: "Issue",
            issue_text: "Functional Test",
            created_by: "fCC",
            assigned_to: "",
            status_text: "",
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, "Issue");
            assert.equal(res.body.created_by, "fCC");
            assert.equal(res.body.issue_text, "Functional Test");
            assert.equal(res.body.assigned_to, "");
            assert.equal(res.body.status_text, "");
            done();
          });
      });
      test("Create an issue with missing required fields: POST request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .post("/api/issues/projects")
          .set("content-type", "application/json")
          .send({
            issue_title: "",
            issue_text: "",
            created_by: "fCC",
            assigned_to: "",
            status_text: "",
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "required field(s) missing");
            done();
          });
      });
    });

    //////////////// GET REQUEST TESTS /////////////////////

    suite("3 Get request Tests", function() {
      test("View issues on a project: GET request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .get("/api/issues/test-data-abc123")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.length, 4);
            done();
          });
      });
      test("View issues on a project with one filter: GET request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .get("/api/issues/test-data-abc123")
          .query({
            _id: "64a96566149cc1905a78988e",
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body[0], {
              "_id": "64a96566149cc1905a78988e",
              "issue_title": "something",
              "issue_text": "sads",
              "created_on": "2023-07-08T13:32:22.820Z",
              "updated_on": "2023-07-08T13:32:22.820Z",
              "created_by": "Ken",
              "assigned_to": "",
              "open": true,
              "status_text": ""
            });
            done();
          });
      });
      test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .get("/api/issues/test-data-abc123")
          .query({
            issue_title: "Hello",
            issue_text: "carry on",
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body[0], {
                          
            "_id": "64a96672a11146912dff8717",
            "issue_title": "Hello",
            "issue_text": "carry on",
            "created_on": "2023-07-08T13:36:50.523Z",
            "updated_on": "2023-07-08T13:36:50.523Z",
            "created_by": "Ken",
            "assigned_to": "",
            "open": true,
            "status_text": ""
            });
            done();
          });
      });
    });

    //////////////// PUT REQUEST TESTS /////////////////////

    suite("5 Put request Tests", function() {
      test("Update one field on an issue: PUT request to /api/issues/test-data-put", function(done) {
        chai
          .request(server)
          .put("/api/issues/test-data-put")
          .send({
            _id: "64a967662ed5ed9192cd0f20",
            issue_title: "different",
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, "successfully updated");
            assert.equal(res.body._id, "64a967662ed5ed9192cd0f20");

            done();
          });
      });
      test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .put("/api/issues/test-data-put")
          .send({
            _id: "64a967662ed5ed9192cd0f20",
            issue_title: "random",
            issue_text: "random",
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, "successfully updated");
            assert.equal(res.body._id, "64a967662ed5ed9192cd0f20");

            done();
          });
      });
      test("Update an issue with missing _id: PUT request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .put("/api/issues/test-data-put")
          .send({
            issue_title: "update",
            issue_text: "update",
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "missing _id");

            done();
          });
      });
      test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .put("/api/issues/test-data-put")
          .send({
            _id: "64a967662ed5ed9192cd0f20",
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "no update field(s) sent");

            done();
          });
      });
      test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .put("/api/issues/test-data-put")
          .send({
            _id: "5fe0c500e672341c1815a770",
            issue_title: "update",
            issue_text: "update",
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "could not update");

            done();
          });
      });
    });

    //////////////// DELETE REQUEST TESTS /////////////////////

    suite("3 DELETE request Tests", function() {
      test("Delete an issue: DELETE request to /api/issues/projects", function(done) {
        chai
          .request(server)
          .delete("/api/issues/projects")
          .send({
            _id: deleteID,
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, "successfully deleted");

            done();
          });
      });
      test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .delete("/api/issues/projects")
          .send({
            _id: "5fe0c500ec2f6f4c1815a770invalid",
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "could not delete");

            done();
          });
      });
      test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function(done) {
        chai
          .request(server)
          .delete("/api/issues/projects")
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "missing _id");

            done();
          });
      });
      after(function() {
        chai.request(server)
          .get('/')
      });
    });
  });
});
