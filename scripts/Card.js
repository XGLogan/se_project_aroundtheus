export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link;
    this._cardSelector = cardSelector;
  }

  _createCard() {
    const cardElement = document
      .querrySelector(this._cardSelector)
      .content.querrySelector(".card")
      .cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    caardImage.src = this._link;
    cardImage.alt = this._name;

    cardElement.querrySelector(".card__title").textContent = this._name;

    return cardElement;
  }

  _setEventListeners() {
    //."card like button"
    this._cardElement
      .querrySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //card delete button
    this._cardElement
      .querrySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    //Image Click
    this.cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.handleImageClick(this._name, this.link);
      });
  }

  _handleLikeIcon() {
    this.cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }
  _handleDeleteCard() {
    this._cardElement.remove;
    this._cardElement = null;
  }

  getView() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querrySelector(".card")
      .cloneNode(true);

    //get the card view
    //set event listners
    this._setEventListeners();
    //return the card
  }
}
