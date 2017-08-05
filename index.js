const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials/common');
hbs.registerPartials(__dirname + '/views/partials/account');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

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

app.listen(3000);
