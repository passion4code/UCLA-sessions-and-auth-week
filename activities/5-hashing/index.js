/*
Create a command line application that hashes the string passed to it.

Usage: node index.js somestringhere
Output: {hashedvalueofsomestringhere}
*/

const passedString = process.argv[2];
const bcrypt = require('bcrypt');
const saltRounds = 10;

const savedHash = "$2b$10$xF3OPMzmHjbd7xR4TUC1UuJBJaflSuWeL8eATkgSn3Yi5oZkIL.Li";
bcrypt.compare(passedString, savedHash, function(err, res) {
    console.log(`Did this match? ${res === true ? 'Yes' : 'No'} `);

    // res == true
});



// bcrypt.genSalt(saltRounds, function(err, salt) {
//     console.log(`Here's the salt: ${salt}`);

//     bcrypt.hash(passedString, salt, function(err, hash) {
//         console.log(`Here's the hash: ${hash}`);

        
//     });
// });