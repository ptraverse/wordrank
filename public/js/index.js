$(document).ready(function() {

	var buildWordUsage = function(word, rank) {
		var usage = "var wc = require('wordrank-client');\nvar word = '"+word+"';\nvar result = wc.getWord(word);\nvar rank = result.rank; // => "+rank+"\n";
		return usage;
	};

	var buildRankUsage = function(rank, word) {
		var usage = "var wc = require('wordrank-client');\nvar rank = '"+rank+"';\nvar result = wc.getRank(rank);\nvar word = result.word; // => "+word+"\n";
		return usage;
	};

	// getWord form change
	$('input#inputWord').change(function() {
		var inputWord = $(this).val();
		// console.log("Getting Rank via Ajax for "+inputWord);
		$('div#result').html('... ');
		$('div#getUrl').html('... ');
		$('div#usage').html('... ');
		$.get('/word/'+inputWord, function(jsonResult) {
			console.log(jsonResult);
			
			$('div#result').html(JSON.stringify(jsonResult));
			// var getHref = '/word/'+inputWord;
			// $('div#getUrl').html('<a href="'+getHref+'" target="_blank">'+'GET'+'</a><br/>');
			// $('div#usage').html('<pre>'+buildWordUsage(inputWord,jsonResult.response.rank)+'</pre><br/>');
		}).fail( function() {
			// console.log('fail');
			$('div#result').html('fail');
		}).done( function() {
			// console.log('done');
		});
	});
});