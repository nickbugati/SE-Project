const mongoose = require('mongoose')
const Schema = new mongoose.Schema({

    Firstname: String,
    Lastname: String

});
exports.User = mongoose.model('User', Schema)