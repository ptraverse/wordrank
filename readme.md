# WordRank

Mongodb Caching Server to provide nodejs module for http://www.wordandphrase.info/frequencylist.asp

* Input: English Word
* Output: Rank (commonality)
  * ie. Higher Number => Rarer Word.

### Build

	git clone https://github.com/ptraverse/wordrank.git
	cd wordrank
	npm update
	sudo npm start
	sudo npm stop

### Example

<img src="/banana.jpg" />

In other words, "banana" is the 4,721st word in rarity in the "common" english language.

### Demo

build and use demo.html

<img src="/demoCapture.JPG" />

### Mongodb Init

/* Start MongoDB server using conf file and add mongodb-rest for crud */
mongod -f ./mongod.conf && ./node_modules/mongodb-rest/bin/mongodb-rest

/* CLI Instructions */
mongo

/* Create if needed and use wordrank db */
use wordrank

/* Create wordrank collection */
db.words.insert(
	{
		word: "the",
		rank: "1"
	}
)


### Moonshots
* Full sentences
* Adding all the other info:
* Part of speech
* Rarity Overall/by Source
** { Spoken, Fiction, Magazines, Newspaper, Academic  }
* Correlates / Synonyms
* Rarity "Category"
* Single/Multi Entry!? (homonyms, other definitions)
* Human Readable Definition
* Grammar
* Matrix - comparisons


### Invoke Scrape via PhantomJS Directly on cli

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
