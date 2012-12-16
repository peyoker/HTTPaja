var match = function(text, fn) {
	var words = text.replace(/[\.\,\!\[\]\(\)\?]/, ' ').split(' ').map(function(word) {
		return word.toLowerCase();
	});
	
	var matches = [];
	words.forEach(function(word) {
		var match = fn(word);
		if (match !== null) {
			matches.push(match);
		}
	});
	
	console.log(matches.length + ' matches...');
	matches.forEach(function(match) {
		match.count = words.reduce(function(value, word) {
			return value + (match.tags.indexOf(word) === -1 ? 0 : 1)
		}, 0);
	});
	
	if (matches.length > 0) {
		return matches.reduce(function(current, match) {
			if (match.count >= current.count) {
				return match;
			} else {
				return current;
			}
		}).message;
	} else {
		return fn(' ', true).message;
	}
};

exports.match = match;
