import Popup from './Popup.js';

export default class PopupWithImages extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(".modal__full-image");
    this._captionElement = this._popupElement.querySelector(".full-image-title");
  }

  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}
