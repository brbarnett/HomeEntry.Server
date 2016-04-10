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

var port = process.env.PORT || 1337;
app.listen(port, function () {
  console.log('Server started');
});