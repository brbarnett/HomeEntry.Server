var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();
app.use( bodyParser.json());

var allowed = [
    '0x829770c2' // myfare
    ];

app.post('/api/entry/authenticate', function(req, res) {
  var uid = req.body.uid;
  
  res.send(_.includes(allowed, uid));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});