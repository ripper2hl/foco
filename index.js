const Yeelight = require('yeelight2');
const express = require('express');
const app = express();
const Color = require('color');
const open = require('open');

let light;
let isLightBeforeValue = 0;

app.use(express.static('public'));

app.get('/color/:color', function (req, res) {
  let color = Color('#' + req.params.color);
  let bright = color.isLight() ? 80: 0;
  
  light.set_rgb(parseInt( req.params.color ,16), 'smooth', 1000)
  .catch(err => { console.error( err ) });
  
  if( isLightBeforeValue !== bright){
    light.set_bright( bright,'smooth' , 1000)
    .catch(err => { console.error( err ) });
    isLightBeforeValue = bright;  
      console.info( 'bright is changed' );  
  }

  console.info( '******************************' );
  console.info( 'color: ', '#' + req.params.color );
  console.info( 'is light: ',  color.isLight() );
  console.info( '******************************' );
  res.send(true);
});

Yeelight.discover(function(l){
  light = l;
  console.log(light);
});

app.listen(3000, function () {
  open('http://localhost:3000/', {app: ['google-chrome']});
  console.log('Example app listening on port 3000!');
});