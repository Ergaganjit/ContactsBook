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
      .collection("pcontacts")
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
      .collection("pcontacts")
      .findOne({ _id: new mongodb.ObjectID(userToUpdate) }, function (
        err,
        result
      ) {
        res.render("pcontactForm", {
          contact: result,
          action: "/pdcontacts/" + userToUpdate + "/update",
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
      .collection("pcontacts")
      .updateOne(
        { _id: new mongodb.ObjectID(userToUpdate) },
        { $set: { ...req.body } },
        function (err, result) {
          console.log(result);
          res.redirect("/pdcontacts");
          db.close();
        }
      );
  });
});

/* GET users listing. */
router.post("/:id/delete", function (req, res, next) {
  var url = "mongodb://localhost:27017/";
  var pdcontacts = MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("contacts");
    dbo
      .collection("pcontacts")
      .deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
      .then(function (value) {
        console.log(value.result);
        res.redirect("/pdcontacts");
        db.close();
      })
      .catch((error) => console.log(error));
  });
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  var url = "mongodb://localhost:27017/";
  var pcontacts = MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("contacts");
    dbo
      .collection("pcontacts")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.render("pdcontacts", { pdcontacts: result });
        db.close();
      });
  });
});
module.exports = router;
