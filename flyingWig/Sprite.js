/*jshint esversion: 6 */

class Sprite {
  constructor(root, img) {
    //Convert constructor args as class properties
    this.root = root;
    this.img = img;
    this.width = img.width;
    this.height = img.height;
    this.imgData = this.getImageData();
  }

  getImageData() {
    // If is running for the first time (by the constructor)
    if(this.imgData === undefined) {
      //Creates aux canvas and fetchs canvas data
      let _canvas = new Canvas(this.root, this.width, this.height);
      _canvas.unmountCanvas();
      _canvas.drawImage(this.img, 0, 0, this.width, this.height);
      return _canvas.getFrameData();
    } else {
      // imgData already calculated, return imgData, this avoids unnecessary computing
      return this.imgData;
    }
  }
}

//export default Sprite;
