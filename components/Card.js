export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _createCard() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }

 
  _setEventListeners(cardElement) {
    cardElement.querySelector(".card__like-button").addEventListener("click", () => {
      this._handleLikeIcon(cardElement);
    });

    cardElement.querySelector(".card__trash-button").addEventListener("click", () => {
      this._handleDeleteCard(cardElement);
    });

    cardElement.querySelector(".card__image").addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleLikeIcon(cardElement) {
    cardElement.querySelector(".card__like-button").classList.toggle("card__like-button_active");
  }

  _handleDeleteCard(cardElement) {
    cardElement.remove();
  }

  getView() {
    return this._createCard();
  }
}
