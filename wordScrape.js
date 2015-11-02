//Main Scrape Fucntion of http://www.wordandphrase.info/frequencyList.asp
//Must be invoked using phantomjs environment

// invoke with
// philippe@ubuntu64:~/workspace/wordrank$
// ./node_modules/phantomjs/bin/phantomjs ./wordScrape.js ornithology

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
    // console.log('console> ' + msg);
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
    },

    //Search for a word
    function() {
        //switch to form frame "lefto"
        page.switchToChildFrame('lefto');

        //add jquery
        var injectSuccess = page.injectJs('./jquery.min.js');

        //fill out the form
        page.evaluate(function(testPhrase) {

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

    //If there is more than one result Then click on the first one
    function() {

    },

    //Switch to bottom frame
    function() {
        page.switchToParentFrame();
        page.switchToChildFrame('xbottom');
    },

    //Crawl the number we want
    function() {

        var result = page.evaluate(function() {
            // summary string
            var a = document.evaluate(
                'html/body/table[1]/tbody/tr[1]/td[1]',
                document,
                null,
                XPathResult.STRING_TYPE,
                null);

            //get the part of speech (noun, verb etc)
            var re1 = /\w+\s/g;
            console.log(a);
            console.log(a.stringValue);
            var wMatches = (a.stringValue).match(re1);
            var partOfSpeech;
            if (wMatches) {
                partOfSpeech = wMatches[1].trim();
            } else {
                console.log('no wMatches?');
                console.log(wMatches);
            }

            //get the numbers for rank and freq
            var re2 = /\d+/g;
            var dMatches = a.stringValue.match(re2);
            var rank;
            var freq;
            if (dMatches) {
                rank = dMatches[0];
                freq = dMatches[1];
            } else {
                console.log('no dMatches?');
                console.log(dMatches);
            }

            result = {};
            result.partOfSpeech = partOfSpeech;
            result.rank = rank;
            result.freq = freq;
            return result;
        });

        return result;
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