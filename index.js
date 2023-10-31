let synthNote = "C3"; // uses note names see https://newt.phys.unsw.edu.au/jw/notes.html
let duration = "8n"; // https://tonejs.github.io/docs/14.7.77/type/Time
let synthVolume = -10;
let frequency = 200;
let delayTime = "0.6";
let delayFeedback = 0.6;

let volumeSlider = document.getElementById("volume");
let cutoffSlider = document.getElementById("cutoff");

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

function playSynth() {
    // synth.triggerAttackRelease(synthNote, duration); // plays a sound of a specific duration
    synth.triggerAttack(synthNote); // plays a sound until you tell it to stop
}

function stopSynth() {
    synth.triggerRelease(); // stops a sound
}

function playSample() {
    sampler.triggerAttackRelease(synthNote);
}