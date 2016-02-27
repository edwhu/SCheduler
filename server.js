'use strict'
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const alg = require('./app/algorithm.js');
const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api', (req, res) => {
  console.log(req.body);
  alg.create(req.body.course, answer => res.send(answer));
});


let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
