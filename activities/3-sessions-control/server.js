"use strict";
const express = require("express");
var exphbs  = require('express-handlebars');


// Create the express app
const app = express();

// Template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Common middleware
// app.use(/* ... */)

// Register routes
const routes = require("./routes");
app.use("/", routes);

// Common error handlers

// Start server
const PORT = process.env.PORT || 1234;
const server = app.listen(PORT, function(err) {

  if (err) {
    console.log(`There was a problem starting the server: ${err}`);
    process.exit(1);
  }

  const addr = server.address();
  console.log(
    `Started at http://${addr.host || "localhost"}:${addr.port}`
  );
});
