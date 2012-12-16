var restify = require('restify');
var paja = require('./paja.js');
var anal = require('./analize.js');

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/word/:word', function (req, res, next) {
	res.send(paja.word(req.params.word, true).message);
});

server.get('/text/:text', function (req, res, next) {
	res.send(anal.match(req.params.text, paja.word));
});

server.listen(8080, function () {});


console.log('Match: ', anal.match('mirar este video que asco shurmanos', paja.word));