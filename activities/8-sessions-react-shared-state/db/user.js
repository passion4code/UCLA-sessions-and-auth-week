const mongoose = require('./connection');

const UserSchema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true
    },
    passwordHash: {
        type: 'string',
        required: true,
    }
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;