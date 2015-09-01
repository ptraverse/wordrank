// usage: node wordrankTest.js <test-word>

var wordrank = require('./wordrank');
var _ = require('underscore');

//for CLI
var args = process.argv;
var testPhrase = args[args.length - 1];

//default test word
if (testPhrase === 'wordrankTest.js') {
	testPhrase = 'ornithology'; //34322
}

//invoke "scrape" function, use result in callback
wordrank.scrape(testPhrase, function(rank) {
	console.log(rank);
});
