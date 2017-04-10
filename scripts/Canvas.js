/*jshint esversion: 6 */

class Canvas {
  constructor(root,width,height) {
    this.root = root;
    this.width = width;
    this.height = height;
    // Creates canvas node
    this.canvas = document.createElement('canvas');
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    // Set canvas custom default style
    this.setStyle({
      margin: 'auto'
    });
    // Mounts canvas node to root node
    this.mountCanvas();
    // Define context
    this.ctx = this.canvas.getContext('2d');
  }

  // Returns current full canvas image data
  getFrameData() {
    return this.ctx.getImageData(0, 0, this.width, this.height);
  }

  // Recieves JS plain Object with style and updates canvas style object
  setStyle(newStyle) {
    let prevStyle = this.canvas.style;

    for(let key in newStyle) {
      prevStyle[key] = newStyle[key];
    }
  }

  // Draws image in the canvas
  drawImage(img, x, y, width, height) {
    this.ctx.drawImage(img, x, y, width, height);
  }

  // Draws sprite in the canvas
  drawSprite(sprite, x, y) {
    let _imgData = sprite.getImageData();
    this.ctx.putImageData(_imgData, x, y);
  }

  // Get current canvas height
  getHeight() {
    return this.canvas.clientHeight;
  }

  // Get current canvas width
  getWidth() {
    return this.canvas.clientWidth;
  }

  // Mount this.canvas node in the dom
  mountCanvas() {
    this.canvas = this.root.appendChild(this.canvas);
  }

  // Unmount canvas
  unmountCanvas() {
    this.root.removeChild(this.canvas);
  }
}

// export default Canvas;
