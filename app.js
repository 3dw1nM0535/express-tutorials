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

//Global vars Middleware
app.use((req, res, next) => {
  res.local.errors = null;
  next();
});

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
      var namespace = param.split('.');
      var root    = namespace.shift();
      var  formParam = root;
      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }

      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },

}));

//Views Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Public static folder Middleware
app.use(express.static(path.join(__dirname, 'Public')));

/*
Object to be returned as json
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

app.get('/', (req, res) => {
  var title = 'Customers';
  res.render('index', { title: title, errors: errors });
});

app.post('/users/add', (req, res) => {
  req.checkBody('first_name', 'Firstname is Required!').notEmpty();
  req.checkBody('last_name', 'Lastname is Required!').notEmpty();
  req.checkBody('email', 'Email is Required!').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    var title = 'Customers';
    res.render('index', { title: title, errors: errors });
  } else {
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    };
    console.log('SUCCESS!'); //Log to console to test code trust
  }

});

app.listen(3000, '127.0.0.1', () => {
  console.log('Server listening on....'); //Log to console to test server legitimacy
});
