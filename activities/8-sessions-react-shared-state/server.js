const express = require('express');
const session = require('express-session');
const app = express();
const sessionRoutes = require('./routes/session');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// all calls to /api/sessions/* will go to the session router
app.use('/api/sessions', sessionRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 3111;
app.listen(PORT, err => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`);
        process.exit(1);
    }

    console.log(`Listening on http://localhost:${PORT}`);
})