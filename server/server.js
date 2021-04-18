const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
var occ = 4; //default values
var cap = 10;
var announ = "";
var suprv = "Officer 1"
var anns = ["SAMPLE1", "SAMPLE2"];
global.officerlist = ["Officer 1"];

//CONNECT DB
const connectToDatabase = () => {
  mongoose.connect(process.env.DB_URI || require('./config/config').db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  return mongoose.connection;
}

const db = connectToDatabase().on(
  "error",
  console.error.bind(console, "MongoDB connection error: ")
)
db.once("open", async () => {
  console.log("Mongodb connection succesful!\n")
})



require('dotenv').config();


// Use env port or default
const port = process.env.PORT || 3000;


const app = express();


app.use(express.json());

app.use(express.urlencoded()); //Parse URL-encoded bodies

const { auth, requiresAuth } = require('express-openid-connect');

app.use('/officer', require('./officerRouter'));

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);



app.listen(port, () => console.log(`Server now running on port ${port}!`));


if (process.env.NODE_ENV === 'production') {

}


//app.use("/ServerRoutes", testRouter)
var public = path.resolve(__dirname, '../client/public');

app.get('/home/', (req, res) => {


  res.sendFile(path.join(public, '/index.html'));

});

app.get('/admin/', (req, res) => {

  res.sendFile(path.join(public, '/admin.html'))

});




//recieve admin changes 
app.post('/numChange', (req, res) => {
  occ = req.body.occ;
  cap = req.body.cap;
  console.log("occ = " + occ + ", cap is " + cap);
  res.end("yes");
});

app.post('/announcement', (req, res) => {
  announ = req.body.ann;
  //anns.push(String(announ));
  console.log("announ = " + announ);
  res.end("yes");
});

app.post('/supervisor', (req, res) => {
  suprv = req.body.suprv;
  console.log("supervisor = " + suprv);
  res.end("yes");
});

//send back to client 
app.get('/num', function (req, res, next) {
  res.json({ occ: occ, cap: cap });
})

app.get('/announ', function (req, res, next) {
  res.json({ anns: anns });
})


app.get('/current', function (req, res, next) {
  res.json({ suprv: suprv });
});

app.get('/', (req, res) => {

  if (req.oidc.isAuthenticated()) {
    res.redirect('/admin/');
  } else { res.redirect('/home/'); }

});


app.get('/location/', (req, res) => {

  res.sendFile(path.join(public, '/location.html'))
});

app.get('/login', requiresAuth(), (req, res) => {
  console.log(JSON.stringify(req.oidc.user))
  res.send(JSON.stringify(req.oidc.user))
  console.log(officerlist);
});

app.use('/home/', express.static(public));
app.use('/admin/', express.static(public));
app.use('/location/', express.static(public));
