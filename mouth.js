//WARNING: VERY LOUD.  TURN DOWN YOUR SPEAKERS BEFORE TESTING

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillators = new Array(8);

document.body.addEventListener("keydown", event => {
  if (event.repeat) {
    return;
  }
  if (event.key >= "1" && event.key <= "8") {
    startPlaying(parseInt(event.key));
  } else if (event.key.match(/[a-z ]/)) {
    playbyte(event.key.charCodeAt(0));
  }
});
document.body.addEventListener("keyup", event => {
  if (event.repeat) {
    return;
  }
  if (event.key >= "1" && event.key <= "8") {
    stopPlaying(parseInt(event.key));
  } else if (event.key.match(/[a-z ]/)) {
    resetAll();
  }
});

function playbyte(b) {
  console.log("[playbyte] " + b);
  for (i = 0; i < 8; i++) {
    if (b & (1 << i)) {
      startPlaying(i + 1);
    }
  }
}

function resetAll() {
  for (i = 1; i <= 8; i++) {
    stopPlaying(i);
  }
}

function startPlaying(key) {
  //console.log("[start] " + key);
  if (oscillators[key - 1]) {
    return;
  }
  var oscillator = audioCtx.createOscillator();

  oscillator.type = "sine";
  oscillator.frequency.value = 901 + 151 * key; // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  oscillators[key - 1] = oscillator;
}

function stopPlaying(key) {
  //console.log("[stop] " + event.key);
  if (oscillators[key - 1] === null || oscillators[key - 1] === undefined) {
    return;
  }
  oscillators[key - 1].stop();
  oscillators[key - 1] = null;
}
