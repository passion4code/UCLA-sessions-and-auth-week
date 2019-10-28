"use strict";
const express = require('express');
const router = express.Router();


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
})

/* BELOW IS WHERE TO START MAKING CHANGES FOR THIS EXERCISE */

// Handle the login form submission
router.post("/login", (req, res) => {
    // Here is where you will handle the form request to determine
    // if the posted username and password matches a username and password in your database
    // If it does, update the session accordingly and redirect to /private
    // BONUS: If it fails, render the login page but with a new error to the user    

});

router.post("/create", (req, res) => {
    // Here is where you will create the user in your database from the posted data
    // Then redirect to the homepage - "/"
});

// Show the private page - should only be shown if the login 
router.get("/private", (req, res) => {
    // This should only show if the person has successfully "logged in"
    res.render("private");
});

router.get("/logout", (req, res) => {
    // Here you will reset the session and redirect the user back to the homepage.
    // BONUS: Show a message on the homepage that "You have successfully logged out" (hint - use query params)
})

module.exports = router;
