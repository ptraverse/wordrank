var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var os = require('os');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(process.cwd() + '/public'));


app.param('word', function(req, res, next, word) {
    // console.log('parmaworded');
    // console.log(word);
    req.word = word;
    next();
});

app.get('/wordrank/:word', function(req, res){

    //
    var word = req.word;
    console.log(word);

    // url = 'http://www.wordandphrase.info/x3.asp?d=y&w1='+word+'&c1=n';
    // url = 'http://www.wordandphrase.info/frequencyList.asp';
    // console.log(url);
    res.send('you typed '+word);

    // request(url, function(error, response, html){
        // if(!error){
            // console.log(html);
            // var something = cheerio.load(html);
            // console.log(something);

            // var jsons = {'foo':'bar'};

            // $('tr[role="row"]').filter(function(){
            //     var name,category,time;
            //     var data = $(this);
            //     name = $(this).find('td:nth-child(4)').find('a').text();
            //     category = $(this).find('td:nth-child(5)').find('span').text();
            //     time = $(this).find('td:nth-child(9)').find('span').text();

            //     var json = { 'name' : name, 'category' : category, 'time' : time};
            //     jsons[Object.keys(jsons).length] = json;
            // });
            // res.send(html);
        // }

        // res.send('<pre>'+jsons+'</pre>');
        // res.send($);

        // fs.writeFile('output.json', JSON.stringify(jsons, null, 4), function(err){
        //     console.log('File successfully written! - Check your project directory for the output.json file');
        // });
    // });
});

app.get('/', function (req, res) {
    res.send('It works!');
});

app.listen('8081');
console.log('Magic happens on port 8081');
console.log(os.networkInterfaces());
exports = module.exports = app;
