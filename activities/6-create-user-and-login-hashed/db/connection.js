// Here we will have a single, shared mongo connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user_test', {useNewUrlParser: true});

module.exports = mongoose;