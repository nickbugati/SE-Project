const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan');
    //bodyParser = require('body-parser'),
    //exampleRouter = require('../routes/examples.server.routes');

const cookieParser = require("cookie-parser");
const cors = require("cors");



const connectToDatabase = () => {
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    return mongoose.connection;
}

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    const db = connectToDatabase().on(
        "error",
        console.error.bind(console, "MongoDB connection error: ")
    )
    db.once("open", async () => {
        console.log("Mongodb connection succesful!\n")
    })

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    app.use(express.json());
    app.use(cookieParser());

    app.use(cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    }));




    // body parsing middleware
    //app.use(bodyParser.json());

    // add a router
    //app.use('/api/example', exampleRouter);

    // if (process.env.NODE_ENV === 'production') {
    //     // Serve any static files
    //     app.use(express.static(path.join(__dirname, '../../client/build')));

    //     // Handle React routing, return all requests to React app
    //     app.get('*', function (req, res) {
    //         res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    //     });
    // }

    return app
}
