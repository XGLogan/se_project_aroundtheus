import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    // Grab the form inside the modal
    this._form = this._popup.querySelector('.modal__form');
    // Grab all inputs inside the form
    this._inputList = this._form.querySelectorAll('.modal__input');
  }

  _getInputValues() {
    // Build an object of { [input.name]: input.value }
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._handleFormSubmit(formData);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
