const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

const checked = [];

app.get("/ping", function (req, res) {
  console.log("someone pinged here");
  return res.send("pong");
});

app.get("/checked", function (req, res) {
  return res.send(checked);
});

app.post("/checked", function (req, res) {
  checked.push(req.body["coin"]);
  return res.send("success");
});

app.delete("/checked/:id", function (req, res) {
  //TODO
  return res.send("remove");
});

// app.post("/cryptolist", function )

app.listen(process.env.PORT || 8080);

/* REQUESTS 
- GET /checked -> returns a list of all checked items
- POST /checked -> adds a new checked item
- DELETE /checked/:id -> deletes a checked item
*/
