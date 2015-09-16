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
		var rank = stdout.trim();
		// Save the result to MongoDb
		dbCreateWord(word, rank);
		callback(rank);
	});
};

/** Save Results to MongoDB **/
var dbCreateWord = function(word, rank, callback) {
	var json = { 'word': word, 'rank': rank };
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
			callback(err, result.rank);
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
	dbReadWord(word, function(err, rank) {
		if (err) {
			throw err;
		}
		if (rank) {
			return callback(rank);
		} else {
			return _scrapeWord(word, callback);
		}
	});
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
exports.dbCreateWord = dbCreateWord;
exports.dbReadWord = dbReadWord;
exports.dbRemoveWord = dbRemoveWord;
exports.dbUpdateWord = dbUpdateWord;