const express = require('express');                 // Serves web content
const bodyParser = require('body-parser');          // Parses json
const Redis = require('redis');                     // Interfaces with Redis
const app = express();
const port = 443;
const redisClient = Redis.createClient('redis://default:localhost:6379');
const https = require('https');
const fs = require('fs');
const {createHash} = require('node:crypto');

if (process.env.SERVICE_TYPE == "docker") {
    app.listen(port, ()=> {
        redisClient.connect();
        console.log("Listening on port: " + port);
    });
} else {
    let privkey = ''
    let certkey = ''
    if (process.platform === "win32") {
        privkey = './keys/privkey1.pem'
        certkey = './keys/cert1.pem'
    } else {
        privkey = '/etc/letsencrypt/archive/salyards.cit270.com/privkey1.pem'
        certkey = '/etc/letsencrypt/archive/salyards.cit270.com/cert1.pem'
    }
    https.createServer({
        // key: fs.readFileSync('server.key'),
        // cert: fs.readFileSync('server.cert')
        key: fs.readFileSync(privkey),
        cert: fs.readFileSync(certkey)
        // chain: fs.readFileSync('/etc/letsencrypt/archive/salyards.cit270.com/chain1.pem'),
        // fullchain: fs.readFileSync('/etc/letsencrypt/archive/salyards.cit270.com/fullchain1.pem')
    }, app).listen(port, () => {
        redisClient.connect(); //  <------- ADD THIS LINE
        console.log('Listening...')
    });
}

app.get('/', (req, res) => {
    res.send("<h1>Welcome to your Node Server!</h1>");
    // OR
    // res.status(301);
    // res.redirect("https://youtu.be/dQw4w9WgXcQ?t=43s");
});

// JSON stands for JavaScript Object Notation
app.use(bodyParser.json());

var http = express();
http.get('*', function(req, res) {  
    res.redirect('https://' + req.headers.host + req.url);
})

app.get('/login', (req,res) => {res.send("Login Page")})
app.post('/login', async (req,res) => {
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password;
    const hash = password == null ? null : createHash('sha3-256').update(password).digest('hex');
    const redisPassword = await redisClient.hGet('credentials', userName);
    console.log("Password for " + userName + ": " + redisPassword)
    if (redisPassword != null && hash === redisPassword) {
        res.send("Welcome " + userName);
    } else {
        console.log(hash)
        res.send("Authentication failure: Incorrect password.");
    }
});

// Hash generator: https://emn178.github.io/online-tools/sha3_256.html
app.post('/hash', async (req, res) => {
    console.log("Generating sha3-256 hash for: " + req.body.string);
    res.send(req.body + " | " + req.body.string == null ? null : createHash('sha3-256').update(req.body.string).digest('hex'));
});