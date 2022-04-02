var mySound;

let playStopButton;
let speechRecButton;
let sliderVolume;
let sliderRate;
let sliderPan;

var analyzer;
var movement;

var backgroundColour;
var shape;

var shape1Colour;
var shape1Size;
var shape1Opacity;
var shape1Rotation;
var shape1BorderColour;

var shape2Colour;
var shape2Size;
var shape2Opacity;
var shape2Rotation;
var shape2BorderColour;

var shape3Colour;
var shape3Size;
var shape3Opacity;
var shape3Rotation;
var shape3BorderColour;

var shape4Colour;
var shape4Size;
var shape4Opacity;
var shape4Rotation;
var shape4BorderColour;

var shape5Colour;
var shape5Size;
var shape5Opacity;
var shape5Rotation;
var shape5BorderColour;

var shape6Colour;
var shape6Size;
var shape6Opacity;
var shape6Rotation;
var shape6BorderColour;

var speechRec = new p5.SpeechRec('en-US', parseResult);
speechRec.continuous = true;
speechRec.interimResults = true;

function preload() {
    soundFormats('mp3', 'wav');
    mySound = loadSound('./sounds/Kalte_Ohren_(_Remix_).mp3')
}

function setup() {
    createCanvas(700, 500);
    background(180);
    backgroundColour = [180,180,180];
    speechRec.start();
    angleMode(DEGREES);
    rectMode(CENTER);
    
    shape="circle";
    shape1Size = 0;
    shape2Size = 0;
    shape3Size = 0;
    shape4Size = 0;
    shape5Size = 0;
    shape6Size = 0;
    
    playStopButton = createButton('play');
    playStopButton.position(300, 20);
    playStopButton.mousePressed(playStopSound);
    
    if (typeof Meyda === "undefined") {
        console.log("Meyda could not be found");
    } else {
        analyzer = Meyda.createMeydaAnalyzer({
           "audioContext": getAudioContext(),
            "source": mySound,
            "bufferSize": 512, //how many times to analyze the sound per second => 44100/512 so its 86 times per second
            "featureExtractors": ["zcr", "spectralRolloff", "energy", "spectralCentroid", "spectralFlatness", "spectralSpread", "spectralKurtosis"],
            "callback": features => {
                shape1Size = features.spectralRolloff * 0.01;
                shape2Size = features.spectralCentroid * 2;
                shape3Size = features.spectralFlatness * 1000;
                shape4Size = features.energy * 10; 
                shape5Size = features.spectralSpread * 5;
                shape6Size = features.spectralKurtosis * 1;
                
                movement = features.zcr;
            }
        });
    }
}

function parseResult()
{
    var mostRecentWord = speechRec.resultString.split(' ').pop().toLowerCase();
    if(mostRecentWord.indexOf("black")!==-1) { 
        backgroundColour=[0,0,0];
        shape1Colour = [240, 240, 240];
        shape2Colour = [240, 240, 240];
        shape3Colour = [240, 240, 240];
        shape4Colour = [240, 240, 240];
        shape5Colour = [240, 240, 240];
        shape6Colour = [240, 240, 240];
    }
    if(mostRecentWord.indexOf("white")!==-1) { 
        backgroundColour=[255,255,255];
        shape1Colour = [10, 10, 10];
        shape2Colour = [10, 10, 10];
        shape3Colour = [10, 10, 10];
        shape4Colour = [10, 10, 10];
        shape5Colour = [10, 10, 10];
        shape6Colour = [10, 10, 10];
    }
    if(mostRecentWord.indexOf("red")!==-1) { 
        backgroundColour=[255,0,0];
        shape1Colour = [10, 240, 240];
        shape2Colour = [10, 240, 240];
        shape3Colour = [10, 240, 240];
        shape4Colour = [10, 240, 240];
        shape5Colour = [10, 240, 240];
        shape6Colour = [10, 240, 240];
    }
    if(mostRecentWord.indexOf("green")!==-1) { 
        backgroundColour=[0,255,0];
        shape1Colour = [240, 10, 240];
        shape2Colour = [240, 10, 240];
        shape3Colour = [240, 10, 240];
        shape4Colour = [240, 10, 240];
        shape5Colour = [240, 10, 240];
        shape6Colour = [240, 10, 240];
    }
    if(mostRecentWord.indexOf("blue")!==-1) { 
        backgroundColour=[0,0,255];
        shape1Colour = [240, 240, 10];
        shape2Colour = [240, 240, 10];
        shape3Colour = [240, 240, 10];
        shape4Colour = [240, 240, 10];
        shape5Colour = [240, 240, 10];
        shape6Colour = [240, 240, 10];
    }
    if(mostRecentWord.indexOf("square")!==-1) { 
        shape = "square"
    }
    if(mostRecentWord.indexOf("triangle")!==-1) { 
        shape = "triangle"
    }
    if(mostRecentWord.indexOf("circle")!==-1) { 
        shape = "circle"
    }
    if(mostRecentWord.indexOf("pentagon")!==-1) { 
        shape = "pentagon"
    }
    console.log(mostRecentWord);
}

function playStopSound() {
    if (mySound.isPlaying()){
        mySound.pause();
        analyzer.stop();
        playStopButton.html('play');
    } else {
        mySound.play();
        analyzer.start();
        playStopButton.html('stop');
    }
} 

function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);      
    }
    endShape(CLOSE);
}

function spectralRolloffShape(shape) {
    push();
    translate(100, 100);
    rotate(frameCount);
    translate(movement, 0);
    fill(shape1Colour, 30, 255);
    if(shape == "square") square(0, 0, shape1Size);
    if(shape == "circle") circle(0, 0, shape1Size);
    if(shape == "triangle") triangle(0, 0, shape1Size/2, -shape1Size, shape1Size, 0);
    if(shape == "pentagon") polygon(0, 0, shape1Size, 5);
    pop();
}

function perceptualCentroidShape(shape) {
    push();
    translate(100, 300);
    rotate(-frameCount);
    translate(movement, 0);
    fill(shape1Colour, 30, 255);
    if(shape == "square") square(0, 0, shape2Size); 
    if(shape == "circle") circle(0, 0, shape2Size);
    if(shape == "triangle") triangle(0, 0, shape2Size/2, -shape2Size, shape2Size, 0);
    if(shape == "pentagon") polygon(0, 0, shape2Size, 5);
    pop();
}

function spectralSpreadShape(shape) {
    push();
    translate(600, 100);
    rotate(-frameCount-180);
    translate(movement, 0);
    fill(shape1Colour, 30, 255);
    if(shape == "square") square(0, 0, shape5Size); 
    if(shape == "circle") circle(0, 0, shape5Size);
    if(shape == "triangle") triangle(0, 0, shape5Size/2, -shape5Size, shape5Size, 0);
    if(shape == "pentagon") polygon(0, 0, shape5Size, 5);
    pop();
}

function spectralKurtosisShape(shape) {
    push();
    translate(600, 300);
    rotate(frameCount-180);
    translate(movement, 0);
    fill(shape1Colour, 30, 255);
    if(shape == "square") square(0, 0, shape6Size); 
    if(shape == "circle") circle(0, 0, shape6Size);
    if(shape == "triangle") triangle(0, 0, shape6Size/2, -shape6Size, shape6Size, 0);
    if(shape == "pentagon") polygon(0, 0, shape6Size, 5);
    pop();
}         

function drawShape(shape, frameCount) {
    if(shape=="square"){
        spectralRolloffShape("square");
        perceptualCentroidShape("square");

        fill(shape3Colour, 30, 255);
        square(350, 100, shape3Size);

        fill(shape4Colour, 30, 255);
        square(350, 250, shape4Size);
        
        spectralSpreadShape("square");
        spectralKurtosisShape("square");
    }
    if(shape=="circle"){
        spectralRolloffShape("circle");
        perceptualCentroidShape("circle");

        // spectralFlatness
        fill(shape3Colour, 30, 255);
        circle(350, 100, shape3Size);
        
        // energy
        fill(shape4Colour, 30, 255);
        circle(350, 250, shape4Size);

        spectralSpreadShape("circle");
        spectralKurtosisShape("circle");
    }
    if(shape=="triangle"){
        spectralRolloffShape("triangle");
        perceptualCentroidShape("triangle");

        fill(shape3Colour, 30, 255);
        triangle(350, 100, 350 + shape3Size/2, 100-shape3Size, 350+shape3Size, 100);
        
        fill(shape4Colour, 30, 255);
        triangle(350, 250, 350 + shape4Size/2, 250-shape4Size, 350+shape4Size, 250);

        spectralSpreadShape("triangle");
        spectralKurtosisShape("triangle");
    }
    if(shape=="pentagon"){
        polygon(350,100,100,5);
        spectralRolloffShape("pentagon");
        perceptualCentroidShape("pentagon");
        fill(shape3Colour, 30, 255);
        polygon(350, 100, 100, 5);
        polygon(0, 0, 200, 7);
        
        fill(shape3Colour, 30, 255);
        polygon(350, 100, shape3Size * 10, 5);

        fill(shape4Colour, 30, 255);
        polygon(350, 250, shape4Size * 10, 5);
        
        spectralSpreadShape("pentagon");
        spectralKurtosisShape("pentagon");
    }
}

function draw() {
    background(backgroundColour[0],backgroundColour[1], backgroundColour[2]);
    fill(0);
    drawShape(shape, frameCount);
}