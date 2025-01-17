import './index.css'; 
import {
  initialCards,
  validationSettings
} from '../components/utils.js';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImages from '../components/PopupWithImages.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';


const profileEditButton = document.querySelector('#profile-edit-button');
const addNewCardButton = document.querySelector('#profile-add-button');
const profileNameInput = document.querySelector('#profile-name-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');
const editProfileForm = document.querySelector('#profile-edit-form');
const addCardForm = document.querySelector('#add-card-form');

const popupWithImage = new PopupWithImages('#full-image-modal');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '#profile-name',
  descriptionSelector: '#profile-description'
});

function createCard(data) {
  const card = new Card(
    data,
    '#card-template',
    (name, link) => {
      popupWithImage.open(name, link);
    }
  );
  return card.getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardSection.addItem(cardElement);
    }
  },
  '.cards__list'
);

cardSection.renderItems();

const editProfilePopup = new PopupWithForm(
  '#profile-edit-modal',
  (formData) => {
    userInfo.setUserInfo({
      name: formData.title,
      description: formData.description
    });
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  '#profile-add-card',
  (formData) => {
    const newCard = createCard({
      name: formData.title,
      link: formData.url
    });
    cardSection.addItem(newCard);
  }
);
addCardPopup.setEventListeners();

const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
addCardFormValidator.enableValidation();


profileEditButton.addEventListener('click', () => {
  const { name, description } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = description;

  editProfileFormValidator.resetValidation();

  editProfilePopup.open();
});

addNewCardButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();

  addCardPopup.open();
});
