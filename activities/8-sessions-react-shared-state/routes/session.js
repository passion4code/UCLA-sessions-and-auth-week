const express = require('express');
const router = express.Router();

// Session start call
router.get('/start', (req, res) => {    
    res.json({
        isLoggedIn: req.session.isLoggedIn || false
    })    
});

router.post('/login', (req, res) => {
    /**
     * CHANGE THIS BELOW TO LOOKUP THE USER BY EMAIL AND VERIFY THEIR PASSWORD HASH
     * USING BCRYPT
     */
    const SECRET_EMAIL = 'secret@email.com';
    const SECRET_PASSWORD = 'test123';

    if (req.body.email === SECRET_EMAIL && req.body.password === SECRET_PASSWORD) {
        req.session.isLoggedIn = true;
        res.json({
            success: true
        })
    } else {
        req.session.isLoggedIn = false;
        res.json({
            success: false
        })
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy( () => {
        res.json({success: true});
    });
})



router.post('/create_user', (req, res) => {
    /**
     * FILL THIS IN TO CREATE A USER IN THE DATABASE
     * REMEMBER TO CHECK THE ./db/user.js FILE FOR THE MODEL FIELDS
     */
});

module.exports = router;