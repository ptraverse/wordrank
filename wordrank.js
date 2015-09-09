var exec = require('child_process').exec;
var db = require('mongoskin').db('mongodb://localhost:27017/wordrank');

/** Scrape Word Directly From Web using PhantomJS Wrapper */
var _scrapeWord = function(word, callback) {
	var execString = './node_modules/phantomjs/bin/phantomjs ./wordScrape.js '+word;
	var result = exec(execString, function (err, stdout, stderr) {
		if (err) {
			throw err;
		}
		var rank = stdout.trim();
		// Save the result to MongoDb
		_dbCreateWord(word, rank);
		callback(rank);
	});
};

/** Save Results to MongoDB **/
var _dbCreateWord = function(word, rank, callback) {
	var json = { 'word': word, 'rank': rank };
	console.log("about to insert!");
	console.log(json);
	console.log(db);
	db.bind('words');
	db.words.insert(json, function(err) {
		if (err) {
			throw err;
		}
		console.log("inserted!");
	});
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