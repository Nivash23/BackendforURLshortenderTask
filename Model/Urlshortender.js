const mongoose = require('mongoose');

const URLshortSchema = new mongoose.Schema({
    LongURL: String,
    Name: String,
    code: String,
    user:String,
    createAt: {
        type: Date,
        default:Date.now()
    },
    updatedAt: {
        type:Date
    }
})
const URLshortender = mongoose.model('URLdata', URLshortSchema, 'URLdata');

module.exports = URLshortender;