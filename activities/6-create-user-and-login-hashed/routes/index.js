"use strict";
const express = require("express");
const router = express.Router();
const db = require("../db/");

// Show the homepage
router.get("/", (req, res) => {
  res.render("index");
});

// Show the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Show the create user page
router.get("/create", (req, res) => {
  res.render("create_user");
});

/* BELOW IS WHERE TO START MAKING CHANGES FOR THIS EXERCISE */

// Handle the login form submission
router.post("/login", (req, res) => {
  /*
   * Change this lookup to only find a user by email. Then, on the found user, compare the password hash.
   */
  db.User.findOne({ email: req.body.userEmail, password: req.body.userPassword })
    .then(user => {
      if (!user) {
        res.render("/login", { showError: true });
        return;
      }
      req.session.user = user;
      res.redirect("/private");
    })
    .catch(err => {
      res.render("/login", { showError: true });
    });
});

router.post("/create", (req, res) => {
  /*
     Change below to hash the password 
     and save the hash instead of saving the plain text password. 
     */
  const userData = {
    email: req.body.userEmail,
    password: req.body.userPassword
  };

  // Try to save the user, if successful, redirect to the homepage after updating the session.
  // Otherwise, console log the error and go back to the create page
  db.User.create(userData)
    .then(savedUser => {
      // Bonus: Using sessions, set a flag here before you redirect and 
      // use that session flag when rendering the login page to 
      // show a message of "Your user has been created. Please login."
      res.redirect("/login");
    })
    .catch(err => {
      console.log(err);
      // Bonus: Using sessions (OR query params, OR by changing this to a render and passing properties)
      // add an error message to be shown on the page
      res.redirect("/create");
    });
});

// Show the private page - should only be shown if the login
router.get("/private", (req, res) => {
  if (req.session.user) {
    res.render("private", { user: req.session.user });
  } else {
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    // Bonus: Add some messaging for "You have successfully logged out"
    res.redirect("/");
  });
});

module.exports = router;
