const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({

    Firstname: String,
    Lastname: String

});
exports.User = mongoose.model('User', UserSchema)