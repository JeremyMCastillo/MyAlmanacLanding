const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials/common');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
  res.render('template.hbs', {
    headingTitle: 'MyAlmanac',
    content: 'home'
  });
});

app.listen(3000);
