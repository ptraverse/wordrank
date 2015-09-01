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

app.get('/wordrank/:word', function(req, res){

    var word = req.word;
    var jsons = { 'request': { 'word': word } };
    var rank = wordrank.scrape(word, function(result) {
        var response = { 'word': word, 'rank': result};
        jsons.response = response;
        res.send('<pre>'+JSON.stringify(jsons, null, '\t')+'</pre>');
    });

});

app.get('/', function (req, res) {

    res.send('It works!');
});

app.listen('8081');
console.log('Magic happens on port 8081');
console.log(os.networkInterfaces());
exports = module.exports = app;
