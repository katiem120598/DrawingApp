const canvas = document.querySelector('canvas'); // Adjust the selector as needed if you have more than one canvas or if it has an ID/class
const rect = canvas.getBoundingClientRect();

// The topmost right corner's coordinates
const topRightCornerX = rect.right; // X coordinate (relative to the viewport)
const topRightCornerY = rect.top; // Y coordinate (relative to the viewport)

const myElement = document.querySelector('.navbar-contents'); // Change the selector to target your element

// Apply the calculated positions
// Here we adjust 'myElement' to be positioned at the canvas's top right corner
myElement.style.position = 'absolute'; // Make sure the element is positioned absolutely
myElement.style.left = `${topRightCornerX}px`; // Position horizontally
myElement.style.top = `${topRightCornerY}px`; // Position vertically