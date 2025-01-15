export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');
    this._element.querySelector('.card__title').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    return this._element;
  }
}
