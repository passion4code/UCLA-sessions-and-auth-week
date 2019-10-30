"use strict";
const express = require("express");
var exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// Get the Mongo shared connection for our session storage in Mongo
const mongoConnection = require("./db/connection").connection;

// Create the express app
const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // Here we use that MongoStore object for the session storage, passing the mongo connection
    // Read the docs at https://www.npmjs.com/package/connect-mongo
    store: new MongoStore({ mongooseConnection: mongoConnection })
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

// Template engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Common middleware
// app.use(/* ... */)

// Register routes
const routes = require("./routes");
app.use("/", routes);

// Common error handlers

// Start server
const PORT = process.env.PORT || 1234;
const server = app.listen(PORT, err => {
  if (err) {
    console.log(`There was a problem starting the server: ${err}`);
    process.exit(1);
  }

  const addr = server.address();
  console.log(`Started at http://${addr.host || "localhost"}:${addr.port}`);
});
