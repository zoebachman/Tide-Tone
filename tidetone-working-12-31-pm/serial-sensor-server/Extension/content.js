//TideTone v.5 [working 12:31pm]

// This script loads after socket.io.js, so the "io" global
// variable below will already be present

var range;

var sensorData;

var tone1;
var tone2;
var tone3;
var tone4;
var tone5;
var tone6;
var tone7;
var tone8;

var toneArray = [];


// function preload() {

function setup() {
  tone1 = loadSound('assets/tone8.mp3');
  tone2 = loadSound('assets/tone7.mp3');
  tone3 = loadSound('assets/tone6.mp3');
  tone4 = loadSound('assets/tone5.mp3');
  tone5 = loadSound('assets/tone4.mp3');
  tone6 = loadSound('assets/tone3.mp3');
  tone7 = loadSound('assets/tone2.mp3');
  tone8 = loadSound('assets/tone1.mp3');
  console.log("preload tone 2", tone2);

  toneArray = [tone1, tone2, tone3, tone4, tone5, tone6, tone7, tone8];
}

var serial;
var port = 3202;
var socket = io.connect('http://localhost:' + port);
// var toneArray = [tone1,tone2,tone3,tone4,tone5,tone6,tone7, tone8];

socket.on('connect', function() {
  console.log('io connected successfully');
});

socket.on('connect_error', function() {
  console.log('io failed to connect. Is the socket server running? Look at the README for instructions');
});

// Add a listener for an event named "news"
socket.on('news', function(data) {
  console.log('received "news" event with data:', data);
  // send back an event named "my other event" to the socket server
  socket.emit('my other event', {
    my: 'data'
  });
});

socket.on('heart', function(data) { //check
  console.log('received "news" event with data:', data);
  var tide = data.beat;
  console.log('tide data: ', data); //object {beat:"x"}
  console.log('tide', tide)


  var tideTone = map(tide, 0, 100, 0, 7); //sensor data...CAN BE FINE TUNED.
  console.log("play tideTone", tideTone);

  var tideToneInt = parseInt(tideTone); //turning float into int
  console.log("play tideTone", tideToneInt);

  var sound = toneArray[tideToneInt];
  toneArray[tideToneInt].play();


  // console.log("tone2", toneArray[1]);
  // toneArray[1].play();

  // for (i = 0; i < toneArray.length; i++) {
  //   if (toneArray[i].isPlaying()) {
      
  //     break;
  //     //sound.stop();
  //   // console.log("already partying")
  //   } else {
  //     sound.play();
  //   }
  // }

  


//playing = !playing

  // send back an event named "my other event" to the socket server
  socket.emit('my other event', {
    my: 'beats'
  });
});



function serverConnected() {
  println("We are connected!");
}


function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}