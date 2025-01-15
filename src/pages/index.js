import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImages from '../components/PopupWithImages.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, validationSettings } from '../components/utils.js';
import '../pages/index.css';

/** DOM Elements */

const addNewCardButton = document.querySelector("#profile-add-button");

/** Instances */
const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  descriptionSelector: "#profile-description",
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, "#card-template", (name, link) => {
        imagePopup.open({ name, link });
      });
      const cardElement = card.getView();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

const profilePopup = new PopupWithForm("#profile-edit-modal", (data) => {
  userInfo.setUserInfo(data);
  profilePopup.close();
});

const addCardPopup = new PopupWithForm("#profile-add-card", (data) => {
  const card = new Card(data, "#card-template", (name, link) => {
    imagePopup.open({ name, link });
  });
  const cardElement = card.getView();
  cardSection.addItem(cardElement);
  addCardPopup.close();
});

const imagePopup = new PopupWithImages("#full-image-modal");

/** Event Listeners */
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.querySelector("#profile-name-input").value = userData.name;
  document.querySelector("#profile-description-input").value = userData.description;
  profilePopup.open();
});

addNewCardButton.addEventListener("click", () => addCardPopup.open());

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

/** Validation */
const profileFormValidator = new FormValidator(validationSettings, document.querySelector("#profile-edit-form"));
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, document.querySelector("#add-card-form"));
addCardFormValidator.enableValidation();

/** Render Initial Cards */
cardSection.renderItems();
