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
		$('div#result').html('... ');
		$.get('/word/'+inputWord, function(jsonResult) {
			console.log(jsonResult);
			$('div#result').html(JSON.stringify(jsonResult));
		}).fail( function() {			
			$('div#result').html('oops! something went wrong');
		});
	});

	//focus on input box
	$('input#inputWord').focus();
});