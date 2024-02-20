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
let defrate = 1/150;
let defadj = 1-defrate/2+0.00010;
let randtrans = [];
let facxprev=[];
let facyprev=[];
let facxprev1=[];
let facyprev1=[];
var dimx;
var dimy;
let bgval = 0;
let shapefill = [];

document.addEventListener('DOMContentLoaded', function () {
  const clearButton = document.getElementById('clear');

  clearButton.addEventListener('click', function(event) {
      // Clear the shapes from the geometry array and other related arrays
      geometry.length = 0;
      randomx.length = 0;
      randomy.length = 0;
      facx.length = 0;
      facy.length = 0;
      randscalex.length = 0;
      randscaley.length = 0;
      randscalebotx.length = 0;
      randscaleboty.length = 0;
      randtrans.length = 0;
      shapefill.length = 0;
      // Any other arrays you wish to clear...

      console.log('Shapes cleared!');

      // Redraw or update the canvas to reflect the cleared shapes
      background(bgval); // Assuming bgval is the background color
      // If using p5.js or similar, you might need to explicitly call a redraw function here
  });
});


function setup() {
  pixelDensity(1);
  dimx = windowHeight-200;
  dimy = dimx;
  createCanvas(dimx,dimy);
  background(0);
  frameRate(60);
  //stroke(255,255,255,0);
}

function draw() {

  background(bgval);
  loadPixels();
  let bg = document.getElementById('noise');
  const bgcol = document.getElementById('background');
  const fillcol =document.getElementById('fill');
  
  const clearall = document.getElementById('clear');
    
  if(!bg.checked){
    console.log("true")
    background(0);
    bgval = hexToRgb(bgcol.value);
  }
  else{
    for(let y = 0; y < height; y++) {
      const ny = (mouseY / height) * 255;
        for (let x = 0; x < width; x++) {
            let noise1 = Math.random() * 50
            let noise2 = Math.random() * 220
          const nx = (mouseX / width) * 255;
          let index = (x + y * width) * 4;
  
          pixels[index+0] = 255;
          pixels[index+1] = nx + noise1;
          pixels[index+2] = ny + noise2;
          pixels[index+3] = 255;
    }}
  }



  updatePixels();
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
      if ((pt.x+varx>dimx || pt.x+varx<0)){
        facx[i]=facx[i]*(-1);
        break;
      }
    }
    for (let pt of shape){
      if ((pt.y+vary>dimy || pt.y+vary<0)){
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
      if ((pt.x-centerX)>0)
      {
        //conceptually good but need to make a rounder/smoother/more accurate cut off
        pt.x = (pt.x-centerX)*scalex+centerX;
        //pt.x = pt.x+transx;
      }
      //conceptually good but need to make a rounder/smoother/more accurate cut of
      else if((pt.x-centerX)<0){
        pt.x = (pt.x-centerX)*botx+centerX;
        //pt.x = pt.x-transx;
      }
      if ((pt.y-centerY)>0)
      {
        //conceptually good but need to make a rounder/smoother/more accurate cut off
        pt.y =(pt.y-centerY)*scaley+centerY;
      }
      //conceptually good but need to make a rounder/smoother/more accurate cut of
      else if((pt.y-centerY)<0){
        pt.y = (pt.y-centerY)*boty+centerY;
      }
    }
    
    checkAndResolveOverlaps();
    for (let i = geometry.length - 1; i >= 0; i--) {
      if (!sizeConstraint(geometry[i])) {
        // Remove the shape and associated properties
        geometry.splice(i, 1);
        randomx.splice(i, 1);
        randomy.splice(i, 1);
        facx.splice(i, 1);
        facy.splice(i, 1);
        randscalex.splice(i, 1);
        randscaley.splice(i, 1);
        randscalebotx.splice(i, 1);
        randscaleboty.splice(i, 1);
        randtrans.splice(i, 1);
      }
    }
    push();
    fill(shapefill[i]);
    beginShape();
    for (let pt of shape){
      curveVertex(pt.x, pt.y);
    }
    endShape(CLOSE); // Assuming all shapes are closed for simplicity // Assuming all shapes are closed for simplicity
    pop();
  }

  // Draw the current blob points
  beginShape();
  for (let i = 0; i < blobPoints.length; i++) {
    curveVertex(blobPoints[i].x, blobPoints[i].y);
  }
  endShape();

}




function mousePressed() {
  // Check if the click is inside any shape
  const onclick = document.getElementById('remove');
  const fill = document.getElementById('fill');
  let fillcol = hexToRgb(fill.value);
  if(onclick.checked){
    for (let i = geometry.length - 1; i >= 0; i--) {
      if (isPointInsideShape(createVector(mouseX, mouseY), geometry[i])) {
          // If inside, remove the shape
          geometry.splice(i, 1);
          // Also, remove associated properties to keep arrays in sync
          randomx.splice(i, 1);
          randomy.splice(i, 1);
          facx.splice(i, 1);
          facy.splice(i, 1);
          randscalex.splice(i, 1);
          randscaley.splice(i, 1);
          randscalebotx.splice(i, 1);
          randscaleboty.splice(i, 1);
          randtrans.splice(i, 1);
          // Assuming you want to stop checking once you've found and removed a shape
          return;
      }
  }
  }
  else{
    for (let i = geometry.length - 1; i >= 0; i--) {
      if (isPointInsideShape(createVector(mouseX, mouseY), geometry[i])) {
          // If inside, remove the shape
          shapefill[i]=fillcol;
          return;
      }
  }
  }

  // If no shape contains the click, add a new shape
  blobPoints = []; // Reset points for a new shape
  blobPoints.push(createVector(mouseX, mouseY)); // Add the first point
}

function sizeConstraint(shape){
  const yvals = shape.map(point => point.y);
  const maxy = Math.max(...yvals);
  const miny = Math.min(...yvals);
  const xvals = shape.map(point => point.x);
  const maxx = Math.max(...xvals);
  const minx = Math.min(...xvals);
  return (maxy - miny <= dimy && maxx-minx<=dimx); // Adjust to your actual height constraint
}

function mouseDragged() {
    blobPoints.push(createVector(mouseX, mouseY));
}

function mouseReleased() {
  // Save the current shape if it's closed, then reset for a new shape
  //if (distance((blobPoints[0].x,blobPoints[0].y),(blobPoints[blobPoints.length - 1].x,blobPoints[blobPoints.length - 1].y)) < 15) 
    blobPoints.push(createVector(blobPoints[0].x,blobPoints[0].y))
    geometry.push([...blobPoints]); // Copy the current blobPoints to geometry
    randomx.push((Math.random()-0.5)*3);
    randomy.push((Math.random()-0.5)*3);
    facx.push(1);
    facy.push(1);
    blobPoints=[];
    randscalex.push(Math.random()*defrate+defadj);
    randscaley.push(Math.random()*defrate+defadj);
    randscalebotx.push(Math.random()*defrate+defadj);
    randscaleboty.push(Math.random()*defrate+defadj);
    randtrans.push((Math.random()-0.5)*.2);
    facxprev.push(1);
    facyprev.push(1);
    facxprev1.push(1);
    facyprev1.push(1);
    shapefill.push((255,255,255))
  }

  function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function hexToRgb(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    let r, g, b;
    if (hex.length === 3) {
        // In case of shorthand format (#FFF), double each character
        r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
        g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
        b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else if (hex.length === 6) {
        // In case of full format (#FFFFFF)
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else {
        throw new Error('Invalid HEX color.');
    }

    return `rgb(${r}, ${g}, ${b})`;
}

  function isPointInsideShape(point, shape) {
    let count = 0;
    for (let i = 0, j = shape.length - 1; i < shape.length; j = i++) {
        let xi = shape[i].x, yi = shape[i].y;
        let xj = shape[j].x, yj = shape[j].y;

        let intersect = ((yi > point.y) != (yj > point.y))
            && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
        if (intersect) count++;
    }
    // Odd count means point is inside
    return count % 2 == 1;
}

function checkAndResolveOverlaps() {
  for (let i = 0; i < geometry.length; i++) {
    for (let j = i + 1; j < geometry.length; j++) { // Avoid duplicate checks
      let overlapDetected = false;
      for (let pt of geometry[i]) {
        if (isPointInsideShape(pt, geometry[j])) {
          overlapDetected = true;
          break; // Found overlap, no need to check further
        }
      }
      if (!overlapDetected) {
        // Also check points of shape j in shape i
        for (let pt of geometry[j]) {
          if (isPointInsideShape(pt, geometry[i])) {
            overlapDetected = true;
            break; // Found overlap, no need to check further
          }
        }
      }

      if (overlapDetected) {
        console.log(`Shape ${i} overlaps with Shape ${j}`);
        randomx[i]=(Math.random()-0.5)*4;
        randomy[i]=(Math.random()-0.5)*4;
        randomx[j]=(Math.random()-0.5)*4;
        randomy[j]=(Math.random()-0.5)*4;
        facx[i]=facx[i]*-1;
        facy[i]=facy[i]*-1;
        facx[j]=facx[j]*-1;
        facy[j]=facy[j]*-1;

        let overlapDetected = false;
        for (let pt of geometry[i]) {
          if (isPointInsideShape(pt, geometry[j])) {
            overlapDetected = true;
            break; // Found overlap, no need to check further
          }
        }
        if (!overlapDetected) {
          // Also check points of shape j in shape i
          for (let pt of geometry[j]) {
            if (isPointInsideShape(pt, geometry[i])) {
              overlapDetected = true;
              break; // Found overlap, no need to check further
            }
          }
        }

        // Calculate the center of shape i
        let centerI = createVector(0, 0);
        for (let pt of geometry[i]) {
          centerI.add(pt.x, pt.y);
        }
        centerI.div(geometry[i].length);

        // Calculate the center of shape j
        let centerJ = createVector(0, 0);
        for (let pt of geometry[j]) {
          centerJ.add(pt.x, pt.y);
        }
        centerJ.div(geometry[j].length);

        // Determine direction vector from centerI to centerJ
        let directionIJ = createVector(centerJ.x - centerI.x, centerJ.y - centerI.y);
        directionIJ.normalize(); // Normalize to get direction only

        // Determine direction vector from centerJ to centerI (opposite of directionIJ)
        let directionJI = createVector(-directionIJ.x, -directionIJ.y); // Simply negate directionIJ

        // Move points of shape i away from the center of shape j
        for (let k = 0; k < geometry[i].length; k++) {
          let pt = geometry[i][k];
          if (isPointInsideShape(pt, geometry[j])) {
            geometry[i][k] = createVector(pt.x + directionJI.x * 5, pt.y + directionJI.y * 5); // Move by 10 pixels
          }
        }

        // Move points of shape j away from the center of shape i
        for (let k = 0; k < geometry[j].length; k++) {
          let pt = geometry[j][k];
          if (isPointInsideShape(pt, geometry[i])) {
            geometry[j][k] = createVector(pt.x + directionIJ.x * 5, pt.y + directionIJ.y * 5); // Move by 10 pixels
          }
        }
      }
    }
  }
}