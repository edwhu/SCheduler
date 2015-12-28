var express = require('express');
var app = express();
var alg = require('./lib/algorithm.js');

//sends out 1st element of schedule array
app.get('/', function(req, res) {
  alg.create(function(answer){res.send(answer);});
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
