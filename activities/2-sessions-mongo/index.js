'use strict'
const express = require('express');
const session = require('express-session')
// create a MongoStore object using the library 
// Note that this only works with a localhost mongo setup 
// Read the docs on using existing mongo connections 
// or how to specify the connection string
const MongoStore = require('connect-mongo')(session);

// Create the express app
const app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // and passing we pass a new instance of the MongoStore object into the session init
  store: new MongoStore(options) 
}));

// Routes and middleware
app.get('/', (req, res) => {
  if (req.session.highScore !== undefined) {
    req.session.highScore++;
  } else {
    req.session.highScore = 1;
  }
  res.send(`High score is ${req.session.highScore}`);
});



// Start server
const PORT = process.env.PORT || 1234;
app.listen(PORT, err => {
  if (err) {
    return console.error(err)
  }

  console.log(`Started at http://localhost:${PORT}`)
})
