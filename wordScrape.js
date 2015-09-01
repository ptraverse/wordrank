//Main Scrape Fucntion of http://www.wordandphrase.info/frequencyList.asp
//Must be invoked using phantomjs environment

// invoke with
// philippe@ubuntu64:~/workspace/wordrank$
// ./node_modules/phantomjs/bin/phantomjs ./wordrankScrape.js
// Eventually:
// ./node_modules/phantomjs/bin/phantomjs ./wordrankScrape.js --word="ornithology"
// ./node_modules/phantomjs/bin/phantomjs ./wordrankScrape.js -w ornithology
// ./wordrank --word="ornithology"
// ./wordrank -w ornithology
// Bash?
// wordrank ornithology
// Npm
// wordrank = require('wordrank');
// rank = wordrank.scrape("ornithology");
var _ = require('underscore');
var webpage = require('webpage');

var page = webpage.create();
var loadInProgress = false;
var testindex = 0;

//for CLI
var system = require('system');
var args = system.args;
var testPhrase = args[args.length - 1];


// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log('console> ' + msg);
};

page.onAlert = function(msg) {
    console.log('alert!> ' + msg);
};

page.onLoadStarted = function() {
    loadInProgress = true;
    // console.log("load started");
};

page.onLoadFinished = function(status) {
    loadInProgress = false;
    if (status !== 'success') {
        // console.log('Unable to access network');
        phantom.exit();
    } else {
        // console.log("load finished");
    }
};

page.onNavigationRequested = function(url, type, willNavigate, main) {
    // console.log('Trying to navigate to: ' + url);
    // console.log('Caused by: ' + type);
    // console.log('Will actually navigate: ' + willNavigate);
    // console.log("Sent from the page's main frame: " + main);
};

/* --------------------- */

//Each step is stepped into by the interval function at the end
var steps = [

    //Go to dat url
    function() {
        page.open('http://www.wordandphrase.info/frequencyList.asp');
    },

    //Search for a word
    function() {
        //switch to form frame "lefto"
        page.switchToChildFrame('lefto');

        //add jquery
        var injectSuccess = page.injectJs('./jquery.min.js');

        //fill out the form
        page.evaluate(function(testPhrase) {
            //Have to use custom click firer
            //http://stackoverflow.com/questions/15739263/phantomjs-click-an-element
            var click = function(el) {
                var ev = document.createEvent("MouseEvent");
                ev.initMouseEvent(
                    "click",
                    true /* bubble */ , true /* cancelable */ ,
                    window, null,
                    0, 0, 0, 0, /* coordinates */
                    false, false, false, false, /* modifier keys */
                    0 /*left*/ , null
                );
                el.dispatchEvent(ev);
            };

            /* This is where the magic happens */
            $('input#w1').val(testPhrase); //fill out the word
            $('input[name="B1"]').click(); //click "Search" button
            /* That was exciting */

        }, testPhrase); //have to bind that variable to make it closure to the heart
    },

    //Move to results frame
    function() {
        page.switchToParentFrame();
        page.switchToChildFrame('righto');
    },

    //Crawl the number we want
    function() {

        //add jquery again (?)
        var injectSuccess = page.injectJs('./jquery.min.js');

        //get the number
        var wordrank = page.evaluate(function() {

            //Have to use custom click firer
            //http://stackoverflow.com/questions/15739263/phantomjs-click-an-element
            var click = function(el) {
                var ev = document.createEvent("MouseEvent");
                ev.initMouseEvent(
                    "click",
                    true /* bubble */ , true /* cancelable */ ,
                    window, null,
                    0, 0, 0, 0, /* coordinates */
                    false, false, false, false, /* modifier keys */
                    0 /*left*/ , null
                );
                el.dispatchEvent(ev);
            };

            // need to get text of xpath
            // html/body/div/table[2]/tbody/tr[2]/td[2]/a
            var a = document.evaluate(
                'html/body/div/table[2]/tbody/tr[2]/td[2]',
                document,
                null,
                XPathResult.STRING_TYPE,
                null);

            return a.stringValue;
        });
        return (wordrank);
    }

];

interval = setInterval(function() {
    if (!loadInProgress && typeof steps[testindex] == "function") {
        // console.log("step " + (testindex + 1));
        var result = steps[testindex]();
        testindex++;
        if (typeof result !== 'undefined') {
            console.log(result);
        }
    }
    if (typeof steps[testindex] != "function") {
        // console.log("test complete!");
        // console.log(steps[testindex]);
        phantom.exit();
    }
}, 50);