export default class Word {
  /** @type {String} */
  value: string;

  /** @type {String} */
  correctImage: string;

  /** @type {string[]} */
  incorrectImages: string[];

  /** @type {String} */
  id: string;

  /** @type {Date} */
  createdAt: Date;

  constructor(value: string, correctImage: string, incorrectImages: string[], id: string, createdAt: Date) {
    this.value = value;
    this.correctImage = correctImage;
    this.incorrectImages = incorrectImages;
    this.id = id;
    this.createdAt = createdAt;
  }
}
