var exec = require('child_process').exec;

var getWord = function(word, callback) {
	var execString = './node_modules/phantomjs/bin/phantomjs ./wordScrape.js '+word;
	var result = exec(execString, function (err, stdout, stderr) {
		if (err) {
			console.log(err);
			exit(0);
		}
		callback(stdout.trim());
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