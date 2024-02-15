// Is the user currently drawing?
let isDrawing = false;
// Where did the user click first?
let startPoint;
// All the shapes that have been drawn
let geometry = [];
// The current type of shape to draw
let shapeMode = 'poly';
// A container for the vertices of a polygon
let polyVertices = [];
let vertlist = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Some default styles
  stroke(0);
  strokeWeight(5);
  fill(127, 50);
}

function draw() {
  background(255);
  
  // Draw all previous shapes
  for (let i = 0; i < geometry.length; i++)
  {
    let shape = geometry[i];
    // Chose what to draw based on the shape type
    switch(shape.type)
    {
      case 'line': line(shape.start.x, shape.start.y, shape.end.x, shape.end.y); break;
      case 'rect': rect(shape.start.x, shape.start.y, 
        shape.end.x - shape.start.x, shape.end.y - shape.start.y); break;
      case 'poly':
        beginShape();
        for (let i = 0; i < shape.vertices.length; i++) {
          vertex(shape.vertices[i].x, shape.vertices[i].y);
        }
        endShape();
        break;
    }
    
  }

  // If actively drwaing right now, draw shape
  if (isDrawing)
  {
    // Chose what to draw based on the shape mode
    switch(shapeMode)
    {
      case 'line': line(startPoint.x, startPoint.y, mouseX, mouseY); break;
      case 'rect': rect(startPoint.x, startPoint.y, 
        mouseX - startPoint.x, mouseY - startPoint.y); break;
      case 'poly':
        // How to render a polygon: https://p5js.org/reference/#/p5/beginShape
        beginShape();
        for (let i = 0; i < polyVertices.length; i++) {
          vertex(polyVertices[i].x, polyVertices[i].y);
        }
        vertex(mouseX, mouseY);
        endShape();
        break;
    }
  }
}

// If mouse clicked, start a line
function mousePressed() {
  if (mouseButton === LEFT)
  {
    isDrawing = true;
    const here = {
      x: mouseX,
      y: mouseY
    };
    // Save location for polygon or current shape
    if (shapeMode === 'poly') {
      // Stop drawing poly based on proximity to start point
      if (polyVertices.length > 1 && distance(here, polyVertices[0]) < 15) {
        closeCurrentPoly();
      } else {
        polyVertices.push(here);
      }
    } else {
      startPoint = here;
    }
  }
}

const shape = {
  start: startPoint,
  end: {
    x: mouseX, 
    y: mouseY,
  }
};

// If mouse released, save in memory the shape that was created
/*
function mouseReleased() {
  if (mouseButton === LEFT)
  {
    if (shapeMode === 'poly')
    {
      // do nothing
    }
    /*
    else
    {
      isDrawing = false;
      const shape = {
        type: shapeMode,
        start: startPoint,
        end: {
          x: mouseX, 
          y: mouseY,
        }
      };
      geometry.push(shape);
    }
  
  }
}
*/

/*
// Let user choose the type of geometry to draw
function keyPressed() {
  switch(key)
  {
    case 'l': case 'L': shapeMode = 'line'; break;
    case 'r': case 'R': shapeMode = 'rect'; break;
    case 'p': case 'P': shapeMode = 'poly'; break;
    case 'e': case 'E': closeCurrentPoly(); break;
    case 's': case 'S': saveCanvas('drawing.png'); break;
  }
  console.log('Shape Mode changed to "' + shapeMode + '"');
}
*/

// Calculate the distance between two points
function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Performs all operations to store current poly in memory
function closeCurrentPoly() {
  polyVertices.push(polyVertices[0]);  // 'snap' to start vertex
  isDrawing = false;
  const shape = {
    type: 'poly',
    vertices: polyVertices
  };
  geometry.push(shape);
  polyVertices = [];
}