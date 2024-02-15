let blobPoints = [];
let isClosed = false;
let geometry = [];
let randomx = [];
let randomy = [];
let facx=[];
let facy=[];
let oscSpeedX = [];
let oscSpeedY = [];
let oscAmplitudeX = [];
let oscAmplitudeY = [];

function setup() {
  createCanvas(windowWidth-100,windowHeight-50);
  background(0);
  frameRate(60);
  //stroke(255,255,255,0);
}


function draw() {
  background(0);
  // Draw all previous shapes
  for (let i = 0; i < geometry.length; i++) {
    let shape = geometry[i];
    let varx = randomx[i]; // Use the pre-stored random value for this shape
    let vary = randomy[i]; 
     
  /*
    scalex[i] = Math.random()*1.5
    
    scaley[i] = Math.random()*1.5
    */
    for (let pt of shape){
      if (pt.x+varx>windowWidth-100 || pt.x+varx<0){
        facx[i]=facx[i]*(-1);
        break;
      }
    }
    for (let pt of shape){
      if (pt.y+vary>windowHeight-50 || pt.y+vary<0){
        facy[i]=facy[i]*(-1);
        break;
      }
    }
    for (let pt of shape){
      let oscX = Math.sin(frameCount * oscSpeedX[i]) * oscAmplitudeX[i];
      let oscY = Math.cos(frameCount * oscSpeedY[i]) * oscAmplitudeY[i];
      pt.x+=(varx*facx[i]);
      pt.y+=(vary*facy[i]);
    }
    beginShape();
    for (let pt of shape) {
      // Apply oscillation to the vertex position
      curveVertex(pt.x, pt.y);
    }
    endShape(CLOSE); // Assuming all shapes are closed for simplicity // Assuming all shapes are closed for simplicity
  }

  // Draw the current blob points
  beginShape();
  for (let i = 0; i < blobPoints.length; i++) {
    curveVertex(blobPoints[i].x, blobPoints[i].y);
  }
  endShape()
}

function mousePressed(){
    blobPoints = []; // Reset points for a new shape
    blobPoints.push(createVector(mouseX, mouseY)); // Add the first point
}

function mouseDragged() {
    blobPoints.push(createVector(mouseX, mouseY));
}

function mouseReleased() {
  // Save the current shape if it's closed, then reset for a new shape
  //if (distance((blobPoints[0].x,blobPoints[0].y),(blobPoints[blobPoints.length - 1].x,blobPoints[blobPoints.length - 1].y)) < 15) 
    blobPoints.push(createVector(blobPoints[0].x,blobPoints[0].y))
    geometry.push([...blobPoints]); // Copy the current blobPoints to geometry
    randomx.push((Math.random()-0.5)*Math.random()*4);
    randomy.push((Math.random()-0.5)*Math.random()*4);
    facx.push(1);
    facy.push(1);
    oscSpeedX.push(random(0.05, 0.1)); // Random speed between 0.05 and 0.1
    oscSpeedY.push(random(0.05, 0.1));
    oscAmplitudeX.push(random(5, 15)); // Random amplitude between 5 and 15
    oscAmplitudeY.push(random(5, 15));
  }

  function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

