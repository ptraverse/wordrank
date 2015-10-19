# WordRank

Interface for http://www.wordandphrase.info/frequencylist.asp

* Input: English Word
* Output: Rank (commonality)
  * ie. Higher Number => Rarer Word.

Inspired by Amazon SalesRank and Google PageRank

### Build

	git clone https://github.com/ptraverse/wordrank.git
	cd wordrank
	npm update
	sudo npm start
	sudo npm stop

### Example

	philippe@ubuntu64:~/workspace$ wordrank ornithology
	34322

	philippe@ubuntu64:~/workspace$ wordrank the
	1

In other words, "the" is the most common word in English, and "ornithology" is te 34,322nd.

### Demo

build and use demo.html

<img src="/demoCapture.JPG" />

### TODOs

* implement DB logging, caching
* implement demo key + user keys
* open up REST https://github.com/ptraverse/wordrank.git
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

### Notes

/* post install mongo make db folder */
sudo mkdir -p /data/db
chown `whoami` /data/db

/* mongodaemon start */
mongod -f ./mongod.conf && ./node_modules/mongodb-rest/bin/mongodb-rest

/* CLI */
mongo
/* Create if needed and use wordrank db */

use wordrank

/* Create wordrank collection */
db.words.insert(
	{
		word: "ornithology",
		rank: "123456"
	}
)
