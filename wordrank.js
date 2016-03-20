'use strict';

var exec = require('child_process').exec;
var util = require('util');
var db = require('mongoskin').db('mongodb://localhost:27017/wordrank');

/** Scrape Word Directly From Web using PhantomJS Wrapper */
var _scrapeWord = function(word, callback) {
  var execString = 'phantomjs ./wordScrape.js ' + word;
  exec(execString, function(err, stdout) {
    if (err) {
      throw err;
    }
    var rank = stdout.trim();
    // Save the result to MongoDb
    dbCreateWord(word, rank);
    callback(rank);
  });
};

/** Scrape Rank Directly via PhantomJS Wrapper */
var _scrapeRank = function(rank, callback) {
  var execString = 'phantomjs ./rankScrape.js ' + rank;
  exec(execString, function(err, stdout) {
    if (err) {
      throw err;
    }
    var word = stdout.trim();
    //Save result to MongoDB
    dbCreateWord(word, rank);
    callback(word);
  });
};

/** Create Word in MongoDB **/
var dbCreateWord = function(word, rank, callback) {
  var json = {'word': word, 'rank': rank};
  db.bind('words');
  db.words.insert(json, function(err) {
    if (err) {
      throw err;
    }

    if (callback) {
      callback();
    }
  });
};

/** Fetch from Mongodb **/
var dbReadWord = function(word, callback) {
  db.bind('words');
  var query = {'word': word};
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

/** Fetch from Mongodb by rank **/
var dbReadWordByRank = function(rank, callback) {
  db.bind('words');
  var query = {'rank': rank};
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

// TODO
// var dbUpdateWord = function(word, rank, callback) {
//   throw 'not yet implemented';
// };

var dbRemoveWord = function(word, callback) {
  db.bind('words');
  var query = {'word': word};
  db.words.remove(query, function(err) {
    if (err) {
      throw err;
    }

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

var exports = module.exports = {
    'getWord': getWord,
    'getRank': getRank,
    'dbCreateWord': dbCreateWord,
    'dbReadWord': dbReadWord,
    'dbRemoveWord': dbRemoveWord
};