# WordRank

Interface for http://www.wordandphrase.info/frequencylist.asp

* Input: English Word
* Output: Rank (commonality)
* * ie. Higher Number => Rarer Word.

Inspired by Amazon SalesRank and Google PageRank

### Example

	philippe@ubuntu64:~/workspace$ wordrank ornithology
	34322

	philippe@ubuntu64:~/workspace$ wordrank the
	1

In other words, "the" is the most common word in English, and "ornithology" is te 34,322nd.

### TODOs

* implement DB logging, caching
* implement demo key + user keys
* open up REST api
* make available also as command line API
* more output

	philippe@ubuntu64:~/workspace/wordrank$ ./node_modules/phantomjs/bin/phantomjs ./scratch.js foobar

	philippe@ubuntu64:~/workspace/wordrank$ ./node_modules/phantomjs/bin/phantomjs ./scratch.js aquatic
	8355

	philippe@ubuntu64:~/workspace/wordrank$ ./node_modules/phantomjs/bin/phantomjs ./scratch.js the
	1

	philippe@ubuntu64:~/workspace/wordrank$ ./node_modules/phantomjs/bin/phantomjs ./scratch.js archaic
	13544

	philippe@ubuntu64:~/workspace/wordrank$ ./node_modules/phantomjs/bin/phantomjs ./scratch.js serendipity
	24935

	philippe@ubuntu64:~/workspace/wordrank$ ./node_modules/phantomjs/bin/phantomjs ./scratch.js alphanumerical

	philippe@ubuntu64:~/workspace/wordrank$ ./node_modules/phantomjs/bin/phantomjs ./scratch.js alphabet
	9387
