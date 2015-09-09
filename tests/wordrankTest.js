// usage: node wordrankTest.js
var wordrank = require("../wordrank");

//poor man's assert
var assert = function(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
};


/* getWord Test */
var getWordTest = function() {
	var testPhrase = "ornithology";
	var expectedResult = 34322;
	console.log("Getting Word: "+testPhrase);
	console.log("Expecting: "+expectedResult);
	wordrank.getWord(testPhrase, function(rank) {
		console.log("Finished! Got: ");
		console.log(rank);
		assert(parseInt(rank)===expectedResult,testPhrase+" should be "+expectedResult);
	});
};


/* getRank Test*/
var getRankTest = function() {
	var testRank = 23456;
	var expectedResult = "hibernate";
	console.log("Getting Rank: "+testRank);
	console.log("Expecting: "+expectedResult);
	wordrank.getRank(testRank, function(word) {
		console.log("Finished!");
		console.log("Got: "+word);
		assert(word==expectedResult,testRank+" should be "+expectedResult);
	});
};


/* Run Tests */
getWordTest();
getRankTest();

//TODO - Test for weird results - super high numbers, words that aren't words, words that aren't in the list
//Also - Test for connection issues - throttling - etc.