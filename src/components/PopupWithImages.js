import Popup from "./Popup.js";

export default class PopupWithImages extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".modal__full-image");
    this._caption = this._popup.querySelector(".full-image-title");
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
