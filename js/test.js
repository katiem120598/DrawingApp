let blobPoints = [];
let isClosed = false;
let geometry = [];
let randomx = [];
let randomy = [];

function setup() {
  createCanvas(windowWidth-100,windowHeight-50);
  background(0);
  frameRate(60);
}


function draw() {
  background(0);
  // Draw all previous shapes
  for (let i = 0; i < geometry.length; i++) {
    let shape = geometry[i];
    let varx = randomx[i]; // Use the pre-stored random value for this shape
    let vary = randomy[i]; 
    let facx = 1;
    let facy = 1;
    for (let pt of shape){
      if (pt.x+varx>windowWidth-100){
        facx*=(-1);
        break;
      }
    }
    for (let pt of shape){
      if (pt.y+varx>windowHeight-50){
        facy*=(-1);
        break;
      }
    }
    for (let pt of shape){
      pt.x+=(varx*facx);
      pt.y+=(vary*facy);
    }

    beginShape();
    for (let pt of shape) {
      curveVertex(pt.x, pt.y);
    }
    endShape(CLOSE); // Assuming all shapes are closed for simplicity
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
    randomx.push((Math.random()-0.5)*Math.random()*4)
    randomy.push((Math.random()-0.5)*Math.random()*4)
  }

  function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

