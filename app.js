var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.listen(3000, () => {
  console.log("Server listening on....");
});
