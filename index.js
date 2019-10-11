const Yeelight = require('yeelight2');
const randomColor = require('randomcolor');
const express = require('express');
const app = express();
let light;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/video.mp4', function (req, res) {
  res.sendFile(__dirname + '/video.mp4');
});

app.get('/script.js', function (req, res) {
  res.sendFile(__dirname + '/script.js');
});

app.get('/color-thief.umd.js', function (req, res) {
  res.sendFile(__dirname + '/color-thief.umd.js');
});

app.get('/color/:color', function (req, res) {
  
  light.set_rgb(parseInt( req.params.color.replace('#',''),16), 'sudden', 30);
  res.send(true);
});

Yeelight.discover(function(l){
  light = l;
  console.log(light.name);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});