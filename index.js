let synthNote = "C3"; // uses note names see https://newt.phys.unsw.edu.au/jw/notes.html
let duration = "8n"; // https://tonejs.github.io/docs/14.7.77/type/Time
let synthVolume = -10;
let frequency = 200;
let delayTime = "0.6";
let delayFeedback = 0.6;
let whichKey = [0,0,0,0,0,0,0,0,0];
const notes = ["F3", "G#3", "C4", "D#4", "G4"];    // array containing our musical notes that we are currently using (tone.js will respond to these as is)


let volumeSlider = document.getElementById("volume");
let cutoffSlider = document.getElementById("cutoff");

document.addEventListener('keydown', handleKeyDown); //add listener for keyboard input
document.addEventListener('keyup', handleKeyUp); //add listener for keyboard input

volumeSlider.oninput = function() {
    synthVolume = this.value/100;
    gainNode.gain.value = synthVolume;
    // synth.volume.value = synthVolume;
    // sampler.volume.value = synthVolume;
}

cutoffSlider.oninput = function() {
    frequency = this.value;
    console.log(frequency);
    synth.filterEnvelope.baseFrequency = frequency;
}

const gainNode = new Tone.Gain().toDestination();

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

function setup() {
    Tone.start(); // strictly speaking you have to invoke Tone.start() before you can make a sound. In practice you can get away without doing this
    alert("sound started!");
}

function playSynth(i) {
    // synth.triggerAttackRelease(synthNote, duration); // plays a sound of a specific duration
    synth.triggerAttack(notes[i]); // plays a sound until you tell it to stop
}

function stopSynth() {
    synth.triggerRelease(); // stops a sound
}

function playSample() {
    sampler.triggerAttackRelease(synthNote);
}

function handleKeyDown(e) {

    var key = e.code;
    console.log("keydown "+key); //debugging
  
    switch(key) {  /// working here! - retriggering keys so remove the play synth and do a for loop on the array to play
      case "ArrowLeft" :
        if(whichKey[0] === 0) {
          playSynth(0);
          whichKey[0] = 1;
          break;
        } else {
          break;
        }
      case "ArrowRight" :
        if(whichKey[1] === 0) {
          playSynth(1);
          whichKey[1] = 1;
          break;
        } else {
          break;
        }
      case "ArrowDown" :
        if(whichKey[2] === 0) {
          playSynth(2);
          whichKey[2] = 1;
          break;
        } else {
          break;
        }
      case "ArrowUp" :
        if(whichKey[3] === 0) {
          playSynth(3);
          whichKey[3] = 1;
          break;
        } else {
          break;
        }
      case "Space" :
        if(whichKey[4] === 0) {
          playSynth(4);
          whichKey[4] = 1;
          break;
        } else {
          break;
        }
    }
  }
  
  function handleKeyUp(e) {

    var key = e.code;
    console.log("keyup "+key); //debugging

    switch(key) {
      case "ArrowLeft" :
        stopSynth();
        whichKey[0] = 0;
        break;
      case "ArrowRight" :
        stopSynth();
        whichKey[1] = 0;
        break;
      case "ArrowDown" :
        stopSynth(2);
        whichKey[2] = 0;
        break;
      case "ArrowUp" :
        stopSynth(3);
        whichKey[3] = 0;
        break;
      case "Space" :
        stopSynth(4);
        whichKey[4] = 0;
        break;
    }
  
  }