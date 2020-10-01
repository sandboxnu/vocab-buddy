export default class Word {
  /** @type {String} */
  value;

  /** @type {String} */
  correctImage;

  /** @type {Array<String>} */
  incorrectImages;

  /** @type {String} */
  id;

  /** @type {Date} */
  createdAt;

  constructor(value, correctImage, incorrectImages, id, createdAt) {
    this.value = value;
    this.correctImage = correctImage;
    this.incorrectImages = incorrectImages;
    this.id = id;
    this.createdAt = createdAt;
  }
}
