const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
});

const Officer = mongoose.model("officer", officerSchema);

module.exports = Officer;