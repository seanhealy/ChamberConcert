// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// var analyser = audioCtx.createAnalyser();

// if (navigator.mediaDevices.getUserMedia) {
//   console.log("getUserMedia supported.");
//   var constraints = { audio: true };
//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then(function(stream) {
//       source = audioCtx.createMediaStreamSource(stream);
//       source.connect(analyser);

//       draw();
//     })
//     .catch(function(err) {
//       console.log("The following gUM error occured: " + err);
//     });
// } else {
//   console.log("getUserMedia not supported on your browser!");
// }

// // analyser.fftSize = 2048;
// analyser.fftSize = 32;
// var bufferLength = analyser.frequencyBinCount;
// var dataArray = new Uint8Array(bufferLength);
// analyser.getByteTimeDomainData(dataArray);

// // Get a canvas defined with ID "oscilloscope"
// var canvas = document.getElementById("oscilloscope");
// var canvasCtx = canvas.getContext("2d");

// const WIDTH = canvas.clientWidth;
// const HEIGHT = canvas.clientHeight;

// // draw an oscilloscope of the current audio source

// function draw() {
//   requestAnimationFrame(draw);

//   // analyser.getByteTimeDomainData(dataArray);
//   // console.log(dataArray[0]);

//   // canvasCtx.fillStyle = "rgb(200, 200, 200)";
//   // canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

//   // canvasCtx.lineWidth = 2;
//   // canvasCtx.strokeStyle = "rgb(0, 0, 0)";

//   // canvasCtx.beginPath();

//   // var sliceWidth = (canvas.width * 1.0) / bufferLength;
//   // var x = 0;

//   // for (var i = 0; i < bufferLength; i++) {
//   //   var v = dataArray[i] / 128.0;
//   //   var y = (v * canvas.height) / 2;

//   //   if (i === 0) {
//   //     canvasCtx.moveTo(x, y);
//   //   } else {
//   //     canvasCtx.lineTo(x, y);
//   //   }

//   //   x += sliceWidth;

//   analyser.getByteFrequencyData(dataArray);

//   canvasCtx.fillStyle = "rgb(0, 0, 0)";
//   canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

//   var barWidth = (WIDTH / bufferLength) * 0.9;
//   var barHeight;
//   var x = 0;

//   // console.log(dataArray[0]);

//   for (var i = 0; i < bufferLength; i++) {
//     barHeight = dataArray[i];

//     canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
//     canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

//     x += barWidth + 1;
//   }
// }

// draw();

//WARNING: VERY LOUD.  TURN DOWN YOUR SPEAKERS BEFORE TESTING

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillators = new Array(8);

document.body.addEventListener("keydown", event => {
  if (event.key >= "1" && event.key <= "8" && !event.repeat) {
    startPlaying(parseInt(event.key));
  }
});
document.body.addEventListener("keyup", event => {
  if (event.key >= "1" && event.key <= "8" && !event.repeat) {
    stopPlaying(parseInt(event.key));
  }
});

function startPlaying(key) {
  console.log("[start] " + key);
  var oscillator = audioCtx.createOscillator();

  oscillator.type = "sine";
  oscillator.frequency.value = 900 + (50 * key); // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  oscillators[key-1] = oscillator;
}

function stopPlaying(key) {
  console.log("[stop] " + event.key);
  oscillators[key-1].stop();
  oscillators[key-1] = null;
}
