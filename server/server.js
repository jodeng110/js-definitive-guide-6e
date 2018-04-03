const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/hello', function(req, res) {
    res.send('안녕?');
});

app.get('/jodeng', function(req, res) {
    res.send('조뎅아~');
});

app.get('/stupid', function(req, res) {
    res.send('바보야!');
});

app.get('/pig', function(req, res) {
    res.send('돼지야');
});

app.get('/wiki', function (req, res) {
    const wikiText = fs.readFileSync('server/data/wiki.txt');

    res.send(wikiText.toString());
});

const port = 3333;
var server = app.listen(port, function(){
    console.log("Express server has started on port 3333");
});