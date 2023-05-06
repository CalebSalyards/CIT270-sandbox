const express = require('express');
const app = express();
const port = 3000;

app.listen(port, ()=> {
    console.log("Listening on port: " + port);
});

app.get('/', (req, res) => {
    // res.send("<h1>Welcome to your Node Server!</h1>");
    // OR
    res.status(301);
    res.redirect("https://youtu.be/dQw4w9WgXcQ?t=43s")
});