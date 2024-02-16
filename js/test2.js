let blobPoints = [];
let geometry = [];
let randomx = [];
let randomy = [];
let facx=[];
let facy=[];
let oscSpeedX = [];
let oscSpeedY = [];
let oscAmplitudeX = [];
let oscAmplitudeY = [];
let randoffx=[];
let randoffy=[];
let shapecent = [];
let randscalex = [];
let randscaley=[];

function setup() {
  createCanvas(windowWidth-100,windowHeight-50);
  background(0);
  frameRate(60);
  stroke(255,255,255,0);
}

function draw() {
  background(0);
  shapecent=[];
  // Draw all previous shapes
  for (let i = 0; i < geometry.length; i++) {
    let shape = geometry[i];
    let varx = randomx[i]; // Use the pre-stored random value for this shape
    let vary = randomy[i]; 
    let sumX = 0, sumY = 0;
    let scalex = randscalex[i];
    let scaley = randscaley[i];
     
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
      pt.x+=(varx*facx[i]);
      pt.y+=(vary*facy[i]);
      sumX += pt.x;
      sumY += pt.y;
    }
    let centerX = sumX / shape.length;
    let centerY = sumY / shape.length;

    beginShape();
    for (let pt of shape) {
      // Apply oscillation to the vertex position
      if (frameCount%720==0){
        randscalex[i] = Math.random()/200+0.9975
        randscaley[i] = Math.random()/200+0.9975
      }
      if (Math.floor(frameCount/360)%2==0)
      {
        pt.x = (pt.x-centerX)*scalex+centerX;
        pt.y = (pt.y-centerY)*scaley+centerY;
      }
      else
      {
        pt.x = (pt.x-centerX)*(2-scalex)+centerX;
        pt.y = (pt.y-centerY)*(2-scaley)+centerY;
      }
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
    randomx.push((Math.random()-0.5)*4);
    randomy.push((Math.random()-0.5)*4);
    facx.push(1);
    facy.push(1);
    blobPoints=[];
    randscalex.push(Math.random()/200+0.9975);
    randscaley.push(Math.random()/200+0.9975)
  }

