const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.ObjectId, ref: 'User'},
    propertyid: {type: mongoose.Schema.ObjectId, ref: 'Property'},
    type: {type: String},
    notes: {type: String},
    date: {type: Date}
});

const Document = mongoose.model('Document', DocumentSchema);

module.exports = Document;