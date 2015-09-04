var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var os = require('os');
var path = require('path');
var bodyParser = require('body-parser');
var wordrank = require('./wordrank');

var app = express();
app.use(bodyParser());
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(process.cwd() + '/public'));


app.param('word', function(req, res, next, word) {
    req.word = word;
    next();
});

app.get('/word/:word', function(req, res){
    var word = req.word;
    var jsons = { 'request': { 'word': word } };
    var rank = wordrank.getWord(word, function(result) {
        console.log(result);
        var response = { 'word': word, 'rank': parseInt(result)};
        jsons.response = response;
        res.json(jsons);
    });
});


app.param('rank', function(req, res, next, rank) {
    req.rank = rank;
    next();
});

app.get('/rank/:rank', function(req, res){
    var rank = req.rank;
    var jsons = { 'request': { 'rank': rank } };
    var word = wordrank.getRank(rank, function(result) {
        console.log(result);
        var response = { 'rank': rank, 'word': parseInt(result)};
        jsons.response = response;
        res.json(jsons);
    });
});


port = '8081';
app.listen(port);
console.log('Magic happens on port '+port);
console.log(os.networkInterfaces());
exports = module.exports = app;
