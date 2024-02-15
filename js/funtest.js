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
  if (isClosed) {
    endShape(CLOSE); // Closes the shape by drawing a line from the last point to the first
  } else {
    endShape();
  }
}


function mouseDragged() {
  if (!isClosed) { // Only add points if the shape is not closed
    const here = {
        x: mouseX,
        y: mouseY
      }
      blobPoints.push(here)
      blobPoints.push(here)
    blobPoints.push(createVector(mouseX, mouseY));
  }
}

function mouseReleased() {
  // Save the current shape if it's closed, then reset for a new shape
  if (isClosed) {
    blobPoints.push(createVector(mouseX,mouseY))
    blobPoints.push(createVector(mouseX,mouseY))
    geometry.push([...blobPoints]); // Copy the current blobPoints to geometry
    blobPoints = []; // Reset blobPoints for the next shape
    isClosed = false; // Reset isClosed for the next shape
  }
}