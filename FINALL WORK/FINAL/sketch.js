let num = 200; // Number of circles
let vecLocation = []; // Vectors for circle centers' locations
let vecVelocity = []; // Vectors for circle velocities

let R = [];
let G = [];
let B = [];
let t;
let mountainHeights = [];
let c1, c2;
let noiseDetailVal = 1; 
var a = 0.0, x, y, n, step = 3;


function setup() {
  createCanvas(900, 630);
  background(22, 31, 118);
  frameRate(60);
  for (let i = 0; i < num; i++) {
    vecLocation[i] = createVector(random(0, width), random(height / 2, height));
    vecVelocity[i] = createVector(20, 1);
    // Initial color set to orange
    R[i] = 255;
    G[i] = 165;
    B[i] = 0;
  }
  init();
  noStroke();


}


function draw() {
  
  generateSkyCircles();
  river();
  shade();
  // mountain();
  deepMountain();
  castle();


  // Sky gradient with evolving clouds
  for (y = 0; y < height / 2; y += step) {
    let interpColor = getColorForHeight(y);
    for (x = 0; x < width; x += step) {
      n = noise(x / 100., y / 25., t);
      if (n > 0.99) {
        fill('#c96902');
      } else {
        fill(interpColor.levels[0], interpColor.levels[1], interpColor.levels[2], n * map(y, 0, height / 2, 255, 50)); // 调整了透明度范围
      }
      rect(x, y, step, step);
    }
  }
  a += 0.1;

}

// Function for generating circular clouds in the sky
function generateSkyCircles() {
  let clouds = 800; // Generate 800 clouds
  for (let i = 0; i < clouds; i++) {
    // Find a random position for each cloud based on Perlin noise
    let x = -300 + noise(i * 0.1 + frameCount * 0.001) * 1500;
    let y = noise(i * 0.1 + 100 + frameCount * 0.001) * 350; 
    let cloudSize = noise(i * 0.1 + 200 + frameCount * 0.01) * 70; // Size based on noise value
    // Draw the cloud
    fill(255, 255, 255, 60); // White with semi-transparency
    ellipse(x, y, cloudSize, cloudSize / 3); // Clouds are elliptical
  }
}


function castle() {
  //castle bottom
  fill(92, 61, 43); //if change or delete this line, the color will change with the refresh.
  triangle(40, 320, 80, 320, 80, 260);
  triangle(180, 300, 180, 320, 200, 320);
  triangle(350, 320, 200, 220, 220, 320);
  //castle middle
  rect(100, 200, 140, 100);
  rect(80, 220, 160, 100);
  triangle(80, 220, 100, 220, 100, 200);
  triangle(160, 200, 240, 200, 200, 140);
  rect(100, 160, 60, 40);
  quad(110, 130, 120, 140, 120, 160, 110, 160);
  rect(120, 80, 40, 80);
  triangle(140, 20, 160, 80, 120, 80);

}


function river() {
  for (let i = 0; i < num; i++) {
    fill(R[i], G[i], B[i]);
    vecLocation[i].add(vecVelocity[i]); // Update the coordinates of the circle
    ellipse(vecLocation[i].x, vecLocation[i].y, 30, 2); // Draw a circle at the specified position

    // Check for collision with the left or right boundaries
    if (vecLocation[i].x < 0 || vecLocation[i].x > width) {
      vecVelocity[i].x *= -1; // Reverse the velocity in the X direction // Insert new color transformation logic here
      if (vecLocation[i].x < 0) {
        if (
          abs(vecLocation[i].y) < height / 2 + height / 2 / 4
        ) {
          // light yellow
          R[i] = 224;
          G[i] = 210;
          B[i] = 201;
        } else if (
          abs(vecLocation[i].y) < height / 2 + height / 2 * 2 / 4
        ) {
          // Fuel yellow
          R[i] = 234;
          G[i] = 170;
          B[i] = 48;
        } else if (
          abs(vecLocation[i].y) < height / 2 + height / 2 * 3 / 4
        ) {
          R[i] = 173;
          G[i] = 99;
          B[i] = 17;
        } else {
          // Dark blue
          R[i] = 86;
          G[i] = 107;
          B[i] = 155;
        }
      } else {
        if (
          abs(vecLocation[i].y) < height / 2 + height / 2 / 4
        ) {
          // russet
          R[i] = 177;
          G[i] = 121;
          B[i] = 64;
        } else if (
          abs(vecLocation[i].y) < height / 2 + height / 2 * 2 / 4
        ) {
          // Cadet blue
          R[i] = 83;
          G[i] = 106;
          B[i] = 155;
        } else if (
          abs(vecLocation[i].y) < height / 2 + height / 2 * 3 / 4
        ) {
          // Lower volume orange-red
          R[i] = 225;
          G[i] = 82;
          B[i] = 47;
        } else {
          // Brighter purple on the bottom
          R[i] = 99;
          G[i] = 44;
          B[i] = 159;
        }
      }
    }

    // Check for collision with the top or bottom boundaries
    if (vecLocation[i].y < 0 || vecLocation[i].y > height) {
      vecVelocity[i].y *= -1; // Reverse the velocity in the Y direction // Choose color based on condition
      if (vecLocation[i].y < 0) {
        // Some color, such as top brown-red
        R[i] = 182;
        G[i] = 75;
        B[i] = 26;
      } else {
        // Another color, such as bottom mist blue
        R[i] = 130;
        G[i] = 159;
        B[i] = 196;
      }
    }
  }
}



function getColorForHeight(y) {
  let h = height / 2;
  if (y < h * (1 / 8)) {
    return lerpColor(color('#0a21f0'), color('#0a66f0'), y / (h * (1 / 8)));
  } else if (y < h * (2 / 8)) {
    return lerpColor(color('#0a66f0'), color('#0aaff0'), (y - h * (1 / 8)) / (h * (1 / 8)));
  } else if (y < h * (3 / 8)) {
    return lerpColor(color('#0aaff0'), color('#f0cd0a'), (y - h * (2 / 8)) / (h * (1 / 8)));
  } else if (y < h * (4 / 8)) {
    return lerpColor(color('#f0cd0a'), color('#f0970a'), (y - h * (3 / 8)) / (h * (1 / 8)));
  } else if (y < h * (5 / 8)) {
    return lerpColor(color('#f0970a'), color('#f0660a'), (y - h * (4 / 8)) / (h * (1 / 8)));
  } else if (y < h * (6 / 8)) {
    return lerpColor(color('#f0660a'), color('#d44b02'), (y - h * (5 / 8)) / (h * (1 / 8)));
  } else if (y < h * (7 / 8)) {
    return lerpColor(color('#d44b02'), color('#d43602'), (y - h * (6 / 8)) / (h * (1 / 8)));
  } else {
    return lerpColor(color('#d43602'), color('#d41e02'), (y - h * (7 / 8)) / (h * (1 / 8)));
  }
}






function init() {
  t = 0;
  noiseSeed(int(random(5)));
  for (let x = 0; x < width; x++) {
    let n = noise(t);
    t += 0.01;
    mountainHeights[x] = n * 100;
  }
  c1 = color(0);
  c2 = color(0, 102, int(random(100, 255)));
}








// function mountain() {
//   // push();
//   // stroke(105, 105, 105, random(0, 50) / 3);
//   // strokeWeight(10);
//   // let rand = (0.1, 0.3)
//   // for (let i = width; i > 0; i--) {
//   //   line(width / 3 + i, height / 2, width / 2 + i, height / 2 - (mountainHeights[i] * rand));
//   // }
//   // pop();
// }




function deepMountain() {
  push();
  // let rand +=
  stroke(92, 61, 43, random(100, 150) / 3);
  strokeWeight(10);
  for (let x = width; x > 0; x--) {
    // mountainHeights[x]+=random(-1,1)
    line(width / 2 - x, height / 2, width / 3 - x, height / 2 - (mountainHeights[x]*2*noise(x*0.01+frameCount*0.01)));
  }
  pop();
}




function shade() {
  let lenth = random(20, 80);
  push();
  for (t = 0; t < 400; t += 2) {
    let s = t / 12 + lenth / 3 + random(t / 10, t / 5);
    stroke(97, 66, 54, t / 40 + random(150, 200) / 3);
    strokeWeight(1 + t / 60);
    line(180 - s, t + height / 2, 100 + s, t + height / 2);
  }
  pop()
}
