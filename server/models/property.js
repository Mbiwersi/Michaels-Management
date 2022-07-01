const mongoose = require('mongoose');
const Rent = require('./rent');

const PropertySchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.ObjectId, ref: 'User'},
    address: {type: String, required:true},
    lat: {type: Number},
    long: {type: Number},
    monthly_rent: {type: Number, required:true},
    monthly_cost: {type: Number, required:true},
    num_bed: {type: Number, required:true},
    num_bath: {type: Number, required:true},
    image: {type: String},
    owned_since: {type: String, required:true},
    purchase_price: {type: Number, required:true},
    rentPayments: {type: Array}
})

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;