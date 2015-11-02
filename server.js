var express = require('express');
var fs = require('fs');
var request = require('request');
var os = require('os');
var path = require('path');
var bodyParser = require('body-parser');
var wordrank = require('./wordrank');
var conf = require('./private/conf');
var myIP = require('my-ip');

var app = express();
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
    var rank = wordrank.getWord(word, function(result) {
        console.log(result);
        var response = { 'word': word, 'result': result};        
        res.json(response);
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
        var response = { 'rank': rank, 'word': result};
        jsons.response = response;
        console.log(jsons);
        res.json(jsons);
    });
});


// Iinitailize Server, Show IP Address
app.listen(conf.port);
console.log();
console.log('Environment: '+conf.env);
console.log('App started at http://'+myIP()+':'+conf.port);

exports = module.exports = app;
