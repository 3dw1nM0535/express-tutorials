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

//Views Middleware
app.set("views", "ejs");
app.set("views", path.join(__dirname, "views"));

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Public static folder Middleware
app.use(express.static(path.join(__dirname, "Public")));
var people = [
  {
    name: "Mike",
    age: 32
  },
  {
    name: "Brian",
    age: 22
  },
  {
    name: "Millicent",
    age: 21
  }
];


app.get("/", (req, res) => {
  res.json(people);
});

app.listen(3000, () => {
  console.log("Server listening on....");
});
