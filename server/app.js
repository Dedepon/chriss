const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");

const presentRoute = require("./routes/present");
const presentOrderRoute = require("./routes/present-order");
const orderRoute = require("./routes/order");
const personRoute = require("./routes/person");
const shopRoute = require("./routes/shop");
const app = express();

// Third party config
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": "false" }));
app.use(favicon(path.join(__dirname, "../dist/chriss/favicon.ico")));

// API hooks
app.use("/api/rest/present", presentRoute);
app.use("/api/rest/present-order", presentOrderRoute);
app.use("/api/rest/order", orderRoute);
app.use("/api/rest/person", personRoute);
app.use("/api/rest/shop", shopRoute);

// Error handlers
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Default hooks
// Serve static files
app.get("*.*", express.static(path.join(__dirname, "../dist/chriss"), {maxAge: "1y"}));
// Serve angular app
app.all("*", function (req, res) {
  res.status(200).sendFile(`/`, { root: path.join(__dirname, "../dist/chriss") });
});

// Mongoose configuration
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

var options = {
  promiseLibrary: require("bluebird"),
  readPreference: "primary"
}

// Mongoose connection
mongoose.connect("mongodb://127.0.0.1:30000/chriss?replicaSet=rs0", options)
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

module.exports = app;
