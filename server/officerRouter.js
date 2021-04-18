const router = require("express").Router();
const Officer = require("./officerModel");

//var officerObjs = [];
var officers = [];


router.post("/", async (req, res) => {
    try {
        const name = req.body.officer;
        console.log(name);
        const newOfficer = new Officer({
            name
        });

        const savedOfficer = await newOfficer.save();

        res.json(savedOfficer);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});



router.get("/", async (req, res) => {
    try {
        officers = await Officer.find();
        
        //console.log(officers[0].name);
        officers.forEach(Officer => officerlist.push(officers.name));
        //officers.forEach(Officer => officerObjs.push(officers));
        
    res.json(officers);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.delete("/", async (req, res) => {
    try {
        const officerId = req.body.id;
        //validate
        if(!officerId)
            return res.status(400).json({errorMessage: "Error: officer ID not given."});

        const existingOfficer = await Officer.findById(officerId);
        if (!existingOfficer)
            return res.status(400).json({errorMessage: "Error: officer ID not found."});

        await existingOfficer.delete();

        res.json(existingOfficer);
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;
