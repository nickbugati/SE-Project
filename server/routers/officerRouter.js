const router = require("express").Router();
const Officer = require("../models/officerModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
    try {
        const {firstname, lastname} = req.body;

        const newOfficer = new Officer({
            firstname, lastname
        });

        const savedOfficer = await newOfficer.save();

        res.json(savedOfficer);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const officers = await Officer.find();
        res.json(officers);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;