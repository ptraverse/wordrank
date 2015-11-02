var exec = require('child_process').exec;
var util = require('util');
var db = require('mongoskin').db('mongodb://localhost:27017/wordrank');

/** Scrape Word Directly From Web using PhantomJS Wrapper */
var _scrapeWord = function(word, callback) {
	var execString = './node_modules/phantomjs/bin/phantomjs ./wordScrape.js '+word;
	var result = exec(execString, function (err, stdout, stderr) {
		if (err) {
			throw err;
		}
		var rank = JSON.parse(stdout.trim());
		// Save the result to MongoDb
		dbCreateWord(word, rank);
		callback(rank);
	});
};

/** Scrape Rank Directly via PhantomJS Wrapper */
var _scrapeRank = function(rank, callback) {
	var execString = './node_modules/phantomjs/bin/phantomjs ./rankScrape.js '+rank;
	var result = exec(execString, function (err, stdout, stderr) {
		if (err) {
			throw err;
		}
		var word = stdout.trim();
		//Save result to MongoDB
		dbCreateWord(word, rank);
		callback(word);
	});
};

/** Save Results to MongoDB **/
var dbCreateWord = function(word, jsonResult, callback) {
	console.log('dbCreateWord');
	console.log(jsonResult);
	var result = jsonResult;
	console.log(result.rank);
	var json = { 'word': word, 'rank': result.rank, 'freq': result.freq, 'partOfSpeech': result.partOfSpeech };
	db.bind('words');
	db.words.insert(json, function(err) {
		if (err) {
			throw err;
		}
		console.log("inserted!");

		if (callback) {
			callback();
		}
	});
};

/** Fetch from Mongodb **/
var dbReadWord = function(word, callback) {
	db.bind('words');
	var query = { 'word': word };
	db.words.findOne(query, function(err, result) {
		if (err) {
			throw err;
		}
		if (result) {
			callback(err, result);
		} else {
			callback(err, undefined);
		}
	});
};

/** Fetch from Mongodb by rank **/
var dbReadWordByRank = function(rank, callback) {
	db.bind('words');
	var query = { 'rank': rank };
	db.words.findOne(query, function(err, result) {
		if (err) {
			throw err;
		}
		if (result) {
			callback(err, result.word);
		} else {
			callback(err, undefined);
		}
	});
};


var dbUpdateWord = function(word, rank, callback) {
	throw "not yet implemented";
};
var dbRemoveWord = function(word, callback) {
	db.bind('words');
	query = {'word' : word};
	db.words.remove(query, function (err, result) {
		if (err) {
			throw err;
		}
		console.log('removed!');

		if (callback) {
			callback();
		}
	});
};

var getWord = function(word, callback) {
	dbReadWord(word, function(err, readResult) {
		if (err) {
			throw err;
		}
		if (readResult) {
			return callback(readResult);
		} else {
			return _scrapeWord(word, callback);
		}
	});
};

var getRank = function(rank, callback) {
	dbReadWordByRank(rank, function(err, word) {
		if (err) {
			throw err;
		}
		if (word) {
			return callback(word);
		} else {
			return _scrapeRank(rank, callback);
		}
	});
};

//TODO - isCached function

var exports = module.exports = {};

exports.getWord = getWord;
exports.getRank = getRank;
exports.dbCreateWord = dbCreateWord;
exports.dbReadWord = dbReadWord;
exports.dbRemoveWord = dbRemoveWord;
exports.dbUpdateWord = dbUpdateWord;