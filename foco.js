#!/usr/bin/env node

const Yeelight = require('yeelight2');
const express = require('express');
const app = express();
const Color = require('color');

const http = require('http');
const https = require('https');
const selfsigned = require('selfsigned');
const attrs = [{ name: 'foco', value: 'localhost', type: 'foco' }];
const pems = selfsigned.generate(attrs, { days: 365 });
const credentials = {key: pems.private, cert: pems.cert};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
console.log(pems);

let light;
let isLightBeforeValue = 0;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.static(__dirname + '/public'));

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

httpServer.listen(3000);
httpsServer.listen(3443);