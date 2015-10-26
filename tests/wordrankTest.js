// usage: node wordrankTest.js
var wordrank = require("../wordrank");

//poor man's assert
var assert = function(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
};


/* getCachedWord Test */
var getCachedWordTest = function() {
	//test one that's in the DB
	var testPhrase = "ornithology";
	var expectedResult = 34322;
	console.log("Getting Cached Word: "+testPhrase);
	console.log("Expecting: "+expectedResult);
	wordrank.getWord(testPhrase, function(rank) {
		console.log("Finished! Got: "+rank);
		assert(parseInt(rank)===expectedResult,testPhrase+" should be "+expectedResult);
	});
};

var getUncachedWordTest = function() {
	var testPhrase = "algae";
	console.log("Getting Uncached Word: "+testPhrase);
	wordrank.getWord(testPhrase, function(rank) {
		console.log('finished! got: '+rank);
		assert(typeof(rank)!='undefined',rank+" should be defined");
		wordrank.dbRemoveWord(testPhrase);
	});
};

/* getRank Test*/
var getRankTest = function() {
	var testRank = 23456;
	var expectedResult = "hibernate";
	console.log("Getting Rank: "+testRank);
	console.log("Expecting: "+expectedResult);
	wordrank.getRank(testRank, function(word) {
		console.log("Finished! Got: "+word);
		assert(word==expectedResult,testRank+" should be "+expectedResult);
	});
};

/* Run Tests */
// getUncachedWordTest();
// getCachedWordTest();
getWordTest();
// getRankTest();


//TODO - Test for weird results - super high numbers, words that aren't words, words that aren't in the list
//Also - Test for connection issues - throttling - etc.