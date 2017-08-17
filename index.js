const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const request = require('request');
const cookieParser = require('cookie-parser');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'abc123',
  cookie: {
    path: '/',
    domain: '192.168.0.10',
    maxAge: 1000 * 60 * 24 * 14,
    resave: true,
    saveUninitialized: true
  }
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

hbs.registerPartials(__dirname + '/views/partials/common');
hbs.registerPartials(__dirname + '/views/partials/account');
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
  res.render('template.hbs', {
    headingTitle: 'MyAlmanac',
    content: 'home',
    home: true
  });
});

app.get("/signup", (req, res) => {
  res.render('template.hbs', {
    headingTitle: 'MyAlmanac: Log In',
    content: 'signup',
    home: false
  });
});

app.post("/signup", (req, res) => {
  request({
    url: 'http://192.168.0.10:3030/users/signup',
    method: 'POST',
    json: req.body
  }, (err, response, body) => {
    if(response.statusCode !== 200){
      res.render('template.hbs', {
        headingTitle: 'MyAlmanac: Sign Up',
        content: 'signup',
        home: false,
        email: req.body.email,
        error: response.body.error
      });
    } else {
      res.cookie('myalmanac_authtoken', response.headers['x-auth']).redirect('http://192.168.0.10:4200');
    }
  });
});

app.post("/login", (req, res) => {
  request({
    url: 'http://192.168.0.10:3030/users/login',
    method: 'POST',
    json: req.body
  }, (err, response, body) => {
    if(response.statusCode !== 200){
      res.render('template.hbs', {
        headingTitle: 'MyAlmanc: Sign Up',
        content: 'signup',
        home: false,
        email: req.body.email
      });
    } else {
      res.cookie('myalmanac_authtoken', response.headers['x-auth']).redirect('http://192.168.0.10:4200');
    }
  });
});

app.listen(3000);
