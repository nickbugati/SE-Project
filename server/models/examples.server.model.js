const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    
    email: String,
    password: String,
    
    Firstname: String,
    Lastname: String

});
exports.User = mongoose.model('User', Schema)