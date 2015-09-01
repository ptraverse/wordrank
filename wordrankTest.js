// usage: node wordrankTest.js
var wordrank = require('./wordrank');

//poor man's assert
var assert = function(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
};


/* getWord Test */
var getWordTest = function() {
	var testPhrase = 'ornithology';
	console.log("Getting Word: "+testPhrase+" ... ");
	wordrank.getWord(testPhrase, function(rank) {
		console.log("Got rank for "+testPhrase+"!");
		console.log(rank); //34322
		assert(parseInt(rank)===34322,"ornithology should be 34322");
	});
};


/* getRank Test*/
var getRankTest = function() {
	var testRank = 23456;
	console.log("Getting Rank: "+testRank+" ... ");
	wordrank.getRank(testRank, function(word) {
		console.log("Got word for "+testRank+"!");
		console.log(word); //"hibernate"
		assert(word=="hibernate","23456 should be hibernate");
	});
};


/* Run Tests */
getWordTest();
getRankTest();

//TODO - Test for weird results - super high numbers, words that aren't words, words that aren't in the list
//Also - Test for connection issues - throttling - etc.