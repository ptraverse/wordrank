//demo.js - interactive elements of demo page at /demo

$(document).ready(function() {

	$('input#inputWord').change(function() {
		var inputWord = $(this).val();
		console.log("Getting Rank via Ajax for "+inputWord);
		$('div#result').html('... ');
		$.get('/word/'+inputWord, function(jsonResult) {
			console.log(jsonResult);
			console.log(jsonResult.response.rank);
			$('div#result').html(jsonResult.response.rank);
		}).fail( function() {
			console.log('fail');
			$('div#result').html('fail');
		}).done( function() {
			console.log('done');
		});
	});

});