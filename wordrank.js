var exec = require('child_process').exec;

var scrape = function(word, callback) {
	var execString = './node_modules/phantomjs/bin/phantomjs ./wordrankScrape.js '+word;
	var result = exec(execString, function (err, stdout, stderr) {
		if (err) {
			console.log(err);
			exit(0);
		}
		callback(stdout);
	});
};

var exports = module.exports = {};

exports.scrape = scrape;