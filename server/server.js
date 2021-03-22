
const express = require('./config/express.js')
const dotenv = require("dotenv");
 
dotenv.config();

// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init()

app.use("/auth", require("./routers/userRouter"));
app.use("/customer", require("./routers/officerRouter"));

app.listen(port, () => console.log(`Server now running on port ${port}!`));
