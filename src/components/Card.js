export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.card');
    const cardElement = document.createElement('div');
    cardElement.append(cardTemplate.cloneNode(true));
    return cardElement.firstElementChild;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });

    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like-button_active');
    });
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
