const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    // res.status(301);
    // res.redirect("https://youtube.com")
    res.send("Welcome to your Node Server!");
});

// app.post('/', ()=> {})

app.listen(port, ()=> {
    console.log("Listening on port: " + port);
});

