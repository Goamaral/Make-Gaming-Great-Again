/*jshint esversion: 6 */

class Sprite {
  constructor(img) {
    //Convert constructor args as class properties
    this.img = img;
    this.width = img.width;
    this.height = img.height;
    this.imgData = this.getImageData();
  }

  getImageData() {
    // If is running for the first time (by the constructor)
    if(this.imgData === undefined) {
      //Creates aux canvas and fetchs canvas data
      let _canvas = new Canvas(this.width, this.height);
      _canvas.drawImage(this.img, 0, 0, this.width, this.height);
      this.imgData = _canvas.getFrameData();
    }
    return this.imgData;
  }
}

//export default Sprite;
