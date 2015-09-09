var exec = require('child_process').exec;

/** Scrape Word Directly From Web using PhantomJS Wrapper */
var _scrapeWord = function(word, callback) {
	var execString = './node_modules/phantomjs/bin/phantomjs ./wordScrape.js '+word;
	var result = exec(execString, function (err, stdout, stderr) {
		if (err) {
			console.log(err);
			exit(0);
		}
		callback(stdout.trim());
	});
};

/** Save Results to MongoDB **/
var _dbCreateWord = function(word, callback) {
	throw "not yet implemented";
};
var _dbReadWord = function(word, callback) {
	throw "not yet implemented";
};
var _dbUpdateWord = function(word, callback) {
	throw "not yet implemented";
};
var _dbDeleteWord = function(word, callback) {
	throw "not yet implemented";
};

var getWord = function(word, callback) {
	return _scrapeWord(word, callback);
};

var getRank = function(rank, callback) {
	var execString = './node_modules/phantomjs/bin/phantomjs ./rankScrape.js '+rank;
	var result = exec(execString, function (err, stdout, stderr) {
		if (err) {
			console.log(err);
			exit(0);
		}
		callback(stdout.trim());
	});
};

var exports = module.exports = {};

exports.getWord = getWord;
exports.getRank = getRank;