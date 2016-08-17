// This script loads after socket.io.js, so the "io" global
// variable below will already be present

var range;
//8 distinct ranges or just incrementing by +5?
var sensorData;

var tone2;
var tone5;
var tone6;
var tone7;
var tone8;

var toneArray = [];


function preload() {
  //tone1 = loadSound('assets/tone1.mp3');
  tone2 = loadSound('assets/tone2.mp3');
  // tone3 = loadSound('assets/tone3.mp3');
  // tone4 = loadSound('assets/tone4.mp3');
  tone5 = loadSound('assets/tone5.mp3');
  tone6 = loadSound('assets/tone6.mp3');
  tone7 = loadSound('assets/tone7.mp3');
  tone8 = loadSound('assets/tone8.mp3');
  toneArray = [tone2, tone5, tone6, tone7, tone8];
}

var serial;
var port = 3201;
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

socket.on('heart', function(data) {
  console.log('received "news" event with data:', data);
  var tide = data.beat;
  console.log('tide data: ', data);

  var tideTone = map(tide, 0, 200, 0, toneArray.length-1); //CAN BE FINE TUNED.
  console.log("play tideTone", tideTone);

  var tideToneInt = parseInt(tideTone);
  console.log("play tideTone", tideToneInt);

  var sound = toneArray[tideToneInt];
  console.log("tone2", toneArray[1]);
  toneArray[1].play();
  
  // if (playing = !){
  //   playing
  // }
  
  //   if (song.isPlaying()) {
  //   song.stop();
  // } else {
  //   song.play();
  // }
  //console.log("play tideTone", tideTone);

  // send back an event named "my other event" to the socket server
  socket.emit('my other event', {
    my: 'beats'
  });
});



function serverConnected() {
  println("We are connected!");
}

// Got the list of ports
// function gotList(thelist) {
//   // theList is an array of their names
//   for (var i = 0; i < thelist.length; i++) {
//     // Display in the console
//     println(i + " " + thelist[i]);
//   }
// }

// // Connected to our serial device
// function gotOpen() {
//   println("Serial Port is open!");
// }

// // Ut oh, here is an error, let's log it
// function gotError(theerror) {
//   println(theerror);
// }

// // There is data available to work with from the serial port
// function gotData() {
//   var currentString = serial.readStringUntil("\r\n");
//   console.log(currentString);
// }


function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}