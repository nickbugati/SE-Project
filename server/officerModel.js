// Officer model and officer router were built following this guide by Devistry:
// https://www.youtube.com/watch?v=scYojqjnHzI&list=PLJM1tXwlGdaf57oUx0rIqSW668Rpo_7oU&index=1
//
const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema({
    name: {type: String, required: true},
});

const Officer = mongoose.model("officer", officerSchema);

module.exports = Officer;
