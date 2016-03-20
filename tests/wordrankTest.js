'use strict';

var assert = require('assert');
var wordrank = require("../wordrank");

describe('Wordrank', function() {

    //TODO - Test for weird results - super high numbers, words that aren't words, words that aren't in the list
    //TODO Also - Test for connection issues - throttling - etc.
    describe('#getWord()', function() {

        this.timeout(15000);
        it('can get an uncached word from the internet', function(done) {
            var testPhrase = 'ornithology';
            var expectedRank = '34322';
            wordrank.getWord(testPhrase, function(rank) {
                assert.equal(rank, expectedRank);
                wordrank.dbRemoveWord(testPhrase);
                done();
            });
        });

        this.timeout(500);
        it('is fast when it already has the word in cache', function(done) {
            var testPhrase = 'hibernate';
            var expectedRank = '23456';
            wordrank.getWord(testPhrase, function(rank) {
                assert.equal(rank, expectedRank);
                done();
            });
        });

        this.timeout(10000);
        it('fails gracefully on a non-word', function(done) {
            var testPhrase = 'iamntaword';
            var expectedResult = '?';
            wordrank.getWord(testPhrase, function(result) {
                console.log(result);
                assert.equal(result, expectedResult);
                done();
            });
        });
        
    });

});



