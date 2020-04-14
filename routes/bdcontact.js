var express = require("express");
var router = express.Router();
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

router.post("/", function (req, res, next) {
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("contacts");
    dbo
      .collection("bcontact")
      .insertOne(req.body)
      .then((value) => {
        console.log(req.body, { _id: req.body._id });
        res.redirect("/");
      });
  });
});

/*To update a user*/
router.get("/:id/update", (req, res) => {
  var url = "mongodb://localhost:27017/";
  var upcontacts = MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("contacts");
    var userToUpdate = req.params.id;
    dbo
      .collection("bcontact")
      .findOne({ _id: new mongodb.ObjectID(userToUpdate) }, function (
        err,
        result
      ) {
        res.render("bcontactForm", {
          contact: result,
          action: "/bdcontact/" + userToUpdate + "/update",
          hidePcontacts: true,
        });
        db.close();
      });
  });
});

router.post("/:id/update", (req, res) => {
  console.log(req.body);
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("contacts");
    var userToUpdate = req.params.id;
    console.log(userToUpdate);
    dbo
      .collection("bcontact")
      .updateOne(
        { _id: new mongodb.ObjectID(userToUpdate) },
        { $set: { ...req.body } },
        function (err, result) {
          console.log(result);
          res.redirect("/bdcontact");
          db.close();
        }
      );
  });
});

/* GET users listing. */
router.post("/:id/delete", function (req, res, next) {
  var url = "mongodb://localhost:27017/";
  var bdcontact = MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("contacts");
    dbo
      .collection("bcontact")
      .deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
      .then(function (value) {
        console.log(value.result);
        res.redirect("/bdcontact");
        db.close();
      })
      .catch((error) => console.log(error));
  });
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  var url = "mongodb://localhost:27017/";
  var bcontact = MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("contacts");
    dbo
      .collection("bcontact")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.render("bdcontact", { bdcontact: result });
        db.close();
      });
  });
});
module.exports = router;
