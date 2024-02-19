function setup() {
  createCanvas(windowWidth,windowHeight);
  pixelDensity(1);
}




function draw() {
loadPixels();
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

updatePixels();

}
 console.log("Hello World");
 console.log(noise1);
 console.log(noise2);
