const router = require("express").Router();
const User = require("../models/userModel");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
router.post("/", async (req, res) => {
    try {
        const {email, password, passwordVerify} = req.body;

        //validation
        if (!email || !password)
            return res
                .status(400)
                .json({errorMessage: "Please enter required fields."});

        if (password.length < 6)
            return res
                .status(400)
                .json({errorMessage: "Passwords must have at least 6 characters."});

        if (password !== passwordVerify)
            return res
                .status(400)
                .json({errorMessage: "Passwords don't match."});

        const existingUser = await User.findOne({email});
        if (existingUser)
            return res
                .status(400)
                .json({errorMessage: "User already exists."});

        //hash password
        const salt = await bycrypt.genSalt();
        const passwordHash = await bycrypt.hash(password, salt);

        //save new user acccount to database
        const newUser = new User({
            email, passwordHash
        });

        const savedUser = await newUser.save();

        //log user in
        //sign token
        const token = jwt.sign(
            {
                user: savedUser._id,
            }, 
            "" + process.env.JWT_SECRET
        );

        console.log("" + process.env.JWT_SECRET);

        //send token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
        })
        .send();



    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

//log in
router.post("/login", async (req, res) => {
    try {
        const {email, password, passwordVerify} = req.body;

        //validate
        if (!email || !password)
            return res
                .status(400)
                .json({errorMessage: "PLease enter required fields."});

        const existingUser = await User.findOne({email});
        if (!existingUser)
            return res
                .status(401)
                .json({errorMessage: "Wrong email or password."});

        const passwordCorrect = await bycrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) 
            return res
                .status(401)
                .json({errorMessage: "Wrong email or password."});

        //log user in
        //sign token
        const token = jwt.sign(
            {
                user: existingUser._id,
            }, 
            "" + process.env.JWT_SECRET
        );

        //send token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
        })
        .send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    .send();
});

module.exports = router;