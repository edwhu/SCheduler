var express = require('express');
var path = require('path');
var alg = require('./lib/algorithm.js');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
//sends out 1st element of schedule array
app.get('/api', function(req, res) {
  alg.create(function(answer) {
    res.send(answer);
  });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
