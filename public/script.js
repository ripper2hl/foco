const video = document.getElementById('my_video');
const thecanvas = document.getElementById('thecanvas');
const img = document.getElementById('thumbnail_img');
const inputFile = document.getElementById('video-src');
const buttonWebcam = document.getElementById('webcam-src-button');
const colorThief = new ColorThief();
let pararIntervalo = false;

buttonWebcam.addEventListener( 'click', e => {
  e.preventDefault();
  webcam();
});

inputFile.addEventListener( 'change', e =>{
  e.preventDefault();
  let videoSrc = inputFile.files[0];
  video.setAttribute('src', URL.createObjectURL(videoSrc) );
});

video.addEventListener('play', function() {
  pararIntervalo = false;
   var id = setInterval( function (){
    if( pararIntervalo ){
      clearInterval(id);
    }else{
      draw(video, thecanvas, img);
    }
  }, 2500 );
  
}, false);

video.addEventListener('pause', function() {
  pararIntervalo = true;
}, false);


function draw(video, thecanvas, img) {

  // get the canvas context for drawing
  var context = thecanvas.getContext('2d');

  // draw the video contents into the canvas x, y, width, height
  context.drawImage(video, 0, 0, thecanvas.width, thecanvas.height);

  // get the image data from the canvas object
  var dataURL = thecanvas.toDataURL();

  // set the source of the img tag
  img.setAttribute('src', dataURL);

}

const rgbToHex = (r, g, b) => [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')


img.addEventListener('load', function() {
  let colorP = colorThief.getColor(img);
  fetch('/color/' + rgbToHex(colorP[0], colorP[1], colorP[2]),{
    headers : {
      'access-control-allow-origin' : '*'
    }
  });
});

const constraints = {
  audio: false,
  video: {
    width: 1280, height: 720
  }
};

// Access webcam
async function webcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    console.error(`navigator.getUserMedia error:${e.toString()}`);
  }
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
  video.play();
}
