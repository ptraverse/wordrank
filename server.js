var express = require('express');
var fs = require('fs');
var request = require('request');
var os = require('os');
var path = require('path');
var bodyParser = require('body-parser');
var wordrank = require('./wordrank');

var app = express();
app.use(bodyParser());
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(process.cwd() + '/public'));

/* Demo Route */
app.get('/demo', function (req, res) {
    res.sendFile('public/demo.html' , { root : __dirname});
});

/* Word Route */
/** Param Binding **/
app.param('word', function(req, res, next, word) {
    req.word = word;
    next();
});
/** Route **/
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


/* Rank Route */
/**Param Binding **/
app.param('rank', function(req, res, next, rank) {
    req.rank = rank;
    next();
});
/** Route **/
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


// Iinitailize Server, Show IP Address
port = '8081';
app.listen(port);
console.log('Magic happens on port '+port);
console.log(os.networkInterfaces());
exports = module.exports = app;
