import './index.css'; 
import {
  initialCards,
  validationSettings
} from '../utils/utils.js';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImages from '../components/PopupWithImages.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';



const profileEditButton = document.querySelector('#profile-edit-button');
const addNewCardButton = document.querySelector('#profile-add-button');
const profileNameInput = document.querySelector('#profile-name-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');
const editProfileForm = document.forms['profile-form'];
const addCardForm = document.forms['card-form'];
const avatarContainer = document.querySelector('.profile__avatar-container');


const popupWithImage = new PopupWithImages('#full-image-modal');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '#profile-name',
  descriptionSelector: '#profile-description',
  avatarSelector: '.profile__image'
});


function createCard(cardData) {
  const card = new Card(
    cardData,
    '#card-template',
    {
      handleCardClick: (title, imageUrl) => {
        popupWithImage.open(title, imageUrl);
      },
      handleDeleteClick: (cardId, cardElement) => {
        deleteCardPopup.open(cardId, cardElement);
      },
      handleLikeClick: (cardId, isLiked, cardInstance) => {
        if (isLiked) {
          api.unlikeCard(cardId)
            .then(updatedCardData => {
              cardInstance.updateLikes(updatedCardData.likes);
            })
            .catch(err => console.error(err));
        } else {
          api.likeCard(cardId)
            .then(updatedCardData => {
              cardInstance.updateLikes(updatedCardData.likes);
            })
            .catch(err => console.error(err));
        }
      }
    }
  );
  return card.getView();
}


const deleteCardPopup = new PopupWithConfirmation('#delete-confirm-modal', {
  handleFormSubmit: (cardId, cardElement) => {
    if (!cardId) {
      cardElement.remove();
      deleteCardPopup.close();
      return;
    }
    api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      deleteCardPopup.close();
    })
    .catch(err => console.error(err));
}
});

deleteCardPopup.setEventListeners();


const cardSection = new Section(
  {
    items: [], 
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardSection.addItem(cardElement);
    }
  },
  '.cards__list'
);


cardSection.renderItems();

const editProfilePopup = new PopupWithForm('#profile-edit-modal', (formData) => {
  return api.setUserInfo(formData.title, formData.description)
    .then((updatedUserData) => {
      userInfo.setUserInfo({
        name: updatedUserData.name,
        description: updatedUserData.about,
        avatar: updatedUserData.avatar 
      });
    });
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('#profile-add-card', (formData) => {
  return api.addNewCard(formData.title, formData.url)
    .then((newCardData) => {
      const newCardElement = createCard(newCardData);
      cardSection.addItem(newCardElement);
    });
});
addCardPopup.setEventListeners();


const avatarPopup = new PopupWithForm('#avatar-edit-modal', (formData) => {
  return api.setAvatar(formData.avatar)
    .then((updatedUser) => {
      userInfo.setUserInfo({
        name: updatedUser.name,
        description: updatedUser.about,
        avatar: updatedUser.avatar
      });
    });
});

avatarPopup.setEventListeners();
avatarContainer.addEventListener('click', () => {
   avatarPopup.open();
  });

const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
addCardFormValidator.enableValidation();

const avatarForm = document.forms['avatar-form'];
const avatarFormValidator = new FormValidator(validationSettings, avatarForm);
avatarFormValidator.enableValidation();


profileEditButton.addEventListener('click', () => {
  const { name, description } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
});

addNewCardButton.addEventListener('click', () => {
  addCardPopup.open();
});

//API
const api = new Api({
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: '54fec02a-8ba4-4841-a6eb-5022ab97d99a',
    'Content-Type': 'application/json'
  }
});

let currentUserId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id; 
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar
    });
    
    cards.forEach(cardData => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    });
  })
  .catch(err => console.error(err));