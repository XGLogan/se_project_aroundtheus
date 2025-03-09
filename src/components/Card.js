export default class Card {
  constructor(cardData, templateSelector, { handleCardClick, handleLikeClick, handleDeleteClick }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes || [];
    
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _renderLikes() {
    if (this._likeCountElement) {
      this._likeCountElement.textContent = this._likes.length;
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('card__like-button_active');
      const isLiked = this._likeButton.classList.contains('card__like-button_active');
      this._handleLikeClick(this._id, isLiked, this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id, this._element);
    });
  }

  updateLikes(newLikes) {
    this._likes = newLikes;
    this._renderLikes();
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__trash-button');
    this._likeCountElement = this._element.querySelector('.card__like-count');

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._renderLikes();
    this._setEventListeners();

    return this._element;
  }
}
