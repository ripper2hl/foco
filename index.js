const Yeelight = require('yeelight2');
const randomColor = require('randomcolor');
const express = require('express');
const app = express();
let light;

app.use(express.static('public'));

app.get('/color/:color', function (req, res) {
  
  light.set_rgb(parseInt( req.params.color.replace('#',''),16), 'smooth', 1500);
  res.send(true);
});

Yeelight.discover(function(l){
  light = l;
  console.log(light.name);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});