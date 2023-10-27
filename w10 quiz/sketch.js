let sound;
let amplitude;
let fft;
let radius;
let number;
let baseAngle;
let angle;
let bgColor; 

function preload() {
    sound = loadSound('audio/sample-visualisation.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    bgColor = color(0, 0, 100); 
    background(bgColor);
    
    strokeWeight(10);
    noFill();
    colorMode(HSB);
    stroke(120, 50, 360);

    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);

    fft = new p5.FFT();

    radius = 200;
    number = 120;

    baseAngle = 0;
    angle = baseAngle;

    frameRate(60);
}

function draw() {
    background(bgColor);
    
    magnitude = radius / 20;
    angle = baseAngle;

    let spectrum = fft.analyze();

    translate(width / 2, height / 2);
    for (let i = 0; i < number + 3; i++) {
        stroke(i * 3, 360, 360);

        let spec = spectrum[i];
        let size = map(spec, 0, 255, 0, 1);

        let level = amplitude.getLevel();

        let x1 = sin(angle) * radius;
        let y1 = cos(angle) * radius;

        let modifier = (1 + size / 2) * (1 + level / 10);

        let x2 = x1 * modifier;
        let y2 = y1 * modifier;

        strokeWeight((level + 1) * 5);
        stroke((i % number) * 3, 360, 360);
        line(x1, y1, x2, y2);
        angle += TWO_PI / number;
    }
}

function mousePressed() {
    if (sound.isPlaying()) {
        sound.stop();
        bgColor = color(255, 0, 0);
    } else {
        sound.play();
        bgColor = color(0, 255, 0); 
    }
    background(bgColor);
}
