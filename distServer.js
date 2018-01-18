var express = require('express');
var app = require('express')();
module.exports = app; // for testing
var path = require('path');
var open = require('open');
var compression = require('compression');

app.use(compression());
app.use(express.static('dist'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen('5000', function (err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:5000');
  }
});
