const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
const cors = require("cors");
app.use(cors());

let marketData = [];
let checked = [];

app.get("/ping", function (req, res) {
  console.log("someone pinged here");
  return res.send("pong");
});

app.get("/marketdata", function (req, res) {
  return res.send(marketData);
});

app.post("/marketdata", function (req, res) {
  marketData = req.body;
  return res.send("success");
});

app.get("/checked", function (req, res) {
  return res.send(checked);
});

app.post("/checked", function (req, res) {
  const id = req.body["coin"];
  if (!checked.includes(id)) {
    checked.push(id);
    return res.send("success");
  }
  return res.send("error");
});

app.delete("/checked", function (req, res) {
  const id = req.body["coin"];
  if (checked.includes(id)) {
    checked = checked.filter((coin) => coin !== id);
    return res.send("removed");
  }
  return res.send("error");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080);

/* REQUESTS 
- GET /checked -> returns a list of all checked items
- POST /checked -> adds a new checked item
- DELETE /checked/:id -> deletes a checked item
*/
