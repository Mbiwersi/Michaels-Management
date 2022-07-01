const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema( {
    first_name : {type: String, required:true},
    last_name : {type: String, required:true},
    email : { type : String, unique : true},
    password : { type : String, required : true },
    admin : {type: Boolean}
})

const User = mongoose.model('User', UserSchema);

module.exports = User;