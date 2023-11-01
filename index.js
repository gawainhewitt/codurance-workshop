let duration = "8n"; // https://tonejs.github.io/docs/14.7.77/type/Time
let sequencerSpeed = "8n";
let synthVolume = -10;
let frequency = 200;
let delayTime = "0.6";
let delayFeedback = 0.6;
const notes = ["F3", "G#3", "C4", "D#4", "G4"];    // array containing our musical notes that we are currently using (tone.js will respond to these as is)
let sequencerNote = 0;



let volumeSlider = document.getElementById("volume");
let cutoffSlider = document.getElementById("cutoff");

const visualisationMeter = new Tone.Meter();
visualisationMeter.normalRange = true;

document.addEventListener('keydown', handleKeyDown); //add listener for keyboard input
document.addEventListener('keyup', handleKeyUp); //add listener for keyboard input

volumeSlider.oninput = function() {
    synthVolume = this.value/100;
    gainNode.gain.value = synthVolume;
}

cutoffSlider.oninput = function() {
    frequency = this.value;
    synth.filterEnvelope.baseFrequency = frequency;
}

const gainNode = new Tone.Gain().toDestination();

gainNode.connect(visualisationMeter);

// set up the delay

const feedbackDelay = new Tone.FeedbackDelay(delayTime, delayFeedback).connect(gainNode);


// set up the synth

const synth = new Tone.MonoSynth({
    oscillator: {
        type: "square"
    },
    volume: synthVolume,
    envelope: {
        attack: 3,
        attackCurve: "linear",
        decay: 0,
        release: 2,
        releaseCurve: "linear",
        sustain: 0.4
      },
      filter: {
        Q: 0,
        rolloff: -12,
        type: "lowpass",
        frequency: 0
      },
      filterEnvelope : {
        attack : 0.01,
        decay : 0.01,
        sustain : 0.01,
        release : 0.01,
        baseFrequency : 200,
        octaves : 2,
        exponent : 2
      } 
}).connect(feedbackDelay)

// set up the sampler

const sampler = new Tone.Sampler({
	urls: {
		A1: "sounds/ruthLoop4.flac"
	},
    volume: synthVolume
}).connect(feedbackDelay);

function setupTone() {
    Tone.start(); // strictly speaking you have to invoke Tone.start() before you can make a sound. In practice you can get away without doing this
}

function playSynth(i = 0) {
    synth.triggerAttack(notes[i]); // plays a sound 
}

function stopSynth() {
    synth.triggerRelease(); // stops a sound
}

function playSample(i = 0) {
    sampler.triggerAttackRelease(notes[i]);
}

function startSequence() {
    Tone.Transport.start();
    Tone.Transport.scheduleRepeat(repeat, sequencerSpeed);
}

function repeat() {
    synth.triggerAttackRelease(notes[sequencerNote], duration); // plays and releases a sound of a specific duration
    sequencerNote = (sequencerNote + 1) % notes.length;
}

function stopSequence() {
    Tone.Transport.stop();
    synth.triggerRelease(); // stops a sound

}


// read Qwerty keyboard and play notes from it

let keyDebouncing = [0,0,0,0,0];

function handleKeyDown(e) {

    var key = e.code;
  
    switch(key) {  
      case "ArrowLeft" :
        if(keyDebouncing[0] === 0) {
          playSynth(0);
          keyDebouncing[0] = 1;
          break;
        } else {
          break;
        }
      case "ArrowRight" :
        if(keyDebouncing[1] === 0) {
          playSynth(1);
          keyDebouncing[1] = 1;
          break;
        } else {
          break;
        }
      case "ArrowDown" :
        if(keyDebouncing[2] === 0) {
          playSynth(2);
          keyDebouncing[2] = 1;
          break;
        } else {
          break;
        }
      case "ArrowUp" :
        if(keyDebouncing[3] === 0) {
          playSynth(3);
          keyDebouncing[3] = 1;
          break;
        } else {
          break;
        }
      case "Space" :
        if(keyDebouncing[4] === 0) {
          playSynth(4);
          keyDebouncing[4] = 1;
          break;
        } else {
          break;
        }
    }
  }
  
  function handleKeyUp(e) {

    var key = e.code;

    switch(key) {
      case "ArrowLeft" :
        stopSynth();
        keyDebouncing[0] = 0;
        break;
      case "ArrowRight" :
        stopSynth();
        keyDebouncing[1] = 0;
        break;
      case "ArrowDown" :
        stopSynth();
        keyDebouncing[2] = 0;
        break;
      case "ArrowUp" :
        stopSynth();
        keyDebouncing[3] = 0;
        break;
      case "Space" :
        stopSynth();
        keyDebouncing[4] = 0;
        break;
    }
  }



// visualisation using P5.js

const canvasSize = 200;
const visualisationColour = 255; 
const backgroundColour = 0;
const backgroundAlpha = 30;

  function setup() {
    createCanvas(canvasSize, canvasSize);
    stroke(visualisationColour);
    noFill();
  }  

  function draw() {
    background(backgroundColour, backgroundAlpha);

    let level = visualisationMeter.getValue();

    circle(canvasSize/2, canvasSize/2, level * (canvasSize * 2))
  }  