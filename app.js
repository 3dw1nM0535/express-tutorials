var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

/*
var logger = (req, res, next) => {
  console.log("Logging...");
  next();
}
*/

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Public static folder Middleware
app.use(express.static(path.join(__dirname, "Public")));

app.get("/", (req, res) => {
  res.send("Hello world!");
})

app.listen(3000, () => {
  console.log("Server listening on....");
});
