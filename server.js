const express = require('express');                 // Serves web content
const bodyParser = require('body-parser');          // Parses json
const Redis = require('redis');                     // Interfaces with Redis
const app = express();
const port = 3000;
const redisClient = Redis.createClient('redis://default:localhost:6379'); 

app.listen(port, ()=> {
    redisClient.connect();
    console.log("Listening on port: " + port);
});

app.get('/', (req, res) => {
    // res.send("<h1>Welcome to your Node Server!</h1>");
    // OR
    res.status(301);
    res.redirect("https://youtu.be/dQw4w9WgXcQ?t=43s");
});

// JSON stands for JavaScript Object Notation
app.use(bodyParser.json());

app.get('/login', (req,res) => {res.send("Login Page")})
app.post('/login', async (req,res) => {
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password;
    const redisPassword = await redisClient.hGet('users', userName);
    console.log("Password for " + userName + ": " + redisPassword)
    if (redisPassword != null && password === redisPassword) {
        res.send("Welcome " + userName);
    } else {
        res.send("Authentication failure: Incorrect password.");
    }
})