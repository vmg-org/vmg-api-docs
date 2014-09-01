var express = require('express');

var app = express();

app.use(express.static('public'));

app.listen(39393, function() {
  console.log('http://localhost:39393/');
});
