// Connecting Mongo DB
MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err);
  db = client.db("contacts");
});

// Save items to DB from form
app.post("/items", (req, res) => {
  db.collection("pcontacts").save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log(req.body, { _id: req.body._id });
    res.redirect("/");
  });
});

// Delete item on click from DB
app.delete("/items/:id", (req, res) => {
  db.collection("pcontacts").remove({ _id: req.body.id }, (err, result) => {
    if (err) return console.log(err);
    console.log(req.body);
    res.redirect("/");
  });
});

// Get items from DB to page
app.get("/", (req, res) => {
  db.collection("pcontacts")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("index", {
        layout: false,
        items: result,
      });
    });
});
