var fs = require('fs');

var db = JSON.parse(fs.readFileSync('db.json'));

var clone = function(db) {
	var copy = [];
	db.forEach(function(entry) {
		copy.push({
			tags: entry.tags.map(function(a) { return a;}),
			message: entry.message
		});
	});
	return copy;
};

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var matchWord = function(db, word, generics) {
	var result = null;
	db.some(function(entry) {
		if (entry.tags.indexOf(word) !== -1) {
			result = entry;
			return true;
		}
		return false;
	});
	
	
	
	if (generics === true && result === null) {
		db.some(function(entry) {
			if (entry.tags.length === 0) {
				result = entry;
				return true;
			}
			return false;
		});
	}
	return result;
};

exports.word = function(word, generics) {
	return matchWord(shuffle(clone(db)), word, generics);
};


//console.log('match:', matchWord(process.argv[2]), process.argv[2]);