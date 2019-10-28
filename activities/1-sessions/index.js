'use strict'
const express = require('express');
const session = require('express-session');

// Create the express app
const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

// Routes and middleware
app.get('/', (req, res) => {
  if (req.session.highScore !== undefined) {
    req.session.highScore++;
  } else {
    req.session.highScore = 1;
  }
  console.log(`Session ID: ${req.session.id}`);
  res.send(`High score is ${req.session.highScore}`);
});



// Start server
const PORT = process.env.PORT || 1234;
app.listen(PORT, err => {
  if (err) {
    return console.error(err)
  }

  console.log(`Started at http://localhost:${PORT}`)
});
