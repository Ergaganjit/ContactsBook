var express = require("express");
var router = express.Router();
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

router.get("/", function (req, res, next) {
  res.render("pcontactForm");
});

router.post("/", function (req, res, next) {
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("contacts");
    dbo
      .collection("pcontacts")
      .insertOne(req.body)
      .then((value) => {
        res.redirect("/pcontacts");
      });
  });
});

module.exports = router;
