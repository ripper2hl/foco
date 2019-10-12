const Yeelight = require('yeelight2');
const express = require('express');
const app = express();
const Color = require('color');
let light;

app.use(express.static('public'));

app.get('/color/:color', function (req, res) {
  let color = Color('#' + req.params.color);
  let luminosity = (color.luminosity() * 200).toFixed(0);
  light.set_rgb(parseInt( req.params.color ,16), 'smooth', 500);
  light.set_bright( luminosity,'smooth' , 500);
  console.info( '******************************' );
  console.info( 'color: ', '#' + req.params.color );
  console.info( 'luminosity: ', luminosity );
  console.info( '******************************' );
  res.send(true);
});

Yeelight.discover(function(l){
  light = l;
  console.log(light);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});