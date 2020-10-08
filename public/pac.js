const video = document.getElementById('my_video');
const thecanvas = document.getElementById('thecanvas');
const img = document.getElementById('thumbnail_img');
const inputFile = document.getElementById('video-src');
const buttonWebcam = document.getElementById('webcam-src-button');
const colorThief = new ColorThief();
let pararIntervalo = false;
let colorFileContent;
let videoCurrentTime = 0;
let counter = 0;

inputFile.addEventListener( 'change', e =>{
  var input = e.target;
  var reader = new FileReader();
  reader.onload = function(){
    colorFileContent = reader.result.split('\n');
    console.log(colorFileContent);
    start();
  };
  reader.readAsText(input.files[0]);
});

function start(){
  var id = setInterval( function (){
   if( pararIntervalo ){
     clearInterval(id);
   }else{
     sendColor(colorFileContent[counter].split(',')[0]);
     counter += 2;
   }
 }, 2000 );
}

function sendColor(colorP) {
  fetch('/color/' + colorP ,{
    headers : {
      'access-control-allow-origin' : '*'
    }
  });
}
