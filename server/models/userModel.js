const mongoose = require("mongoose");
const router = require("../routers/officerRouter");

const userSchema = new mongoose.Schema( {
    email: {type: String, required: true}, //unique = true
    //firstname: {type: String, required: true},
    //lastname: {type: String, required: true},
    passwordHash: {type: String, required: true},
});

router.get("/loggedIn", (req, res) => {
    try {
        //read cookie
        const token = req.cookies.token;

        if (!token) return res.json(false);

        //validate token
        const verified = jwt.verify(token, "" + process.env.JWT_SECRET);

        res.send(true);
    } catch (err) {
        console.error(err);
        res.json(false);
    }
})

const User = mongoose.model("user", userSchema);

module.exports = User;