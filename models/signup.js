var mongoose = require('mongoose');
var signup = mongoose.Schema({
    name : String,
    email : String,
    textarea : String,
});
module.exports = mongoose.model('Signup',signup);