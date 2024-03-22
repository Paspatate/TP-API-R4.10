class Config {
  mRover;
  
  /**
   * Camera du rover dont on souhaite recupéré les photos
   * @type {string}
   */
  mCamera;
  
  /**
   * Date terrestre au format "AAAA-MM-JJ"
   * @type {string}
   */
  
  mDate;
  
  constructor(rover, camera = null, date = null) {
    this.mRover = rover;
    this.mCamera = camera;
    this.mDate = date;
  }

  getQueryUrl() {
    const baseRequest = "/rovers";
    const request = baseRequest + "/" + rover + "/photos?";

    if (typeof this.mCamera === 'string' || this.mCamera instanceof String) {
      request += "camera=" + this.mCamera + "&";
    }

    if (typeof this.mDate === 'string' || this.mDate instanceof String) {
      request += "earth_date=" + this.mDate + "&";
    }

    return request;
  }
}
