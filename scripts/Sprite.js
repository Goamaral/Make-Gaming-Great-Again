/*jshint esversion: 6 */

class Sprite {
  constructor(root, img) {
    // Convert constructor args as class properties
    this.root = root;
    this.img = img;
    this.width = img.width;
    this.height = img.height;
    this.imgData = this.getImageData();
  }

  getImageData() {
    if(this.imgData === undefined) {
      let _canvas = new Canvas(this.root, this.width, this.height);
      _canvas.onload = function() {
        _canvas.unmountCanvas();
        _canvas.drawImage(this.img, 0, 0, this.width, this.height);
      };
      _canvas.crossOrigin = "anonymous";
      return _canvas.getFrameData();
    }
    else {
      return this.imgData;
    }
  }
}
