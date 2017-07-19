var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

/*
var logger = (req, res, next) => {
  console.log("Logging...");
  next();
}
*/

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Views Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Public static folder Middleware
app.use(express.static(path.join(__dirname, "Public")));
/*
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
*/

app.get("/", (req, res) => {
  var title = "Customers";
  res.render('index', {title});
});

app.post("/users/add", (req, res) => {
  var newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  };
  console.log(newUser);

});

app.listen(3000, () => {
  console.log("Server listening on....");
});
