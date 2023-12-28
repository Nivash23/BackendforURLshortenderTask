const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    Amount: Number,
    Description: String,
    Date: {
        type: Date,
        default: Date.now()
        
    },
});
const entryModel = mongoose.model('entry', entrySchema, 'Entries');

module.exports = entryModel;