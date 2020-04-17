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
      .collection("acontact")
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
      .collection("acontact")
      .findOne({ _id: new mongodb.ObjectID(userToUpdate) }, function (
        err,
        result
      ) {
        res.render("acontactForm", {
          contact: result,
          action: "/adcontact/" + userToUpdate + "/update",
          hideAcontact: true,
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
      .collection("acontact")
      .updateOne(
        { _id: new mongodb.ObjectID(userToUpdate) },
        { $set: { ...req.body } },
        function (err, result) {
          console.log(result);
          res.redirect("/adcontact");
          db.close();
        }
      );
  });
});

/* GET users listing. */
router.post("/:id/delete", function (req, res, next) {
  var url = "mongodb://localhost:27017/";
  var adcontact = MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("contacts");
    dbo
      .collection("acontact")
      .deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
      .then(function (value) {
        console.log(value.result);
        res.redirect("/adcontact");
        db.close();
      })
      .catch((error) => console.log(error));
  });
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  var url = "mongodb://localhost:27017/";
  var acontact = MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("contacts");
    dbo
      .collection("acontact")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.render("adcontact", { adcontact: result });
        db.close();
      });
  });
});
module.exports = router;
