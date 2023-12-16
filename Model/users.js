const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt:Date

});
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;