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
