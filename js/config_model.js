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

  
  /**
   * constructeur de l'objet Config
   * @param {string} rover nom du rover choisie
   * @param {string} camera nom de la camera choisie
   * @param {string} date date voulue de recherche au format AAAA-MM-JJ
   */
  constructor(rover, date, camera = null) {
    this.mRover = rover.toLowerCase();
    this.mDate = date;

    if (typeof camera === 'string' || camera instanceof String) {
      this.mCamera = camera.toLowerCase();
    } else {
      this.mCamera = null
    }

  }

  getQueryUrl() {
    const baseRequest = "/rovers";
    let request = baseRequest + "/" + this.mRover + "/photos?page=1";
    
    if (typeof this.mDate === 'string' || this.mDate instanceof String) {
      request += "camera=" + this.mCamera + "&";
    }
     
    request += "earth_date=" + this.mDate + "&";
  
    return request;
  }

  getRover() {
    return this.mRover;
  }
  
  getCamera() {
    return this.mCamera;
  }
  
  getDate() {
    return this.mDate;
  }

}
