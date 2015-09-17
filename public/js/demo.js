//demo.js - interactive elements of demo page at /demo

$(document).ready(function() {

	var buildWordUsage = function(word, rank) {
		var usage = "var wc = require('wordrank-client');\nvar word = '"+word+"';\nvar result = wc.getWord(word);\nvar rank = result.rank; // => "+rank+"\n";
		return usage;
	};

	$('input#inputWord').change(function() {
		var inputWord = $(this).val();
		console.log("Getting Rank via Ajax for "+inputWord);
		$('div#result').html('... ');
		$('div#getUrl').html('... ');
		$('div#usage').html('... ');
		$.get('/word/'+inputWord, function(jsonResult) {
			console.log(jsonResult);
			console.log(jsonResult.response.rank);
			$('div#result').html(jsonResult.response.rank);
			var getHref = '/word/'+inputWord;
			$('div#getUrl').html('<a href="'+getHref+'"">'+'GET'+'</a><br/>');
			$('div#usage').html('<pre>'+buildWordUsage(inputWord,jsonResult.response.rank)+'</pre><br/>');
		}).fail( function() {
			console.log('fail');
			$('div#result').html('fail');
		}).done( function() {
			console.log('done');
		});
	});

});