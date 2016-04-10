var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use( bodyParser.json());

app.post('/api/entry/authenticate', function(req, res) {
  res.send(req.body);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});