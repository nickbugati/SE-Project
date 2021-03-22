const express = require('./config/express.js');

require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');
 
// Use env port or default
const port = process.env.PORT || 3000;

const app = express.init();

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

app.get('/', (req,res) =>{
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
} )

app.get('/login', requiresAuth(), (req,res) =>{
    console.log(JSON.stringify(req.oidc.user))
    res.send(JSON.stringify(req.oidc.user))
})

app.listen(port, () => console.log(`Server now running on port ${port}!`));
