let blobPoints = [];
let geometry = [];
let randomx = [];
let randomy = [];
let facx=[];
let facy=[];
let randoffx=[];
let randoffy=[];
let shapecent = [];
let randscalex = [];
let randscaley=[];
let randscalebotx = [];
let randscaleboty = [];
let defrate = 1/300;
let defadj = 1-defrate/2;

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
    let botx = randscalebotx[i];
    let boty = randscaleboty[i];
     
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
      if (frameCount%360==0){
        randscalex[i] = Math.random()*defrate+defadj;
        randscaley[i] = Math.random()*defrate+defadj;
        randscalebotx[i] = Math.random()*defrate+defadj;
        randscaleboty[i] = Math.random()*defrate+defadj;
        if(randscalex[i-1]>1)
        {
          if(randscalex[i]>1)
          {
            randscalex[i]=2-randscalex[i];
          }
        }
        if(randscaley[i-1]>1)
        {
          if(randscaley[i]>1)
          {
            randscaley[i]=2-randscaley[i];
          }
        }
        if(randscalebotx[i-1]>1)
        {
          if(randscalebotx[i]>1)
          {
            randscalebotx[i]=2-randscalebotx[i];
          }
        }
        if(randscaleboty[i-1]>1)
        {
          if(randscaleboty[i]>1)
          {
            randscaleboty[i]=2-randscaleboty[i];
          }
        }
      }
      if (Math.floor(frameCount/360)%2==0 & (pt.x-centerX)>0)
      {
        pt.x = (pt.x-centerX)*scalex+centerX;
        pt.y = (pt.y-centerY)*scaley+centerY;
      }
      else if(Math.floor(frameCount/360)%2==0 & (pt.x-centerX)<0){
        pt.x = (pt.x-centerX)*botx+centerX;
        pt.y = (pt.y-centerY)*boty+centerY;
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
    randomx.push((Math.random()-0.5)*2);
    randomy.push((Math.random()-0.5)*2);
    facx.push(1);
    facy.push(1);
    blobPoints=[];
    randscalex.push(Math.random()*defrate+defadj);
    randscaley.push(Math.random()*defrate+defadj);
    randscalebotx.push(Math.random()*defrate+defadj);
    randscaleboty.push(Math.random()*defrate+defadj);
  }

