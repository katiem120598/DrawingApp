let blobPoints = [];
let isClosed = false;
let geometry = [];

function setup() {
  createCanvas(400, 400);
  background(220);
}


function draw() {
  background(220);

  // Draw all previous shapes
  for (let shape of geometry) {
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
  if (distance((blobPoints[0].x,blobPoints[0].y),(blobPoints[blobPoints.length - 1].x,blobPoints[blobPoints.length - 1].y)) < 15) 
  {
    blobPoints.push(createVector(blobPoints[0].x,blobPoints[0].y))
  }
    geometry.push([...blobPoints]); // Copy the current blobPoints to geometry
  }

  function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

