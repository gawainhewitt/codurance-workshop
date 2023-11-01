// variables for sound elements

let duration = "8n"; // https://tonejs.github.io/docs/14.7.77/type/Time
let sequencerSpeed = "8n";
let synthVolume = -10;
let frequency = 200;
let delayTime = "0.6";
let delayFeedback = 0.6;
const notes = ["F3", "G#3", "C4", "D#4", "G4"];    // array containing our musical notes that we are currently using (tone.js will respond to these as is)
let sequencerNote = 0;

// set up user interface

let volumeSlider = document.getElementById("volume");
let cutoffSlider = document.getElementById("cutoff");

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

// set up Tone.js

const visualisationMeter = new Tone.Meter(); // this gives us the information to make a visualisation
visualisationMeter.normalRange = true; // means the numbers will be between 0 and 1

const gainNode = new Tone.Gain().toDestination(); // create and connect our gain node to the "destination" - i.e speakers / headphones

gainNode.connect(visualisationMeter); // connect our gain node to the visualisation meter

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
    sampler.triggerAttackRelease(notes[i]); // plays a sample
}

function startSequence() {
    Tone.Transport.start(); // starts the transport - this refers to a metaphor of a tape machine in a recording studio
    Tone.Transport.scheduleRepeat(repeat, sequencerSpeed); // calls the function repeat() every sequencerSpeed interval
}

function repeat() {
    synth.triggerAttackRelease(notes[sequencerNote], duration); // plays and releases a sound of a specific duration
    sequencerNote = (sequencerNote + 1) % notes.length;
}

function stopSequence() {
    Tone.Transport.stop(); // stops the transport
    synth.triggerRelease(); // stops a sound - this is because sometimes we have a hanging note

}


// read Qwerty keyboard and play notes from it
// the "debounce" is so it only calls playSynth once on a key press

const keys = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Space"];
let keyDebouncing = [false ,false ,false ,false ,false ];

function handleKeyDown(e) {
    var key = e.code;

    for(let i = 0; i < keys.length; i++){
        if (key === keys[i]) {
            if (keyDebouncing[i] === false) {
                playSynth(i);
                keyDebouncing[i] = true;
            }
        }
    }
}

function handleKeyUp(e) {
var key = e.code;

for(let i = 0; i < keys.length; i++){
    if (key === keys[i]) {
        stopSynth();
        keyDebouncing[i] = false;
    }
}
}



// visualisation using P5.js

const canvasSize = 200;
const visualisationColour = 255; 
const backgroundColour = 0;
const backgroundAlpha = 30;

  function setup() { // this is a P5.js function that sets up the canvas
    createCanvas(canvasSize, canvasSize);
    stroke(visualisationColour);
    noFill();
  }  

  function draw() { // this is a P5.js function that animates at set frame rate
    background(backgroundColour, backgroundAlpha);
    let level = visualisationMeter.getValue();
    circle(canvasSize/2, canvasSize/2, level * (canvasSize * 2))
  }  