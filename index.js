let synthNote = "C3"; // uses note names see https://newt.phys.unsw.edu.au/jw/notes.html
let duration = "8n"; // https://tonejs.github.io/docs/14.7.77/type/Time
let synthVolume = -10;

// set up the synth

const synth = new Tone.MonoSynth({
    oscillator: {
        type: "square"
    },
    volume: synthVolume,
    envelope: {
        attack: 0.1
    }
}).toDestination();

// set up the sampler

const sampler = new Tone.Sampler({
	urls: {
		A1: "sounds/ruthLoop4.flac"
	},
    volume: synthVolume
}).toDestination();

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