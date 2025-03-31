import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.modal__form');
    this._inputList = this._form.querySelectorAll('.modal__input');
    this._submitButton = this._form.querySelector('.modal__button');
    this._submitBtnText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  renderLoading(isLoading, loadingText = 'Saving...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this.renderLoading(true); 
      this._handleFormSubmit(formData)
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.renderLoading(false); 
        });
    });
  }

  close() {
    super.close();
    this._form.reset(); 
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name] || '';
    });
  }
}
