var express = require('express');
var app = express();
var gen = require('./lib/generator.js')

//sends out [[abc],[abc]]
app.get('/', function(req, res) {
  gen.sendJason('CSCI-109', 'csci', 20161, function(answer) {
    res.send(answer);
  });

});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
