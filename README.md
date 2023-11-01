# LSCC Workshop

Resources for a talk and workshop with Gawain Hewitt at LSCC on the 2nd November

https://gawainhewitt.co.uk

https://github.com/gawainhewitt 

We are using Tone.js for sound and P5.js for images today. 

I have tried to keep this repo as simple as possible to keep things playful. 

You can also play with pretty much the same thing online here if you prefer https://editor.p5js.org/gawainhewitt/sketches/hB8lgvcKB 

### Tone.js

https://tonejs.github.io/

This is an excellent library and very well documented. The documentation does assume music and sound engineering knowledge however. Please do ask me if you want anything explained. 

I have accessed the library with a CDN for this session to make this easy. You can see the link for this in the head of the html file. Normally I would install it using NPM.

I've set up the demo like this

Inputs -> synths/sampler -> delay -> gain -> speakers <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;meter

The meter outputs the level at that time https://tonejs.github.io/docs/14.7.77/Meter

The meter is then simply visualised using p5.js. 

Inputs are the buttons, arrow keys and space bar.

I have included a basic sequencer which steps through at `sequencerSpeed` calling the function `repeat()` which then iterates through an array of notes using modulo to give a simple repeating pattern. You can change the speed using `Tone.Transport.bpm.value` https://tonejs.github.io/docs/14.7.77/Transport#bpm

### Midi Note Names

https://newt.phys.unsw.edu.au/jw/notes.html

### P5.js

https://p5js.org/

This is an excellent and fun library for visuals and animation. Designed to help artists use code it is absolutely responsible for getting me started with JavaScript. 

If you want to see some really cool things made with this library check out http://www.generative-gestaltung.de/2/ and you can also play with the code there. 