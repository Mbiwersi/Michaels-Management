const mongoose = require('mongoose');

const RentSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.ObjectId, ref: 'User'},
    propertyid: {type: mongoose.Schema.ObjectId, ref: 'Property'},
    month: {type: Date},
    paid: {type: Boolean}
})

const Rent = mongoose.model('Rent', RentSchema);

module.exports = Rent;